/*
 * Geometry helpers shared by the CAD overlay and the tools: arcs to points,
 * distances to walls, snapping. Pure.
 */

/** Points along an arc from a0 to a1 degrees (counter-clockwise), n segments. */
export function arcPoints(cx, cy, r, a0, a1, n) {
  const out = [];
  const full = Math.abs(a1 - a0) >= 360 - 1e-9;
  const s = (a0 * Math.PI) / 180, e = full ? s + 2 * Math.PI : (a1 * Math.PI) / 180;
  const count = full ? n : Math.max(2, Math.ceil(n * Math.abs(e - s) / (2 * Math.PI)));
  for (let i = 0; i <= count; i++) {
    const a = s + (e - s) * i / count;
    out.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  if (full) out.pop();
  return out;
}

/** Squared distance from p to the segment ab. */
export function distanceToSegment2(p, a, b) {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const l2 = dx * dx + dy * dy;
  const t = l2 > 0 ? Math.min(1, Math.max(0, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / l2)) : 0;
  const qx = a[0] + t * dx, qy = a[1] + t * dy;
  return (p[0] - qx) ** 2 + (p[1] - qy) ** 2;
}

/** The polyline (list of points) an element draws as, plus whether it closes. */
export function outline(e) {
  switch (e.kind) {
    case "polyline": return { pts: e.pts, closed: !!e.closed };
    case "line": return { pts: e.pts, closed: false };
    case "rect": return { pts: [[e.x, e.y], [e.x + e.w, e.y], [e.x + e.w, e.y + e.h], [e.x, e.y + e.h]], closed: true };
    case "circle": return { pts: arcPoints(e.cx, e.cy, e.r, 0, 360, 64), closed: true };
    case "arc": return { pts: arcPoints(e.cx, e.cy, e.r, e.a0, e.a1, 48), closed: false };
    default: return { pts: [], closed: false };
  }
}

/** Distance from p to an element's outline. */
export function distanceToElement(p, e) {
  const { pts, closed } = outline(e);
  let best = Infinity;
  const n = pts.length, nseg = closed ? n : n - 1;
  for (let i = 0; i < nseg; i++) best = Math.min(best, distanceToSegment2(p, pts[i], pts[(i + 1) % n]));
  return Math.sqrt(best);
}

/** Round v to the grid, without the floating-point crumbs (1.1500000000000001). */
export function snap(v, step) { return step > 0 ? parseFloat((Math.round(v / step) * step).toFixed(9)) : v; }

/**
 * The mirror lines of a scene: every straight wall segment whose material is
 * `symmetry`, plus the axis y = 0 in axisymmetric mode. Each is { p: [x, y],
 * d: [dx, dy] } with d a unit vector. Collinear duplicates are merged.
 */
export function mirrorLines(scene) {
  const lines = [];
  const add = (p, d) => {
    const n = Math.hypot(d[0], d[1]);
    if (!n) return;
    const u = [d[0] / n, d[1] / n];
    // Same line already there? (same direction up to sign, p on it)
    const dup = lines.some((l) => Math.abs(l.d[0] * u[1] - l.d[1] * u[0]) < 1e-9 && Math.abs((p[0] - l.p[0]) * l.d[1] - (p[1] - l.p[1]) * l.d[0]) < 1e-9);
    if (!dup) lines.push({ p, d: u });
  };
  if (scene.mode === "axisym") add([0, 0], [1, 0]);
  for (const e of scene.elements) {
    const isSym = (m) => scene.material(m)?.kind === "symmetry";
    if (e.kind === "line") { if (isSym(e.material)) add(e.pts[0], [e.pts[1][0] - e.pts[0][0], e.pts[1][1] - e.pts[0][1]]); }
    else if (e.kind === "polyline") {
      const n = e.pts.length, nseg = e.closed ? n : n - 1;
      for (let i = 0; i < nseg; i++) if (isSym(e.materials[i])) { const a = e.pts[i], b = e.pts[(i + 1) % n]; add(a, [b[0] - a[0], b[1] - a[1]]); }
    } else if (e.kind === "rect" && isSym(e.material)) { add([e.x, e.y], [1, 0]); add([e.x, e.y], [0, 1]); add([e.x + e.w, e.y + e.h], [1, 0]); add([e.x + e.w, e.y + e.h], [0, 1]); }
  }
  return lines.slice(0, 3);
}

/** Reflection across a mirror line, as an affine 2x3 matrix [a, b, c, d, tx, ty]: x' = a x + c y + tx, y' = b x + d y + ty. */
export function reflection({ p, d }) {
  const a = 2 * d[0] * d[0] - 1, b = 2 * d[0] * d[1], dd = 2 * d[1] * d[1] - 1;
  return [a, b, b, dd, p[0] - (a * p[0] + b * p[1]), p[1] - (b * p[0] + dd * p[1])];
}

/** Compose affine matrices: first m1 then m2. */
export function compose(m2, m1) {
  return [
    m2[0] * m1[0] + m2[2] * m1[1], m2[1] * m1[0] + m2[3] * m1[1],
    m2[0] * m1[2] + m2[2] * m1[3], m2[1] * m1[2] + m2[3] * m1[3],
    m2[0] * m1[4] + m2[2] * m1[5] + m2[4], m2[1] * m1[4] + m2[3] * m1[5] + m2[5],
  ];
}

export function apply(m, [x, y]) { return [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]]; }

/** Every mirror image of the scene: the reflections across each line and their compositions (up to 7 for 3 lines). */
export function mirrorTransforms(scene) {
  const lines = mirrorLines(scene);
  const out = [];
  for (let mask = 1; mask < 1 << lines.length; mask++) {
    let m = null;
    for (let i = 0; i < lines.length; i++) if (mask & (1 << i)) { const r = reflection(lines[i]); m = m ? compose(r, m) : r; }
    out.push(m);
  }
  return out;
}
