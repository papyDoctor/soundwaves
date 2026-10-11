/*
 * The scene: what the user described, as data. The single source of truth
 * the text panel, the viewport and the inspector all edit and all redraw
 * from. It knows how to become the JSON the engine wants (SI units, materials
 * resolved to indices, rectangles and circles expanded) and how to snapshot
 * itself for undo.
 *
 * Pure: no DOM.
 */
import { UNITS } from "./format.js";

export class Scene {
  constructor() {
    this.units = "m";
    this.mode = "planar";
    this.media = [];
    this.materials = [];
    this.elements = [];
    this.regions = [];
    this.sources = [];
    this.probes = [];
    this.rings = [];       // probe rings: { id, cx, cy, r, n, a0, a1 }
    this.sim = { fmax: 2000, npl: 10, duration: 0.02, cfl: 0.9, angle: 28, h: undefined, maxNodes: 500000 };
    // grid: the snap and drawing grid step, in scene units (undefined: a default per unit).
    this.view = { center: [0, 0], scale: 100, colormap: "rwb", gain: "auto", grid: undefined, snap: true };
    this.leading = [];
    this.trailing = [];
    this.version = 0;
  }

  /** The material a wall gets when none is named: the first one, or an implicit rigid. */
  defaultMaterial() {
    if (!this.materials.length) this.materials.push({ name: "rigid", kind: "rigid" });
    return this.materials[0].name;
  }

  material(name) { return this.materials.find((m) => m.name === name); }
  medium(name) { return this.media.find((m) => m.name === name); }
  element(id) { return this.elements.find((e) => e.id === id); }
  source(id) { return this.sources.find((s) => s.id === id); }
  probe(id) { return this.probes.find((p) => p.id === id); }
  region(id) { return this.regions.find((r) => r.id === id); }
  ring(id) { return (this.rings || []).find((g) => g.id === id); }

  /**
   * The probes of a ring: n points from a0 to a1 degrees (the last excluded
   * on a full circle). In axisymmetric mode the half below the axis does not
   * exist: those points are dropped.
   */
  ringPoints(g) {
    const full = Math.abs(g.a1 - g.a0) >= 360 - 1e-9;
    const count = full ? g.n : Math.max(2, g.n);
    const out = [];
    for (let k = 0; k < count; k++) {
      const deg = g.a0 + (g.a1 - g.a0) * k / (full ? count : count - 1);
      const a = (deg * Math.PI) / 180;
      let x = g.cx + g.r * Math.cos(a), y = g.cy + g.r * Math.sin(a);
      if (Math.abs(x - g.cx) < 1e-12 * g.r) x = g.cx;
      if (Math.abs(y - g.cy) < 1e-12 * g.r) y = g.cy;
      if (this.mode === "axisym") { if (y < -1e-12) continue; if (y < 0) y = 0; }
      out.push({ id: `${g.id}:${k}`, ring: g.id, angle: deg, x, y });
    }
    return out;
  }

  /** Every probe the engine records, point probes first, then the rings'. */
  probeLayout() {
    const out = this.probes.map((p) => ({ id: p.id, ring: null, angle: null, x: p.x, y: p.y }));
    for (const g of this.rings || []) out.push(...this.ringPoints(g));
    return out;
  }
  probeIds() { return this.probeLayout().map((p) => p.id); }

  /** A fresh id with the given prefix: w1, w2, s1... */
  freshId(prefix) {
    const used = new Set([...this.elements, ...this.sources, ...this.probes, ...this.regions, ...(this.rings || [])].map((o) => o.id));
    for (let i = 1; ; i++) if (!used.has(`${prefix}${i}`)) return `${prefix}${i}`;
  }

  /** The line of the statement that defines `id`, if known (for error messages). */
  lineOf(id) {
    for (const list of [this.elements, this.sources, this.probes, this.regions, this.rings || [], this.materials, this.media]) {
      const o = list.find((x) => (x.id ?? x.name) === id);
      if (o?.line) return o.line;
    }
    return undefined;
  }

  unitScale() { return UNITS[this.units] ?? 1; }
  /** The grid step: the view's, or 5 cm in the scene's unit. */
  gridStep() { return this.view.grid > 0 ? this.view.grid : { m: 0.05, cm: 5, mm: 50 }[this.units] ?? 0.05; }
  cMin() { return this.media.reduce((m, x) => Math.min(m, x.c), Infinity); }
  /** The mesh size in scene units. */
  meshSize() {
    const h = this.sim.h > 0 ? this.sim.h : this.cMin() / (this.sim.fmax * this.sim.npl) / this.unitScale();
    return Number.isFinite(h) ? h : NaN;
  }

  /** Bounding box of the walls, [xmin, ymin, xmax, ymax] in scene units, or null. */
  bbox() {
    let b = null;
    const add = (x, y) => { b = b ? [Math.min(b[0], x), Math.min(b[1], y), Math.max(b[2], x), Math.max(b[3], y)] : [x, y, x, y]; };
    for (const e of this.elements) {
      if (e.kind === "polyline" || e.kind === "line") for (const [x, y] of e.pts) add(x, y);
      else if (e.kind === "rect") { add(e.x, e.y); add(e.x + e.w, e.y + e.h); }
      else { add(e.cx - e.r, e.cy - e.r); add(e.cx + e.r, e.cy + e.r); }
    }
    for (const s of this.sources) if (s.kind === "point") add(s.x, s.y);
    for (const p of this.probes) add(p.x, p.y);
    for (const g of this.rings || []) { add(g.cx - g.r, g.cy - g.r); add(g.cx + g.r, g.cy + g.r); }
    return b;
  }

  /** A rough node count for the inspector, before meshing: bbox area over the cell area, halved. */
  estimateNodes() {
    const b = this.bbox(), h = this.meshSize();
    if (!b || !(h > 0)) return NaN;
    return Math.round((b[2] - b[0]) * (b[3] - b[1]) / (h * h * Math.sqrt(3) / 4) / 2);
  }

  /** Normalized impedance of a material: absorb alpha -> zeta = (1+R)/(1-R), R = sqrt(1-alpha). */
  static zeta(m) {
    switch (m.kind) {
      case "absorb": { const a = Math.min(Math.max(m.alpha ?? 0.5, 1e-6), 1); const R = Math.sqrt(1 - a); return (1 + R) / (1 - R); }
      case "impedance": return m.zeta ?? 2;
      default: return 1;
    }
  }

  /** The JSON the engine takes (see engine/src/scene.rs). Throws on dangling names. */
  toEngineJson() {
    const k = this.unitScale();
    const matIndex = (name) => {
      const i = this.materials.findIndex((m) => m.name === name);
      if (i < 0) throw new Error(`unknown material '${name}'`);
      return i;
    };
    const mediumIndex = (name) => {
      const i = this.media.findIndex((m) => m.name === name);
      if (i < 0) throw new Error(`unknown medium '${name}'`);
      return i;
    };
    const elements = this.elements.map((e) => {
      switch (e.kind) {
        case "polyline": return { kind: "polyline", id: e.id, closed: !!e.closed, pts: e.pts.map(([x, y]) => [x * k, y * k]), materials: e.materials.map(matIndex) };
        case "line": return { kind: "polyline", id: e.id, closed: false, pts: e.pts.map(([x, y]) => [x * k, y * k]), materials: [matIndex(e.material)] };
        case "rect": return { kind: "polyline", id: e.id, closed: true, pts: [[e.x, e.y], [e.x + e.w, e.y], [e.x + e.w, e.y + e.h], [e.x, e.y + e.h]].map(([x, y]) => [x * k, y * k]), materials: Array(4).fill(matIndex(e.material)) };
        case "circle": return { kind: "arc", id: e.id, cx: e.cx * k, cy: e.cy * k, r: e.r * k, a0: 0, a1: 360, material: matIndex(e.material) };
        case "arc": return { kind: "arc", id: e.id, cx: e.cx * k, cy: e.cy * k, r: e.r * k, a0: e.a0, a1: e.a1, material: matIndex(e.material) };
        default: throw new Error(`unknown element kind ${e.kind}`);
      }
    });
    const signal = (s) => ({ type: s.type, f0: s.f0, amp: s.amp, t0: s.t0 ?? null, ...(s.type === "burst" ? { cycles: s.cycles ?? 3 } : {}) });
    const sources = this.sources.map((s) => ({ id: s.id, x: s.x * k, y: s.y * k, signal: signal(s.signal), radius: (s.radius || 0) * k }));
    return {
      mode: this.mode,
      media: this.media.map((m) => ({ name: m.name, c: m.c, rho: m.rho })),
      materials: this.materials.map((m) => ({ name: m.name, kind: m.kind, zeta: Scene.zeta(m), ...(m.kind === "piston" ? { signal: signal(m.signal || { type: "sine", f0: 500, amp: 0.01 }), sides: m.sides || "both" } : {}), ...(m.kind === "screen" ? { resistance: m.rayl || 200 } : {}) })),
      elements,
      regions: this.regions.map((r) => ({ id: r.id, seed: [r.x * k, r.y * k], medium: mediumIndex(r.medium) })),
      sources,
      probes: this.probeLayout().map((p) => ({ id: p.id, x: p.x * k, y: p.y * k })),
      sim: { fmax: this.sim.fmax, nodes_per_wavelength: this.sim.npl, duration: this.sim.duration, cfl: this.sim.cfl, angle: this.sim.angle, h: this.sim.h > 0 ? this.sim.h * k : null, max_nodes: this.sim.maxNodes },
    };
  }

  /** A deep copy of the data (for undo). Cheap: scenes are small. */
  snapshot() {
    const { version, ...data } = this;
    return structuredClone(data);
  }

  static fromSnapshot(snap) {
    const s = new Scene();
    Object.assign(s, structuredClone(snap));
    s.rings ??= [];
    return s;
  }

  /** The empty scene a new file starts from. */
  static blank(mode = "planar") {
    const s = new Scene();
    s.mode = mode;
    s.media.push({ name: "air", c: 343, rho: 1.2 });
    s.materials.push({ name: "rigid", kind: "rigid" });
    return s;
  }
}
