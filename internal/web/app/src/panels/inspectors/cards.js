/*
 * The inspector cards, one per node type of the Scene tree. Every control
 * writes through state.modify(), with the level of what it invalidates:
 * geometry (remesh), physics (re-prepare) or view (nothing).
 */
import { head, field, row, number, text, select, checkbox, button, note, h4, pair, fmt } from "./ui.js";
import { BY_TYPE } from "../inspector.js";
import { SIGNAL_TYPES, MATERIAL_KINDS, PISTON_SIDES } from "../../scene/format.js";
import { Scene } from "../../scene/model.js";
import { COLORMAPS } from "../../sim/colormap.js";
import { armed } from "../../shell/dialog.js";

const card = (type, title) => { const el = document.createElement("div"); el.className = "card"; el.append(head(type, title)); return el; };

/** A number input bound to obj[key] (obj found again at write time by `find`). */
function num(state, find, key, level, opts = {}, help = "") {
  const obj = find(state.scene);
  const i = number(obj?.[key] ?? "", opts);
  i.addEventListener("change", () => {
    const v = parseFloat(i.value);
    if (!Number.isFinite(v)) { i.value = obj?.[key] ?? ""; return; }
    state.modify((s) => { const o = find(s); if (!o) return false; o[key] = v; }, { origin: "inspector", level });
  });
  return row(opts.label || key, i, help);
}

function point(state, find, keys, level, help = "") {
  const obj = find(state.scene);
  const a = number(obj?.[keys[0]] ?? 0), b = number(obj?.[keys[1]] ?? 0);
  const write = () => {
    const x = parseFloat(a.value), y = parseFloat(b.value);
    if (!Number.isFinite(x) || !Number.isFinite(y)) return;
    state.modify((s) => { const o = find(s); if (!o) return false; o[keys[0]] = x; o[keys[1]] = y; }, { origin: "inspector", level });
  };
  a.addEventListener("change", write); b.addEventListener("change", write);
  return row(keys.join(", "), pair(a, b), help);
}

function materialSelect(state, scene, value, onChange) {
  const s = select(value, scene.materials.map((m) => ({ value: m.name, label: `${m.name} (${m.kind})` })));
  s.addEventListener("change", () => onChange(s.value));
  return s;
}

function deleteButton(state, label, fn) {
  const b = armed(button(label, "danger small"), () => { state.modify(fn, { origin: "inspector", level: "geometry" }); state.select(null, { message: `${label}d`, kind: "ok" }); });
  const actions = document.createElement("div"); actions.className = "card-actions"; actions.append(b);
  return actions;
}

// ---------------------------------------------------------------------------

BY_TYPE.scene = (n, state) => {
  const s = state.scene, el = card("scene", state.sceneName);
  const mode = select(s.mode, ["planar", "axisym"]);
  mode.addEventListener("change", () => state.modify((x) => { x.mode = mode.value; }, { origin: "inspector" }));
  el.append(row("mode", mode, "planar: walls extruded out of the screen. axisym: x along a horizontal axis of revolution, y is the radius, draw above y = 0"));
  const units = select(s.units, ["m", "cm", "mm"]);
  units.addEventListener("change", () => state.modify((x) => { x.units = units.value; }, { origin: "inspector" }));
  el.append(row("units", units, "The unit of every coordinate in the scene"));
  el.append(field("walls", s.elements.length), field("sources", s.sources.length), field("probes", s.probes.length));
  const b = s.bbox();
  if (b) el.append(field("extent", `${fmt(b[2] - b[0])} × ${fmt(b[3] - b[1])} ${s.units}`));
  return el;
};

BY_TYPE.sim = (n, state) => {
  const s = state.scene, el = card("simulation", "Time domain");
  const find = (x) => x.sim;
  el.append(num(state, find, "fmax", "geometry", { min: 1, step: 10, label: "fmax (Hz)" }, "Highest frequency to resolve: sets the element size with nodes per wavelength"));
  el.append(num(state, find, "npl", "geometry", { min: 2, max: 40, step: 1, label: "nodes / wavelength" }, "Elements per wavelength at fmax. 10 is accurate; 6 is fast and dispersive"));
  el.append(num(state, find, "duration", "physics", { min: 0, step: 0.001, label: "duration (s)" }, "Simulated time"));
  el.append(num(state, find, "cfl", "physics", { min: 0.1, max: 1, step: 0.05, label: "cfl" }, "Fraction of the stable time step. Lower if the field blows up"));
  el.append(num(state, find, "angle", "geometry", { min: 0, max: 33, step: 1, label: "min angle (°)" }, "Smallest triangle angle the mesher aims for (up to 33)"));
  el.append(h4("Estimate"));
  const h = s.meshSize(), nodes = s.estimateNodes();
  el.append(field("element size h", Number.isFinite(h) ? `${fmt(h)} ${s.units}` : "—"));
  el.append(field("nodes (rough)", Number.isFinite(nodes) ? nodes.toLocaleString() : "—"));
  if (state.lastMesh) {
    el.append(h4("Last mesh"));
    el.append(field("nodes", state.lastMesh.nodes.toLocaleString()), field("triangles", state.lastMesh.triangles.toLocaleString()), field("min angle", `${state.lastMesh.minAngle.toFixed(1)}°`));
  }
  if (state.lastPrepare) {
    el.append(h4("Time step"));
    el.append(field("dt", `${(state.lastPrepare.dt * 1e6).toFixed(3)} µs`), field("steps", state.lastPrepare.steps.toLocaleString()));
  }
  return el;
};

BY_TYPE.view = (n, state) => {
  const s = state.scene, el = card("view", "Rendering");
  const cmap = select(s.view.colormap, COLORMAPS);
  cmap.addEventListener("change", () => state.modify((x) => { x.view.colormap = cmap.value; }, { origin: "inspector", level: "view" }));
  el.append(row("colormap", cmap, "rwb: blue negative, red positive, dark zero"));
  const gain = text(String(s.view.gain), "auto or a pressure");
  gain.addEventListener("change", () => {
    const v = gain.value.trim() === "auto" ? "auto" : parseFloat(gain.value);
    if (v !== "auto" && !(v > 0)) { gain.value = String(s.view.gain); return; }
    state.modify((x) => { x.view.gain = v; }, { origin: "inspector", level: "view" });
  });
  el.append(row("gain", gain, "auto follows the peak pressure seen so far; a number fixes the colour range to ±value"));
  const grid = number(s.gridStep(), { min: 0, step: "any", label: "grid" });
  grid.addEventListener("change", () => { const v = parseFloat(grid.value); if (v > 0) state.modify((x) => { x.view.grid = v; }, { origin: "inspector", level: "view" }); });
  el.append(row(`grid (${s.units})`, grid, "The step of the grid drawn in the viewport, which drawn points snap to"));
  const snap = checkbox(s.view.snap !== false);
  snap.addEventListener("change", () => state.modify((x) => { x.view.snap = snap.checked; }, { origin: "inspector", level: "view" }));
  el.append(row("snap to grid", snap, "Drawn and dragged points land on the grid"));
  el.append(note("Pan: drag. Zoom: wheel. F frames the scene, W toggles the mesh wireframe, H the grid, K locks the colour scale (the ⊜ button). With auto gain a louder source looks the same: lock the scale to compare amplitudes."));
  return el;
};

BY_TYPE.medium = (n, state) => {
  const find = (x) => x.medium(n.key);
  const m = find(state.scene);
  if (!m) return card("medium", "gone");
  const el = card("medium", m.name);
  el.append(num(state, find, "c", "geometry", { min: 1, step: 1, label: "c (m/s)" }, "Speed of sound. Sets the mesh size with fmax"));
  el.append(num(state, find, "rho", "physics", { min: 0.001, step: 0.01, label: "rho (kg/m³)" }, "Density"));
  el.append(field("wavelength at fmax", `${fmt(m.c / state.scene.sim.fmax)} m`));
  return el;
};

/** The signal rows (type, f0, amplitude, cycles, t0) and a sparkline, bound to find(scene).signal. */
function signalControls(state, el, find, ampHelp) {
  const sig = (x) => find(x)?.signal;
  const s = sig(state.scene);
  const type = select(s.type, SIGNAL_TYPES);
  type.addEventListener("change", () => state.modify((x) => { const g = sig(x); g.type = type.value; if (type.value === "burst") g.cycles ??= 3; }, { origin: "inspector", level: "physics" }));
  el.append(row("type", type, "gauss: a pulse. ricker: a zero-mean pulse. burst: n cycles of a sine. sine: continuous"));
  el.append(num(state, sig, "f0", "physics", { min: 1, step: 10, label: "f0 (Hz)" }, "Centre frequency of the pulse, or the tone"));
  el.append(num(state, sig, "amp", "physics", { step: 0.1, label: "amplitude" }, ampHelp));
  if (s.type === "burst") el.append(num(state, sig, "cycles", "physics", { min: 0.5, step: 0.5, label: "cycles" }, "Length of the burst in periods"));
  const t0 = number(s.t0 ?? "", { step: 0.0001 }); t0.placeholder = "auto";
  t0.addEventListener("change", () => state.modify((x) => { const g = sig(x); if (t0.value === "") delete g.t0; else g.t0 = parseFloat(t0.value); }, { origin: "inspector", level: "physics" }));
  el.append(row("t0 (s)", t0, "When the signal is centred (pulses) or starts (burst, sine). Empty: a sensible default"));
  const cv = document.createElement("canvas"); cv.className = "sparkline"; cv.width = 320; cv.height = 48;
  el.append(cv);
  requestAnimationFrame(() => sparkline(cv, s, state.scene.sim.duration));
}

BY_TYPE.material = (n, state) => {
  const find = (x) => x.material(n.key);
  const m = find(state.scene);
  if (!m) return card("material", "gone");
  const el = card("material", m.name);
  const kind = select(m.kind, MATERIAL_KINDS);
  kind.addEventListener("change", () => state.modify((x) => { const o = find(x); o.kind = kind.value; if (kind.value === "absorb") o.alpha ??= 0.5; if (kind.value === "impedance") o.zeta ??= 2; if (kind.value === "piston") o.signal ??= { type: "burst", f0: Math.round(x.sim.fmax / 3), amp: 0.01, cycles: 3 }; }, { origin: "inspector", level: "physics" }));
  el.append(row("kind", kind, "rigid: hard wall. absorb: by absorption coefficient. impedance: by normalized impedance. open: lets the wave out (first-order). symmetry: a mirror line, draw half the scene. piston: a moving wall, with its own signal"));
  if (m.kind === "symmetry") el.append(note("A mirror line: the same natural condition as a rigid wall, so only half the scene is meshed. The viewport draws the mirror image. A source on the line counts once in the half, twice in the whole."));
  if (m.kind === "piston") {
    el.append(h4("Signal: inward velocity"));
    signalControls(state, el, find, "Peak velocity of the wall into the fluid, m/s. A plane wave in a duct then has p = rho c u");
    const sides = select(m.sides || "both", PISTON_SIDES);
    sides.addEventListener("change", () => state.modify((x) => { find(x).sides = sides.value; }, { origin: "inspector", level: "physics" }));
    el.append(row("sides", sides, "For a piston drawn inside the air (a thin wall). both: a breathing membrane, both faces push. plate: a rigid plate, pushes on the left and pulls on the right (dipole). left / right: only that face moves, the other stays rigid. Left is on the left of the drawing direction. An outer wall has one face and ignores this"));
    el.append(note("Every wall segment with this material moves. Give it to one segment of a polyline with @name in the text, or per segment in the wall's card."));
  }
  if (m.kind === "absorb") el.append(num(state, find, "alpha", "physics", { min: 0, max: 1, step: 0.05, label: "alpha" }, "Energy absorption coefficient at normal incidence, 0 to 1"));
  if (m.kind === "impedance") el.append(num(state, find, "zeta", "physics", { min: 0.01, step: 0.1, label: "zeta = Z / (rho c)" }, "Normalized specific impedance. 1 is perfectly matched (open), large is rigid"));
  if (!["rigid", "symmetry", "piston"].includes(m.kind)) {
    const z = Scene.zeta(m), R = (z - 1) / (z + 1);
    el.append(field("zeta", fmt(z)), field("reflection R", fmt(R)), field("absorption", fmt(1 - R * R)));
  }
  const used = state.scene.elements.filter((e) => e.material === m.name || e.materials?.includes(m.name)).map((e) => e.id);
  el.append(field("used by", used.join(", ") || "nothing"));
  return el;
};

BY_TYPE.wall = (n, state) => {
  const find = (x) => x.element(n.key);
  const e = find(state.scene);
  if (!e) return card("wall", "gone");
  const el = card(`wall · ${e.kind}`, e.id);
  const piston = (e.kind === "polyline" ? e.materials : [e.material]).find((m) => state.scene.material(m)?.kind === "piston");
  if (piston) el.append(note(`Moved by piston material '${piston}'.`));
  if (e.kind === "polyline" || e.kind === "line") {
    if (e.kind === "polyline") {
      const closed = checkbox(e.closed);
      closed.addEventListener("change", () => state.modify((x) => { const o = find(x); o.closed = closed.checked; o.materials = o.closed ? [...o.materials, o.materials.at(-1) ?? o.material] : o.materials.slice(0, o.pts.length - 1); }, { origin: "inspector" }));
      el.append(row("closed", closed, "A closed polyline joins its last point to its first"));
    }
    el.append(h4("Points and segment materials"));
    const table = document.createElement("table"); table.className = "list";
    table.innerHTML = "<tr><th>#</th><th>x</th><th>y</th><th>segment →</th><th></th></tr>";
    const nseg = e.kind === "line" ? 1 : e.closed ? e.pts.length : e.pts.length - 1;
    e.pts.forEach(([x, y], i) => {
      const tr = document.createElement("tr");
      const tx = number(x), ty = number(y);
      const write = () => { const vx = parseFloat(tx.value), vy = parseFloat(ty.value); if (Number.isFinite(vx) && Number.isFinite(vy)) state.modify((s) => { find(s).pts[i] = [vx, vy]; }, { origin: "inspector" }); };
      tx.addEventListener("change", write); ty.addEventListener("change", write);
      const tdm = document.createElement("td");
      if (i < nseg) {
        const mats = e.kind === "line" ? [e.material] : e.materials;
        tdm.append(materialSelect(state, state.scene, mats[i], (v) => state.modify((s) => { const o = find(s); if (o.kind === "line") o.material = v; else o.materials[i] = v; }, { origin: "inspector", level: "physics" })));
      }
      const tdd = document.createElement("td");
      if (e.kind === "polyline" && e.pts.length > 2) {
        const del = button("×", "small quiet"); del.title = "Remove this point";
        del.addEventListener("click", () => state.modify((s) => { const o = find(s); o.pts.splice(i, 1); o.materials.splice(Math.min(i, o.materials.length - 1), 1); }, { origin: "inspector" }));
        tdd.append(del);
      }
      const td = (c) => { const d = document.createElement("td"); d.append(c); return d; };
      tr.append(td(String(i)), td(tx), td(ty), tdm, tdd);
      table.append(tr);
    });
    el.append(table);
    if (e.kind === "polyline") {
      const add = button("+ point", "small");
      add.addEventListener("click", () => state.modify((s) => { const o = find(s); const last = o.pts.at(-1); o.pts.push([last[0] + 1, last[1]]); o.materials.splice(o.closed ? o.pts.length - 1 : o.pts.length - 2, 0, o.materials.at(-1) ?? o.material); }, { origin: "inspector" }));
      const acts = document.createElement("div"); acts.className = "card-actions"; acts.append(add); el.append(acts);
    }
  } else {
    if (e.kind === "rect") { el.append(point(state, find, ["x", "y"], "geometry", "Lower-left corner")); el.append(point(state, find, ["w", "h"], "geometry", "Width and height")); }
    else { el.append(point(state, find, ["cx", "cy"], "geometry", "Centre")); el.append(num(state, find, "r", "geometry", { min: 0, step: 0.01, label: "radius" })); }
    if (e.kind === "arc") el.append(point(state, find, ["a0", "a1"], "geometry", "Start and end angles in degrees, counter-clockwise from +x"));
    el.append(row("material", materialSelect(state, state.scene, e.material, (v) => state.modify((s) => { find(s).material = v; }, { origin: "inspector", level: "physics" })), "The material of every side"));
  }
  el.append(deleteButton(state, "Delete", (s) => { s.elements = s.elements.filter((x) => x.id !== e.id); }));
  return el;
};

BY_TYPE.region = (n, state) => {
  const find = (x) => x.region(n.key);
  const r = find(state.scene);
  if (!r) return card("region", "gone");
  const el = card("region", r.id);
  el.append(point(state, find, ["x", "y"], "geometry", "A point inside the area to simulate; the flood fill starts there"));
  const med = select(r.medium, state.scene.media.map((m) => m.name));
  med.addEventListener("change", () => state.modify((s) => { find(s).medium = med.value; }, { origin: "inspector", level: "physics" }));
  el.append(row("medium", med));
  el.append(note("Every enclosed area you want simulated needs a seed. Areas without one (obstacles, the outside) are left out."));
  el.append(deleteButton(state, "Delete", (s) => { s.regions = s.regions.filter((x) => x.id !== r.id); }));
  return el;
};

BY_TYPE.source = (n, state) => {
  const find = (x) => x.source(n.key);
  const s = find(state.scene);
  if (!s) return card("source", "gone");
  const el = card("source · point", s.id);
  el.append(point(state, find, ["x", "y"], "geometry", "The monopole's position; it becomes a mesh node"));
  el.append(num(state, find, "radius", "physics", { min: 0, step: 0.01, label: "radius" }, "Spread the injection over nearby nodes (0: one node). Forced to one element on the axis"));
  el.append(h4("Signal"));
  signalControls(state, el, find, "Volume injection rate of the monopole");
  el.append(note("A moving wall (a loudspeaker membrane, a driven tube end) is a piston material: see Materials."));
  el.append(deleteButton(state, "Delete", (x) => { x.sources = x.sources.filter((y) => y.id !== s.id); }));
  return el;
};

BY_TYPE.ring = (n, state) => {
  const find = (x) => x.ring(n.key);
  const g = find(state.scene);
  if (!g) return card("probe ring", "gone");
  const el = card("probe ring", g.id);
  el.append(point(state, find, ["cx", "cy"], "geometry", "Centre of the ring, usually the source or the mouth"));
  el.append(num(state, find, "r", "geometry", { min: 0, step: 0.01, label: "radius" }, "Distance of the probes from the centre: in the far field for a directivity pattern"));
  el.append(num(state, find, "n", "geometry", { min: 2, max: 720, step: 1, label: "probes" }, "Number of probes around the ring (every 10° for 36)"));
  el.append(point(state, find, ["a0", "a1"], "geometry", "First and last angle in degrees, counter-clockwise from +x; 0 to 360 is the full circle"));
  el.append(field("probes in the mesh", state.scene.ringPoints(g).length));
  if (state.scene.mode === "axisym") el.append(note("Axisymmetric: the half below the axis does not exist, only the probes with y ≥ 0 are kept (0° to 180° around a centre on the axis)."));
  el.append(note("The Pattern tab of the Probes panel draws the peak (or RMS) pressure against the angle: the radiation diagram."));
  el.append(deleteButton(state, "Delete", (s) => { s.rings = s.rings.filter((x) => x.id !== g.id); }));
  return el;
};

BY_TYPE.probe = (n, state) => {
  const find = (x) => x.probe(n.key);
  const p = find(state.scene);
  if (!p) return card("probe", "gone");
  const el = card("probe", p.id);
  el.append(point(state, find, ["x", "y"], "geometry", "Where the pressure is recorded; it becomes a mesh node"));
  el.append(deleteButton(state, "Delete", (s) => { s.probes = s.probes.filter((x) => x.id !== p.id); }));
  return el;
};

/** The signal's shape over the duration, computed here in JS (same formulas as the engine). */
function sparkline(canvas, sig, duration) {
  const ctx = canvas.getContext("2d"), W = canvas.width, H = canvas.height;
  ctx.fillStyle = "#1b1d22"; ctx.fillRect(0, 0, W, H);
  const f = value(sig);
  const n = W, ys = Array.from({ length: n }, (_, i) => f(duration * i / (n - 1)));
  const m = Math.max(1e-30, ...ys.map(Math.abs));
  ctx.strokeStyle = "#2c3038"; ctx.beginPath(); ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2); ctx.stroke();
  ctx.strokeStyle = "#e5534b"; ctx.lineWidth = 1.2; ctx.beginPath();
  ys.forEach((y, i) => { const px = i, py = H / 2 - (y / m) * (H / 2 - 3); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); });
  ctx.stroke();
}

export function value(sig) {
  const PI = Math.PI;
  switch (sig.type) {
    case "gauss": { const s = 1 / (PI * sig.f0), t0 = sig.t0 ?? 4 * s; return (t) => sig.amp * Math.exp(-(((t - t0) / s) ** 2)); }
    case "ricker": { const t0 = sig.t0 ?? 1.5 / sig.f0; return (t) => { const a = (PI * sig.f0 * (t - t0)) ** 2; return sig.amp * (1 - 2 * a) * Math.exp(-a); }; }
    case "burst": { const t0 = sig.t0 ?? 0, len = (sig.cycles ?? 3) / sig.f0; return (t) => { const tau = t - t0; return tau < 0 || tau >= len ? 0 : sig.amp * Math.sin(2 * PI * sig.f0 * tau) * 0.5 * (1 - Math.cos(2 * PI * tau / len)); }; }
    default: { const t0 = sig.t0 ?? 0, len = 2 / sig.f0; return (t) => { const tau = t - t0; if (tau < 0) return 0; const r = tau >= len ? 1 : 0.5 * (1 - Math.cos(PI * tau / len)); return sig.amp * Math.sin(2 * PI * sig.f0 * tau) * r; }; }
  }
}
