/*
 * The drawing tools of the viewport. A tool gets scene-space points and
 * answers to pointer and key events; the viewport redraws after each. Every
 * finished gesture goes through state.modify() or state.commit(), so it is
 * one undo step and every panel hears about it.
 *
 * Snapping: points snap to a grid of `snapStep` scene units when enabled.
 */
import { distanceToElement, outline, snap } from "../scene/geometry.js";

const PICK_PX = 8;

export function makeTools(state, view) {
  // Snapped, and never below the axis in axisymmetric mode: a click a hair
  // under y = 0 would put a source or a probe outside the domain.
  const snapPoint = ([x, y]) => {
    if (view.snapStep > 0) { x = snap(x, view.snapStep); y = snap(y, view.snapStep); }
    if (state.scene?.mode === "axisym" && y < 0) y = 0;
    return [x, y];
  };
  const px = () => PICK_PX / view.camera.scale; // pick radius in scene units
  const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  const node = (type, key, label) => ({ id: `${type}:${key}`, type, key, label });

  /** What is under p: a probe, source or region marker, a vertex of the selected wall, or a wall. */
  function pick(p) {
    const s = state.scene, r = px();
    for (const pr of s.probes) if (dist(p, [pr.x, pr.y]) < r) return { type: "probe", id: pr.id };
    for (const src of s.sources) if (src.kind === "point" && dist(p, [src.x, src.y]) < r) return { type: "source", id: src.id };
    for (const rg of s.regions) if (dist(p, [rg.x, rg.y]) < r) return { type: "region", id: rg.id };
    for (const g of s.rings || []) if (Math.abs(dist(p, [g.cx, g.cy]) - g.r) < r || dist(p, [g.cx, g.cy]) < r) return { type: "ring", id: g.id };
    const sel = state.selection;
    if (sel?.type === "wall") {
      const e = s.element(sel.key);
      if (e && (e.kind === "polyline" || e.kind === "line")) {
        const i = e.pts.findIndex((q) => dist(p, q) < r);
        if (i >= 0) return { type: "vertex", id: e.id, index: i };
      }
    }
    let best = null, bd = r;
    for (const e of s.elements) { const d = distanceToElement(p, e); if (d < bd) { bd = d; best = e; } }
    return best ? { type: "wall", id: best.id } : null;
  }

  function selectHit(hit) {
    if (!hit) { state.select(null); return; }
    const type = hit.type === "vertex" ? "wall" : hit.type;
    state.select(node(type, hit.id, hit.id));
  }

  /** The reference point of what is under the cursor: what snaps to the grid when dragged. */
  function refOf(hit) {
    const s = state.scene;
    switch (hit.type) {
      case "probe": { const o = s.probe(hit.id); return [o.x, o.y]; }
      case "source": { const o = s.source(hit.id); return [o.x, o.y]; }
      case "region": { const o = s.region(hit.id); return [o.x, o.y]; }
      case "ring": { const o = s.ring(hit.id); return [o.cx, o.cy]; }
      case "vertex": return state.scene.element(hit.id).pts[hit.index];
      case "wall": {
        const e = s.element(hit.id);
        if (e.kind === "polyline" || e.kind === "line") return e.pts[0];
        if (e.kind === "rect") return [e.x, e.y];
        return [e.cx, e.cy];
      }
    }
    return [0, 0];
  }

  /** Move an entity (or a vertex) by (dx, dy) in the live scene. */
  function moveHit(hit, dx, dy) {
    const s = state.scene;
    switch (hit.type) {
      case "probe": { const o = s.probe(hit.id); o.x += dx; o.y += dy; break; }
      case "source": { const o = s.source(hit.id); o.x += dx; o.y += dy; break; }
      case "region": { const o = s.region(hit.id); o.x += dx; o.y += dy; break; }
      case "ring": { const o = s.ring(hit.id); o.cx += dx; o.cy += dy; break; }
      case "vertex": { const e = s.element(hit.id); e.pts[hit.index] = [e.pts[hit.index][0] + dx, e.pts[hit.index][1] + dy]; break; }
      case "wall": {
        const e = s.element(hit.id);
        if (e.kind === "polyline" || e.kind === "line") e.pts = e.pts.map(([x, y]) => [x + dx, y + dy]);
        else if (e.kind === "rect") { e.x += dx; e.y += dy; }
        else { e.cx += dx; e.cy += dy; }
        break;
      }
    }
  }

  // --- Select: click picks, drag moves, Delete removes.
  const select = {
    name: "select", hint: "Click to select · drag to move · Delete removes · double-click a wall to edit its points in the Inspector",
    drag: null,
    down(p) {
      const hit = pick(p);
      selectHit(hit);
      if (!hit) return false;                     // nothing under the cursor: the viewport pans
      this.drag = { hit, start: p, ref: refOf(hit), before: state.scene.snapshot(), moved: false };
      return true;
    },
    move(p) {
      if (!this.drag) return;
      // The reference point follows the cursor and lands on the grid: an
      // object that started off-grid is on it after the first move.
      const { ref, start, hit } = this.drag;
      const target = snapPoint([ref[0] + (p[0] - start[0]), ref[1] + (p[1] - start[1])]);
      const cur = refOf(hit);
      const dx = target[0] - cur[0], dy = target[1] - cur[1];
      if (dx || dy) { moveHit(hit, dx, dy); this.drag.moved = true; }
    },
    up() {
      if (this.drag?.moved) state.commit(this.drag.before, { origin: "viewport", level: "geometry" });
      this.drag = null;
    },
    key(e) {
      if ((e.key === "Delete" || e.key === "Backspace") && state.selection) {
        const sel = state.selection;
        state.modify((s) => {
          if (sel.type === "wall") s.elements = s.elements.filter((x) => x.id !== sel.key);
          else if (sel.type === "source") s.sources = s.sources.filter((x) => x.id !== sel.key);
          else if (sel.type === "probe") s.probes = s.probes.filter((x) => x.id !== sel.key);
          else if (sel.type === "region") s.regions = s.regions.filter((x) => x.id !== sel.key);
          else if (sel.type === "ring") s.rings = s.rings.filter((x) => x.id !== sel.key);
          else return false;
        }, { origin: "viewport" });
        state.select(null);
        return true;
      }
      if (e.key === "Escape") { state.select(null); return true; }
      return false;
    },
  };

  // --- Polyline: click adds points, Enter or double-click finishes, C closes, Escape cancels.
  const polyline = {
    name: "polyline", hint: "Click to add points · Enter finishes open · C or click the first point closes · Escape cancels",
    pts: [], cursor: null,
    down(p) {
      const q = snapPoint(p);
      if (this.pts.length >= 3 && dist(q, this.pts[0]) < px()) { this.finish(true); return true; }
      if (!this.pts.length || dist(q, this.pts.at(-1)) > 0) this.pts.push(q);
      return true;
    },
    move(p) { this.cursor = snapPoint(p); },
    hoverMove(p) { this.cursor = snapPoint(p); return this.pts.length > 0; },
    up() {},
    double() { this.finish(false); },
    key(e) {
      if (e.key === "Enter") { this.finish(false); return true; }
      if (e.key.toLowerCase() === "c" && this.pts.length >= 3) { this.finish(true); return true; }
      if (e.key === "Escape") { this.pts = []; return true; }
      return false;
    },
    finish(closed) {
      const pts = this.pts.slice(); this.pts = [];
      if (pts.length < 2) return;
      let id;
      state.modify((s) => { id = s.freshId("w"); const m = s.defaultMaterial(); s.elements.push({ id, kind: "polyline", closed, pts, materials: Array(closed ? pts.length : pts.length - 1).fill(m), material: m }); }, { origin: "viewport" });
      state.select(node("wall", id, id));
    },
    rubber() { return this.pts.length ? (this.cursor ? [...this.pts, this.cursor] : this.pts) : null; },
  };

  // --- Two-click shapes.
  function twoClick(name, hint, build) {
    return {
      name, hint, first: null, cursor: null,
      down(p) {
        const q = snapPoint(p);
        if (!this.first) { this.first = q; return true; }
        const a = this.first; this.first = null;
        if (dist(a, q) === 0) return true;
        let id;
        state.modify((s) => { id = s.freshId("w"); s.elements.push({ id, ...build(a, q, s), material: s.defaultMaterial() }); }, { origin: "viewport" });
        state.select(node("wall", id, id));
        return true;
      },
      move(p) { this.cursor = snapPoint(p); },
      hoverMove(p) { this.cursor = snapPoint(p); return !!this.first; },
      up() {},
      key(e) { if (e.key === "Escape") { this.first = null; return true; } return false; },
      rubber() { return this.first && this.cursor ? preview(name, this.first, this.cursor) : null; },
    };
  }
  function preview(kind, a, b) {
    if (kind === "line") return [a, b];
    if (kind === "rect") return [a, [b[0], a[1]], b, [a[0], b[1]], a];
    if (kind === "circle") return outline({ kind: "circle", cx: a[0], cy: a[1], r: dist(a, b) }).pts.concat([outline({ kind: "circle", cx: a[0], cy: a[1], r: dist(a, b) }).pts[0]]);
    return [a, b];
  }
  const line = twoClick("line", "Click the two ends · Escape cancels", (a, b) => ({ kind: "line", pts: [a, b] }));
  const rect = twoClick("rect", "Click two opposite corners · Escape cancels", (a, b) => ({ kind: "rect", x: Math.min(a[0], b[0]), y: Math.min(a[1], b[1]), w: Math.abs(b[0] - a[0]), h: Math.abs(b[1] - a[1]) }));
  const circle = twoClick("circle", "Click the centre, then a point on the circle · Escape cancels", (a, b) => ({ kind: "circle", cx: a[0], cy: a[1], r: dist(a, b) }));

  // --- Arc: centre, start point (radius and start angle), end angle.
  const arc = {
    name: "arc", hint: "Click the centre, a start point, then the end angle (counter-clockwise) · Escape cancels",
    pts: [], cursor: null,
    down(p) {
      const q = snapPoint(p);
      this.pts.push(q);
      if (this.pts.length === 3) {
        const [c, s, e] = this.pts; this.pts = [];
        const r = dist(c, s);
        if (r === 0) return true;
        const deg = (v) => (Math.atan2(v[1] - c[1], v[0] - c[0]) * 180) / Math.PI;
        let a0 = deg(s), a1 = deg(e);
        if (a1 <= a0) a1 += 360;
        let id;
        state.modify((sc) => { id = sc.freshId("w"); sc.elements.push({ id, kind: "arc", cx: c[0], cy: c[1], r, a0: +a0.toFixed(3), a1: +a1.toFixed(3), material: sc.defaultMaterial() }); }, { origin: "viewport" });
        state.select(node("wall", id, id));
      }
      return true;
    },
    move(p) { this.cursor = snapPoint(p); },
    hoverMove(p) { this.cursor = snapPoint(p); return this.pts.length > 0; },
    up() {},
    key(e) { if (e.key === "Escape") { this.pts = []; return true; } return false; },
    rubber() {
      if (!this.pts.length || !this.cursor) return null;
      const c = this.pts[0];
      if (this.pts.length === 1) return [c, this.cursor];
      const s = this.pts[1], r = dist(c, s);
      const deg = (v) => (Math.atan2(v[1] - c[1], v[0] - c[0]) * 180) / Math.PI;
      let a0 = deg(s), a1 = deg(this.cursor); if (a1 <= a0) a1 += 360;
      return outline({ kind: "arc", cx: c[0], cy: c[1], r, a0, a1 }).pts;
    },
  };

  // --- Probe ring: the centre, then a point at the radius.
  const ring = {
    name: "ring", hint: "Click the centre (the source, the mouth), then a point at the radius · Escape cancels",
    first: null, cursor: null,
    down(p) {
      const q = snapPoint(p);
      if (!this.first) { this.first = q; return true; }
      const c = this.first; this.first = null;
      const r = dist(c, q);
      if (r === 0) return true;
      let id;
      state.modify((s) => { id = s.freshId("ring"); s.rings.push({ id, cx: c[0], cy: c[1], r, n: 36, a0: 0, a1: 360 }); }, { origin: "viewport" });
      state.select(node("ring", id, id));
      return true;
    },
    move(p) { this.cursor = snapPoint(p); },
    hoverMove(p) { this.cursor = snapPoint(p); return !!this.first; },
    up() {},
    key(e) { if (e.key === "Escape") { this.first = null; return true; } return false; },
    rubber() { return this.first && this.cursor ? [...outline({ kind: "circle", cx: this.first[0], cy: this.first[1], r: dist(this.first, this.cursor) }).pts, this.first, this.cursor] : null; },
  };

  // --- Markers: one click each.
  function marker(name, hint, add) {
    return {
      name, hint,
      down(p) { const q = snapPoint(p); let id; state.modify((s) => { id = add(s, q); }, { origin: "viewport" }); state.select(node(name, id, id)); return true; },
      move() {}, up() {}, key(e) { return e.key === "Escape"; },
    };
  }
  const region = marker("region", "Click inside an enclosed area to simulate it", (s, q) => { const id = s.freshId("r"); s.regions.push({ id, x: q[0], y: q[1], medium: s.media[0]?.name || "air" }); return id; });
  const source = marker("source", "Click where the point source goes (a moving wall is a piston material, see Materials)", (s, q) => { const id = s.freshId("s"); s.sources.push({ id, kind: "point", x: q[0], y: q[1], signal: { type: "ricker", f0: Math.round(s.sim.fmax / 3), amp: 1 }, radius: 0 }); return id; });
  const probe = marker("probe", "Click where the pressure is recorded", (s, q) => { const id = s.freshId("p"); s.probes.push({ id, x: q[0], y: q[1] }); return id; });

  return { select, polyline, line, rect, circle, arc, region, source, probe, ring, snapPoint };
}

/** The toolbar's buttons: key, tool name, glyph, title. */
export const TOOL_BUTTONS = [
  ["v", "select", "↖", "Select and move (V)"],
  ["p", "polyline", "⟋", "Polyline wall (P)"],
  ["l", "line", "╱", "Line wall (L)"],
  ["r", "rect", "▭", "Rectangle wall (R)"],
  ["c", "circle", "○", "Circle wall (C)"],
  ["a", "arc", "◠", "Arc wall (A)"],
  ["g", "region", "◇", "Region seed (G)"],
  ["s", "source", "◎", "Point source (S)"],
  ["b", "probe", "□", "Probe (B)"],
  ["o", "ring", "◌", "Probe ring, for a radiation pattern (O)"],
];
