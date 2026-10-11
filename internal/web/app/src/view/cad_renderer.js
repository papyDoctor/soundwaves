/*
 * The CAD overlay, in Canvas2D: grid, axis, walls coloured by material kind,
 * sources, probes, region seeds, the selection, and the tool's rubber band.
 * Draws from the scene (the truth), not from the mesh.
 */
import { arcPoints, outline, apply } from "../scene/geometry.js";

export const KIND_COLORS = { rigid: "#c8ccd4", absorb: "#f0a040", impedance: "#e2b93d", open: "#4fd0e0", piston: "#3ec281", symmetry: "#c792ea", screen: "#ff9cac" };

export function drawCad(ctx, camera, scene, { selection = null, hover = null, rubber = null, showGrid = true, dpr = 1, mirrors = [], gridStep = 0 } = {}) {
  const W = camera.width, H = camera.height;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, W, H);
  if (!scene) return;
  const P = (x, y) => camera.toScreen(x, y);
  ctx.lineJoin = "round"; ctx.lineCap = "round";

  // The grid is the snap grid. Too dense for the zoom, it is drawn every 10 steps.
  if (showGrid) {
    let step = gridStep > 0 ? gridStep : camera.gridStep();
    while (step * camera.scale < 7) step *= 10;
    const [x0, y1] = camera.toScene(0, 0), [x1, y0] = camera.toScene(W, H);
    ctx.lineWidth = 1;
    for (let x = Math.ceil(x0 / step) * step; x <= x1; x += step) {
      const [sx] = P(x, 0); const major = Math.abs(x / (step * 5) - Math.round(x / (step * 5))) < 1e-6;
      ctx.strokeStyle = major ? "#2c3038" : "#1f2228"; ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, H); ctx.stroke();
    }
    for (let y = Math.ceil(y0 / step) * step; y <= y1; y += step) {
      const [, sy] = P(0, y); const major = Math.abs(y / (step * 5) - Math.round(y / (step * 5))) < 1e-6;
      ctx.strokeStyle = major ? "#2c3038" : "#1f2228"; ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(W, sy); ctx.stroke();
    }
    // Origin axes.
    ctx.strokeStyle = "#3a3f4a";
    const [ox, oy] = P(0, 0);
    ctx.beginPath(); ctx.moveTo(ox, 0); ctx.lineTo(ox, H); ctx.moveTo(0, oy); ctx.lineTo(W, oy); ctx.stroke();
  }

  // Axisymmetric: the axis of revolution is y = 0; below it there is nothing.
  if (scene.mode === "axisym") {
    const [, ay] = P(0, 0);
    if (ay < H) { ctx.fillStyle = "#00000066"; ctx.fillRect(0, Math.max(ay, 0), W, H - Math.max(ay, 0)); }
    ctx.strokeStyle = "#8a93a6"; ctx.lineWidth = 1.5; ctx.setLineDash([12, 6, 3, 6]);
    ctx.beginPath(); ctx.moveTo(0, ay); ctx.lineTo(W, ay); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = "#8a93a6"; ctx.font = "11px ui-monospace, monospace"; ctx.fillText("axis of revolution", 8, ay - 5);
  }

  // Mirror images of the walls, dim: what the symmetry lines imply.
  if (mirrors.length) {
    ctx.save();
    ctx.globalAlpha = 0.5; ctx.strokeStyle = "#c8ccd4"; ctx.lineWidth = 1.5;
    for (const m of mirrors) {
      for (const e of scene.elements) {
        const { pts, closed } = outline(e);
        ctx.beginPath();
        pts.forEach((q, i) => { const [sx, sy] = P(...apply(m, q)); i ? ctx.lineTo(sx, sy) : ctx.moveTo(sx, sy); });
        if (closed) ctx.closePath();
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  // Walls.
  const colorOf = (e, mat) => KIND_COLORS[scene.material(mat)?.kind] || KIND_COLORS.rigid;
  for (const e of scene.elements) {
    const selected = selection?.type === "wall" && selection.id === e.id;
    const hovered = hover?.type === "wall" && hover.id === e.id;
    ctx.lineWidth = selected ? 3 : hovered ? 2.5 : 2;
    const dashed = (mat) => ["open", "symmetry", "screen"].includes(scene.material(mat)?.kind);
    // A piston shows which face pushes: ticks on the moving side(s), a dashed tick where it pulls.
    const ticks = (pts, mat, close) => {
      const m = scene.material(mat);
      if (m?.kind !== "piston") return;
      const sides = m.sides || "both";
      const n = pts.length, nseg = close ? n : n - 1;
      ctx.strokeStyle = KIND_COLORS.piston; ctx.lineWidth = 1.5;
      for (let i = 0; i < nseg; i++) {
        const a = pts[i], b = pts[(i + 1) % n];
        const [ax, ay] = P(...a), [bx, by] = P(...b);
        const len = Math.hypot(bx - ax, by - ay); if (len < 12) continue;
        const [mx, my] = [(ax + bx) / 2, (ay + by) / 2];
        // Left of the drawing direction, in screen space (y down): rotate -90°.
        const lx = (by - ay) / len, ly = -(bx - ax) / len;
        const tick = (dir, dashed) => { ctx.setLineDash(dashed ? [3, 3] : []); ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(mx + dir * lx * 9, my + dir * ly * 9); ctx.stroke(); };
        if (sides === "both") { tick(1, false); tick(-1, false); }
        else if (sides === "plate") { tick(1, false); tick(-1, true); }
        else if (sides === "left") tick(1, false);
        else tick(-1, false);
      }
      ctx.setLineDash([]);
    };
    const stroke = (pts, mat, close) => {
      ticks(pts, mat, close);
      ctx.strokeStyle = selected ? "#4fa3ff" : colorOf(e, mat);
      ctx.setLineDash(dashed(mat) ? [6, 4] : []);
      ctx.beginPath();
      pts.forEach(([x, y], i) => { const [sx, sy] = P(x, y); i ? ctx.lineTo(sx, sy) : ctx.moveTo(sx, sy); });
      if (close) ctx.closePath();
      ctx.stroke();
    };
    switch (e.kind) {
      case "polyline": {
        const n = e.pts.length, nseg = e.closed ? n : n - 1;
        for (let i = 0; i < nseg; i++) stroke([e.pts[i], e.pts[(i + 1) % n]], e.materials[i], false);
        break;
      }
      case "line": stroke(e.pts, e.material, false); break;
      case "rect": stroke([[e.x, e.y], [e.x + e.w, e.y], [e.x + e.w, e.y + e.h], [e.x, e.y + e.h]], e.material, true); break;
      case "circle": stroke(arcPoints(e.cx, e.cy, e.r, 0, 360, 64), e.material, true); break;
      case "arc": stroke(arcPoints(e.cx, e.cy, e.r, e.a0, e.a1, 48), e.material, false); break;
    }
    ctx.setLineDash([]);
    // Vertices of the selection.
    if (selected && (e.kind === "polyline" || e.kind === "line")) {
      ctx.fillStyle = "#4fa3ff";
      for (const [x, y] of e.pts) { const [sx, sy] = P(x, y); ctx.fillRect(sx - 3, sy - 3, 6, 6); }
    }
  }

  ctx.font = "11px system-ui, sans-serif";
  // Region seeds: a small diamond.
  for (const r of scene.regions) {
    const [sx, sy] = P(r.x, r.y);
    const sel = selection?.type === "region" && selection.id === r.id;
    ctx.strokeStyle = sel ? "#4fa3ff" : "#9aa0ab"; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(sx, sy - 6); ctx.lineTo(sx + 6, sy); ctx.lineTo(sx, sy + 6); ctx.lineTo(sx - 6, sy); ctx.closePath(); ctx.stroke();
    ctx.fillStyle = ctx.strokeStyle; ctx.fillText(r.id, sx + 9, sy + 4);
  }
  // Sources: a red circle with a cross.
  for (const s of scene.sources) {
    const [sx, sy] = P(s.x, s.y);
    const sel = selection?.type === "source" && selection.id === s.id;
    ctx.strokeStyle = sel ? "#4fa3ff" : "#e5534b"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(sx, sy, 6, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(sx - 9, sy); ctx.lineTo(sx + 9, sy); ctx.moveTo(sx, sy - 9); ctx.lineTo(sx, sy + 9); ctx.stroke();
    ctx.fillStyle = ctx.strokeStyle; ctx.fillText(s.id, sx + 10, sy - 8);
  }
  // Probe rings: a dashed circle with a dot per probe.
  for (const g of scene.rings || []) {
    const sel = selection?.type === "ring" && selection.id === g.id;
    ctx.strokeStyle = sel ? "#4fa3ff" : "#4fd0e0"; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
    const [cx, cy] = P(g.cx, g.cy);
    ctx.beginPath(); ctx.arc(cx, cy, g.r * camera.scale, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = ctx.strokeStyle;
    for (const q of scene.ringPoints(g)) { const [sx, sy] = P(q.x, q.y); ctx.fillRect(sx - 2, sy - 2, 4, 4); }
    ctx.beginPath(); ctx.moveTo(cx - 5, cy); ctx.lineTo(cx + 5, cy); ctx.moveTo(cx, cy - 5); ctx.lineTo(cx, cy + 5); ctx.stroke();
    ctx.fillText(g.id, cx + 7, cy - 6);
  }
  // Probes: a cyan square.
  for (const p of scene.probes) {
    const [sx, sy] = P(p.x, p.y);
    const sel = selection?.type === "probe" && selection.id === p.id;
    ctx.strokeStyle = sel ? "#4fa3ff" : "#4fd0e0"; ctx.lineWidth = 2;
    ctx.strokeRect(sx - 5, sy - 5, 10, 10);
    ctx.fillStyle = ctx.strokeStyle; ctx.fillText(p.id, sx + 9, sy - 7);
  }
  // The tool's rubber band: a list of scene points, dashed.
  if (rubber?.length > 1) {
    ctx.strokeStyle = "#4fa3ff"; ctx.lineWidth = 1.5; ctx.setLineDash([5, 4]);
    ctx.beginPath();
    rubber.forEach(([x, y], i) => { const [sx, sy] = P(x, y); i ? ctx.lineTo(sx, sy) : ctx.moveTo(sx, sy); });
    ctx.stroke(); ctx.setLineDash([]);
  }
}
