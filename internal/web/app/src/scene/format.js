/*
 * The `.sw` scene text: one statement per line, `#` comments, an indented
 * line continues the statement above, `key=value` options, and `@material`
 * inside a point list switches the material of the segments that follow.
 *
 * parse(text) -> { scene, errors: [{ line, message }] }
 * serialize(scene) -> text
 *
 * Pure: no DOM, tested under Node. The Scene it builds is scene/model.js.
 */
import { Scene } from "./model.js";

const NUMBER = /^[-+]?(\d+\.?\d*|\.\d+)([eE][-+]?\d+)?$/;
const NAME = /^[A-Za-z_][\w-]*$/;

export const SIGNAL_TYPES = ["gauss", "ricker", "burst", "sine"];
export const MATERIAL_KINDS = ["rigid", "absorb", "impedance", "open", "symmetry", "piston", "screen"];
export const PISTON_SIDES = ["both", "plate", "left", "right"];
export const UNITS = { m: 1, cm: 0.01, mm: 0.001 };
export const STATEMENTS = ["soundwaves", "units", "mode", "medium", "material", "polyline", "line", "rect", "circle", "arc", "region", "source", "probe", "ring", "sim", "view"];

/** Split the text into statements: { line, words, comment, before[] }. */
function statements(text) {
  const out = [];
  let pendingComments = [];
  const lines = text.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const hash = raw.indexOf("#");
    const code = (hash >= 0 ? raw.slice(0, hash) : raw).trimEnd();
    const comment = hash >= 0 ? raw.slice(hash + 1).trim() : "";
    if (!code.trim()) {
      if (hash >= 0) pendingComments.push(comment);
      else if (pendingComments.length) pendingComments.push(""); // a blank line inside a comment block is kept as a blank
      continue;
    }
    const words = code.trim().split(/\s+/);
    // An indented line continues the statement above — unless it starts with
    // a statement keyword: the editor copies the indentation of the previous
    // line, and a `material` typed under a point list is a new statement.
    if (/^\s/.test(code) && out.length && !STATEMENTS.includes(words[0])) {
      const prev = out[out.length - 1];
      prev.words.push(...words);
      prev.lines.push(i + 1);
      if (comment) prev.after.push(comment);
      continue;
    }
    while (pendingComments.length && pendingComments[pendingComments.length - 1] === "") pendingComments.pop();
    out.push({ line: i + 1, lines: [i + 1], words, comment, after: [], before: pendingComments });
    pendingComments = [];
  }
  return { statements: out, trailing: pendingComments };
}

/** Separate `key=value` options from positional words. */
function split(words) {
  const options = {}, positional = [];
  for (const w of words) {
    const eq = w.indexOf("=");
    if (eq > 0 && NAME.test(w.slice(0, eq))) options[w.slice(0, eq)] = w.slice(eq + 1);
    else positional.push(w);
  }
  return { options, positional };
}

export function parse(text) {
  const scene = new Scene();
  const errors = [];
  const { statements: stmts, trailing } = statements(text);
  const ids = new Map();
  const err = (st, message) => errors.push({ line: st.line, message });
  const num = (st, w, what) => {
    if (w === undefined || !NUMBER.test(w)) { err(st, `${what}: expected a number, got '${w ?? "nothing"}'`); return NaN; }
    return parseFloat(w);
  };
  const optNum = (st, options, key, fallback) => {
    if (!(key in options)) return fallback;
    const v = options[key];
    if (!NUMBER.test(v)) { err(st, `${key}: expected a number, got '${v}'`); return fallback; }
    return parseFloat(v);
  };
  const optPair = (st, options, key, fallback) => {
    if (!(key in options)) return fallback;
    const parts = options[key].split(",");
    if (parts.length !== 2 || !parts.every((p) => NUMBER.test(p))) { err(st, `${key}: expected x,y`); return fallback; }
    return parts.map(parseFloat);
  };
  // Two namespaces: walls, regions, sources and probes share ids; media and
  // materials share names. "air" can be both a medium and a region.
  const names = new Map();
  const ident = (st, w, space = ids) => {
    if (!w || !NAME.test(w)) { err(st, `expected a name, got '${w ?? "nothing"}'`); return null; }
    if (space.has(w)) { err(st, `'${w}' is already used (line ${space.get(w)})`); return null; }
    space.set(w, st.line);
    return w;
  };
  const materialName = (st, name) => {
    if (name === undefined) return scene.defaultMaterial();
    if (!scene.materials.some((m) => m.name === name)) { err(st, `unknown material '${name}'`); return scene.defaultMaterial(); }
    return name;
  };
  const annotate = (obj, st) => { obj.line = st.line; obj.before = st.before; obj.comment = st.comment; obj.after = st.after; return obj; };
  // Points with `@material` switches: segment i (from point i) takes the material
  // named right after point i, else the one in force.
  const points = (st, words, defaultMat) => {
    const pts = [], mats = [];
    let current = defaultMat, pending = null;
    for (const w of words) {
      if (w.startsWith("@")) {
        current = materialName(st, w.slice(1));
        if (mats.length) mats[mats.length - 1] = current;
        continue;
      }
      if (!NUMBER.test(w)) { err(st, `unexpected '${w}' in the point list`); continue; }
      if (pending === null) pending = parseFloat(w);
      else { pts.push([pending, parseFloat(w)]); mats.push(current); pending = null; }
    }
    if (pending !== null) err(st, "odd number of coordinates: a point needs x and y");
    return { pts, mats };
  };

  // signal=gauss f0=800 amp=1 [t0=] [cycles=]: shared by point sources and piston materials.
  const readSignal = (st, options) => {
    const type = options.signal ?? "gauss";
    if (!SIGNAL_TYPES.includes(type)) { err(st, `signal must be one of ${SIGNAL_TYPES.join(", ")}`); return null; }
    const signal = { type, f0: optNum(st, options, "f0", 500), amp: optNum(st, options, "amp", 1) };
    if ("t0" in options) signal.t0 = optNum(st, options, "t0", undefined);
    if (type === "burst") signal.cycles = optNum(st, options, "cycles", 3);
    return signal;
  };

  if (!stmts.length || stmts[0].words[0] !== "soundwaves") errors.push({ line: 1, message: "the file must start with 'soundwaves 1'" });
  scene.leading = stmts.length && stmts[0].words[0] === "soundwaves" ? stmts[0].before : [];

  for (const st of stmts) {
    const [kw, ...rest] = st.words;
    const { options, positional } = split(rest);
    switch (kw) {
      case "soundwaves": {
        const v = num(st, positional[0], "version");
        if (v !== 1) err(st, `unsupported format version ${v}`);
        break;
      }
      case "units":
        if (!(positional[0] in UNITS)) err(st, `units must be one of ${Object.keys(UNITS).join(", ")}`);
        else scene.units = positional[0];
        break;
      case "mode":
        if (!["planar", "axisym"].includes(positional[0])) err(st, "mode must be planar or axisym");
        else scene.mode = positional[0];
        break;
      case "medium": {
        const name = ident(st, positional[0], names);
        if (!name) break;
        scene.media.push(annotate({ name, c: optNum(st, options, "c", 343), rho: optNum(st, options, "rho", 1.2) }, st));
        break;
      }
      case "material": {
        const name = ident(st, positional[0], names);
        if (!name) break;
        const kind = positional[1] || "rigid";
        if (!MATERIAL_KINDS.includes(kind)) { err(st, `material kind must be one of ${MATERIAL_KINDS.join(", ")}`); break; }
        const m = { name, kind };
        if (kind === "absorb") m.alpha = optNum(st, options, "alpha", 0.5);
        if (kind === "impedance") m.zeta = optNum(st, options, "zeta", 2);
        if (kind === "screen") {
          // Flow resistance: in rayl (Pa.s/m), or normalized to rho c with r=.
          if ("rayl" in options) m.rayl = optNum(st, options, "rayl", 200);
          else if ("r" in options) m.rayl = optNum(st, options, "r", 0.5) * 343 * 1.2;
          else m.rayl = 200;
          if (!(m.rayl > 0)) { err(st, "a screen needs a positive resistance (rayl= or r=)"); break; }
        }
        if (kind === "piston") {
          m.signal = readSignal(st, options); if (!m.signal) break;
          if ("sides" in options) { if (PISTON_SIDES.includes(options.sides)) m.sides = options.sides; else err(st, `sides must be one of ${PISTON_SIDES.join(", ")}`); }
        }
        scene.materials.push(annotate(m, st));
        break;
      }
      case "polyline": {
        const id = ident(st, positional[0]);
        if (!id) break;
        const closed = positional.includes("closed");
        const defaultMat = materialName(st, options.material);
        const { pts, mats } = points(st, positional.slice(1).filter((w) => w !== "closed"), defaultMat);
        if (pts.length < 2) { err(st, "a polyline needs two points at least"); break; }
        scene.elements.push(annotate({ id, kind: "polyline", closed, pts, materials: closed ? mats : mats.slice(0, -1), material: defaultMat }, st));
        break;
      }
      case "line": {
        const id = ident(st, positional[0]);
        if (!id) break;
        const [x1, y1, x2, y2] = positional.slice(1, 5).map((w, i) => num(st, w, ["x1", "y1", "x2", "y2"][i]));
        scene.elements.push(annotate({ id, kind: "line", pts: [[x1, y1], [x2, y2]], material: materialName(st, options.material) }, st));
        break;
      }
      case "rect": {
        const id = ident(st, positional[0]);
        if (!id) break;
        const [x, y, w, h] = positional.slice(1, 5).map((v, i) => num(st, v, ["x", "y", "w", "h"][i]));
        scene.elements.push(annotate({ id, kind: "rect", x, y, w, h, material: materialName(st, options.material) }, st));
        break;
      }
      case "circle": {
        const id = ident(st, positional[0]);
        if (!id) break;
        const [cx, cy, r] = positional.slice(1, 4).map((v, i) => num(st, v, ["cx", "cy", "r"][i]));
        scene.elements.push(annotate({ id, kind: "circle", cx, cy, r, material: materialName(st, options.material) }, st));
        break;
      }
      case "arc": {
        const id = ident(st, positional[0]);
        if (!id) break;
        const [cx, cy, r, a0, a1] = positional.slice(1, 6).map((v, i) => num(st, v, ["cx", "cy", "r", "a0", "a1"][i]));
        scene.elements.push(annotate({ id, kind: "arc", cx, cy, r, a0, a1, material: materialName(st, options.material) }, st));
        break;
      }
      case "region": {
        const id = ident(st, positional[0]);
        if (!id) break;
        const x = num(st, positional[1], "x"), y = num(st, positional[2], "y");
        let medium = options.medium ?? scene.media[0]?.name;
        if (!medium) { err(st, "no medium defined: add `medium air c=343 rho=1.2` first"); break; }
        if (!scene.media.some((m) => m.name === medium)) { err(st, `unknown medium '${medium}'`); medium = scene.media[0]?.name; }
        scene.regions.push(annotate({ id, x, y, medium }, st));
        break;
      }
      case "source": {
        const id = ident(st, positional[0]);
        if (!id) break;
        if (positional[1] === "piston") { err(st, "a piston is a material now: `material drive piston signal=burst f0=1500 amp=0.01`, then give that material to the wall"); break; }
        if (positional[1] !== "point") { err(st, "source kind must be point"); break; }
        const signal = readSignal(st, options);
        if (!signal) break;
        const x = num(st, positional[2], "x"), y = num(st, positional[3], "y");
        scene.sources.push(annotate({ id, kind: "point", x, y, signal, radius: optNum(st, options, "radius", 0) }, st));
        break;
      }
      case "probe": {
        const id = ident(st, positional[0]);
        if (!id) break;
        scene.probes.push(annotate({ id, x: num(st, positional[1], "x"), y: num(st, positional[2], "y") }, st));
        break;
      }
      case "ring": {
        // A ring of probes for a radiation pattern: centre, radius, count, angles.
        const id = ident(st, positional[0]);
        if (!id) break;
        const [cx, cy, r] = positional.slice(1, 4).map((v, i) => num(st, v, ["cx", "cy", "r"][i]));
        const n = Math.round(optNum(st, options, "n", 36));
        if (!(n >= 2 && n <= 720)) { err(st, "n: between 2 and 720 probes"); break; }
        scene.rings.push(annotate({ id, cx, cy, r, n, a0: optNum(st, options, "a0", 0), a1: optNum(st, options, "a1", 360) }, st));
        break;
      }
      case "sim": {
        const s = scene.sim;
        s.fmax = optNum(st, options, "fmax", s.fmax);
        s.npl = optNum(st, options, "npl", s.npl);
        s.duration = optNum(st, options, "duration", s.duration);
        s.cfl = optNum(st, options, "cfl", s.cfl);
        s.angle = optNum(st, options, "angle", s.angle);
        s.h = optNum(st, options, "h", s.h);
        s.maxNodes = optNum(st, options, "max_nodes", s.maxNodes);
        annotate(s, st);
        break;
      }
      case "view": {
        const v = scene.view;
        v.center = optPair(st, options, "center", v.center);
        v.scale = optNum(st, options, "scale", v.scale);
        if (options.colormap) v.colormap = options.colormap;
        if (options.gain) v.gain = options.gain === "auto" ? "auto" : optNum(st, options, "gain", v.gain);
        if ("grid" in options) { const g = optNum(st, options, "grid", v.grid); if (g > 0) v.grid = g; else err(st, "grid must be a positive step"); }
        if ("snap" in options) { if (["on", "off"].includes(options.snap)) v.snap = options.snap === "on"; else err(st, "snap must be on or off"); }
        annotate(v, st);
        break;
      }
      default:
        err(st, `unknown statement '${kw}'`);
    }
  }
  scene.trailing = trailing;
  return { scene, errors };
}

// ---------------------------------------------------------------------------

/** 10 significant digits, no trailing zeros: exact enough to round-trip what
    anyone types, short enough to read. */
export function fmt(x) {
  if (typeof x !== "number" || !Number.isFinite(x)) return String(x);
  return String(parseFloat(x.toPrecision(10)));
}

function withComments(obj, line) {
  const out = [];
  for (const c of obj.before || []) out.push(c === "" ? "" : `# ${c}`);
  out.push(obj.comment ? `${line}   # ${obj.comment}` : line);
  return out;
}

function pointList(pts, mats, defaultMat, closed) {
  const words = [];
  let current = defaultMat;
  const nseg = closed ? pts.length : pts.length - 1;
  for (let i = 0; i < pts.length; i++) {
    let w = `${fmt(pts[i][0])} ${fmt(pts[i][1])}`;
    if (i < nseg && mats[i] !== current) { current = mats[i]; w += ` @${current}`; }
    words.push(w);
  }
  // Six points per line keeps long walls readable.
  const lines = [];
  for (let i = 0; i < words.length; i += 6) lines.push("    " + words.slice(i, i + 6).join("   "));
  return lines;
}

export function serialize(scene) {
  const out = [];
  for (const c of scene.leading || []) out.push(c === "" ? "" : `# ${c}`);
  out.push("soundwaves 1");
  out.push(`units ${scene.units}`);
  out.push(`mode ${scene.mode}`);
  const opt = (k, v) => (v === undefined || v === null || v === "" ? "" : ` ${k}=${typeof v === "number" ? fmt(v) : v}`);
  for (const m of scene.media) out.push(...withComments(m, `medium ${m.name}${opt("c", m.c)}${opt("rho", m.rho)}`));
  const signalOpts = (sig) => `${opt("signal", sig.type)}${opt("f0", sig.f0)}${opt("amp", sig.amp)}${opt("t0", sig.t0)}${sig.type === "burst" ? opt("cycles", sig.cycles) : ""}`;
  for (const m of scene.materials) {
    let line = `material ${m.name} ${m.kind}`;
    if (m.kind === "absorb") line += opt("alpha", m.alpha);
    if (m.kind === "impedance") line += opt("zeta", m.zeta);
    if (m.kind === "piston") line += signalOpts(m.signal || { type: "sine", f0: 500, amp: 0.01 }) + (m.sides && m.sides !== "both" ? opt("sides", m.sides) : "");
    if (m.kind === "screen") line += opt("rayl", m.rayl);
    out.push(...withComments(m, line));
  }
  for (const e of scene.elements) {
    const mat = opt("material", e.material);
    switch (e.kind) {
      case "polyline": {
        out.push(...withComments(e, `polyline ${e.id}${e.closed ? " closed" : ""}${mat}`));
        out.push(...pointList(e.pts, e.materials, e.material, e.closed));
        break;
      }
      case "line": out.push(...withComments(e, `line ${e.id} ${fmt(e.pts[0][0])} ${fmt(e.pts[0][1])} ${fmt(e.pts[1][0])} ${fmt(e.pts[1][1])}${mat}`)); break;
      case "rect": out.push(...withComments(e, `rect ${e.id} ${fmt(e.x)} ${fmt(e.y)} ${fmt(e.w)} ${fmt(e.h)}${mat}`)); break;
      case "circle": out.push(...withComments(e, `circle ${e.id} ${fmt(e.cx)} ${fmt(e.cy)} ${fmt(e.r)}${mat}`)); break;
      case "arc": out.push(...withComments(e, `arc ${e.id} ${fmt(e.cx)} ${fmt(e.cy)} ${fmt(e.r)} ${fmt(e.a0)} ${fmt(e.a1)}${mat}`)); break;
    }
  }
  for (const r of scene.regions) out.push(...withComments(r, `region ${r.id} ${fmt(r.x)} ${fmt(r.y)}${opt("medium", r.medium)}`));
  for (const s of scene.sources) {
    out.push(...withComments(s, `source ${s.id} point ${fmt(s.x)} ${fmt(s.y)}${signalOpts(s.signal)}${s.radius ? opt("radius", s.radius) : ""}`));
  }
  for (const p of scene.probes) out.push(...withComments(p, `probe ${p.id} ${fmt(p.x)} ${fmt(p.y)}`));
  for (const g of scene.rings || []) out.push(...withComments(g, `ring ${g.id} ${fmt(g.cx)} ${fmt(g.cy)} ${fmt(g.r)}${opt("n", g.n)}${g.a0 !== 0 ? opt("a0", g.a0) : ""}${g.a1 !== 360 ? opt("a1", g.a1) : ""}`));
  const s = scene.sim;
  out.push(...withComments(s, `sim${opt("fmax", s.fmax)}${opt("npl", s.npl)}${opt("duration", s.duration)}${opt("cfl", s.cfl)}${opt("angle", s.angle)}${opt("h", s.h)}${s.maxNodes !== 500000 ? opt("max_nodes", s.maxNodes) : ""}`));
  const v = scene.view;
  out.push(...withComments(v, `view center=${fmt(v.center[0])},${fmt(v.center[1])}${opt("scale", v.scale)}${opt("colormap", v.colormap)}${opt("gain", v.gain)}${opt("grid", v.grid)}${v.snap === false ? " snap=off" : ""}`));
  for (const c of scene.trailing || []) out.push(c === "" ? "" : `# ${c}`);
  return out.join("\n") + "\n";
}
