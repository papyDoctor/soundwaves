/*
 * The Viewport: the field in WebGL2 below, the CAD overlay in Canvas2D above,
 * one camera for both. Pan by dragging, zoom with the wheel anchored at the
 * cursor. F frames the scene, W toggles the mesh wireframe, G the grid.
 * Drawing tools plug in through `tools` (M3); without one, dragging pans.
 */
import { Camera } from "./camera.js";
import { FieldRenderer } from "./field_renderer.js";
import { drawCad } from "./cad_renderer.js";
import { cssGradient } from "../sim/colormap.js";
import { fmt } from "../panels/inspectors/ui.js";
import { makeTools, TOOL_BUTTONS } from "./tools.js";
import { mirrorTransforms } from "../scene/geometry.js";



export function mountViewport(element, state) {
  element.classList.add("flush", "viewport-panel");
  element.innerHTML = `<div class="viewport-tools">
      ${TOOL_BUTTONS.map(([k, name, glyph, title]) => `<button type="button" class="button tool" data-tool="${name}" title="${title}">${glyph}</button>`).join("")}
      <div class="gap"></div>
      <button type="button" class="button" data-role="lock" title="Lock the colour scale at its current range, to compare amplitudes between runs (K). Auto follows the peak, so every run looks alike">⊜</button>
      <button type="button" class="button" data-role="fit" title="Frame the scene (F)">⤢</button>
      <button type="button" class="button" data-role="wire" title="Show the mesh triangles (W)">△</button>
      <button type="button" class="button on" data-role="grid" title="Show the grid (H)">#</button>
    </div>
    <div class="viewport-stage" tabindex="0" data-role="stage">
      <canvas class="field" data-role="field"></canvas>
      <canvas class="overlay" data-role="overlay"></canvas>
      <div class="viewport-legend" data-role="legend"></div>
      <div class="viewport-legend-labels"><span data-role="hi"></span><span>0</span><span data-role="lo"></span></div>
      <div class="viewport-status"><span data-role="coords"></span><span class="hint" data-role="hint"></span></div>
      <div class="viewport-grid">
        <button type="button" class="button small on" data-role="snap" title="Snap drawn points to the grid">snap</button>
        <label title="Grid step, in scene units: drawn in the viewport, used for snapping, saved with the scene (view grid=)">grid <input type="text" data-role="snap-step"> <span data-role="unit"></span></label>
      </div>
    </div>`;
  const stage = element.querySelector('[data-role="stage"]');
  const fieldCanvas = element.querySelector('[data-role="field"]');
  const overlay = element.querySelector('[data-role="overlay"]');
  const coords = element.querySelector('[data-role="coords"]');
  const hint = element.querySelector('[data-role="hint"]');
  const legend = element.querySelector('[data-role="legend"]');
  const hiLabel = element.querySelector('[data-role="hi"]'), loLabel = element.querySelector('[data-role="lo"]');
  const ctx = overlay.getContext("2d");
  const camera = new Camera();
  let renderer = null;
  try { renderer = new FieldRenderer(fieldCanvas); } catch (e) { state.output.error("No WebGL2", e.message); }
  let showGrid = true;
  let range = 1e-12;          // the colour range is ±range
  let frame = null;           // the last field frame { data, min, max, time }
  let tool = null;            // the active drawing tool (M3)
  let pending = false;
  let mirrors = [];           // mirror images implied by symmetry lines and the axis

  const view = { camera, redraw, stage, snapStep: 0, tools: null, toolName: "select" };
  state.viewport = view;
  view.tools = makeTools(state, view);
  view.setTool = (name) => {
    tool?.key?.({ key: "Escape" });
    tool = view.tools[name] || view.tools.select;
    view.toolName = tool.name;
    hint.textContent = tool.hint || "";
    for (const b of element.querySelectorAll("[data-tool]")) b.classList.toggle("on", b.dataset.tool === tool.name);
    stage.style.cursor = tool.name === "select" ? "default" : "crosshair";
    redraw();
  };
  for (const b of element.querySelectorAll("[data-tool]")) b.addEventListener("click", () => view.setTool(b.dataset.tool));

  // The grid: one step for drawing and snapping, part of the scene (view grid= snap=).
  const snapBtn = element.querySelector('[data-role="snap"]'), snapStep = element.querySelector('[data-role="snap-step"]'), unitLabel = element.querySelector('[data-role="unit"]');
  function loadSnap() {
    const sc = state.scene;
    if (!sc) return;
    view.snapStep = sc.view.snap !== false ? sc.gridStep() : 0;
    snapBtn.classList.toggle("on", sc.view.snap !== false);
    if (document.activeElement !== snapStep) snapStep.value = String(sc.gridStep());
    unitLabel.textContent = sc.units;
  }
  snapBtn.addEventListener("click", () => state.modify((sc) => { sc.view.snap = sc.view.snap === false; }, { origin: "viewport", level: "view" }));
  snapStep.addEventListener("change", () => {
    const v = parseFloat(snapStep.value);
    if (v > 0) state.modify((sc) => { sc.view.grid = v; }, { origin: "viewport", level: "view" });
    else loadSnap();
  });
  loadSnap();

  function resize() {
    const r = stage.getBoundingClientRect();
    camera.resize(r.width, r.height);
    const dpr = window.devicePixelRatio || 1;
    overlay.width = Math.round(r.width * dpr); overlay.height = Math.round(r.height * dpr);
    redraw();
  }

  // Auto gain: the colour range follows the field's 99th percentile of |p|
  // (a spike at a source must not darken everything else), rising at once
  // and falling by 5 % per frame when the field weakens.
  function currentRange() {
    const g = state.scene?.view.gain;
    if (g !== "auto" && g > 0) return g;
    if (frame) {
      const level = frame.robust > 0 ? frame.robust : Math.max(Math.abs(frame.min), Math.abs(frame.max));
      range = Math.max(level, range * 0.95, 1e-12);
    }
    return range;
  }

  function redraw() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      pending = false;
      const r = currentRange();
      if (renderer) renderer.draw(camera, [-r, r], { mirrors });
      drawCad(ctx, camera, state.scene, { selection: state.selection, rubber: tool?.rubber?.(), hover: tool?.hover, showGrid, dpr: window.devicePixelRatio || 1, mirrors, gridStep: state.scene?.gridStep() || 0 });
      tool?.draw?.(ctx, camera);
      // Where the next click lands, with a drawing tool.
      if (cursor && tool && tool.name !== "select") {
        const [sx, sy] = camera.toScreen(cursor[0], cursor[1]);
        ctx.strokeStyle = "#4fa3ff"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(sx - 8, sy); ctx.lineTo(sx + 8, sy); ctx.moveTo(sx, sy - 8); ctx.lineTo(sx, sy + 8); ctx.stroke();
        ctx.strokeRect(sx - 3.5, sy - 3.5, 7, 7);
      }
      hiLabel.textContent = "+" + fmt(parseFloat(r.toPrecision(3)));
      loLabel.textContent = "−" + fmt(parseFloat(r.toPrecision(3)));
    });
  }

  function fit() {
    let b = state.scene?.bbox();
    if (b && mirrors.length) {
      const corners = [[b[0], b[1]], [b[2], b[1]], [b[2], b[3]], [b[0], b[3]]];
      for (const m of mirrors) for (const c of corners) { const [x, y] = [m[0] * c[0] + m[2] * c[1] + m[4], m[1] * c[0] + m[3] * c[1] + m[5]]; b = [Math.min(b[0], x), Math.min(b[1], y), Math.max(b[2], x), Math.max(b[3], y)]; }
    }
    camera.fit(b); redraw();
  }
  // On load the whole scene is framed: a saved view rarely matches this panel's size.
  function applySceneView() { fit(); }

  // --- Pointer: tools first, else pan.
  let drag = null;
  stage.addEventListener("pointerdown", (e) => {
    stage.focus();
    const p = scenePoint(e);
    if (tool && e.button === 0 && !e.altKey && tool.down?.(p, e) !== false) { stage.setPointerCapture(e.pointerId); drag = { tool: true }; return; }
    if (e.button === 0 || e.button === 1) { drag = { x: e.clientX, y: e.clientY }; stage.setPointerCapture(e.pointerId); }
  });
  let cursor = null;   // the snapped cursor, drawn as a crosshair with a drawing tool
  stage.addEventListener("pointermove", (e) => {
    const p = scenePoint(e);
    const q = view.tools.snapPoint(p);
    cursor = q;
    const u = state.scene?.units || "";
    coords.textContent = `x ${fmt(parseFloat(q[0].toPrecision(6)))}  y ${fmt(parseFloat(q[1].toPrecision(6)))} ${u}` + (view.snapStep > 0 ? `  · snap ${fmt(view.snapStep)} ${u}` : "  · no snap");
    if (tool && tool.name !== "select") redraw();
    if (drag?.tool) { tool?.move?.(p, e); redraw(); return; }
    if (drag) { camera.pan(e.clientX - drag.x, e.clientY - drag.y); drag.x = e.clientX; drag.y = e.clientY; redraw(); return; }
    if (tool?.hoverMove?.(p, e)) redraw();
  });
  stage.addEventListener("pointerleave", () => { cursor = null; redraw(); });
  stage.addEventListener("pointerup", (e) => {
    if (drag?.tool) tool?.up?.(scenePoint(e), e);
    drag = null; redraw();
  });
  stage.addEventListener("dblclick", (e) => { tool?.double?.(scenePoint(e), e); redraw(); });
  stage.addEventListener("wheel", (e) => { e.preventDefault(); const r = stage.getBoundingClientRect(); camera.zoomAt(e.clientX - r.left, e.clientY - r.top, Math.exp(-e.deltaY * 0.0015)); redraw(); }, { passive: false });
  stage.addEventListener("contextmenu", (e) => e.preventDefault());
  stage.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey) return;
    if (tool?.key?.(e)) { e.preventDefault(); redraw(); return; }
    const k = e.key.toLowerCase();
    const toolKey = TOOL_BUTTONS.find(([key]) => key === k);
    if (toolKey) view.setTool(toolKey[1]);
    else if (k === "f") fit();
    else if (k === "k") toggleLock();
    else if (k === "w" && renderer) { renderer.wireframe = !renderer.wireframe; wireBtn.classList.toggle("on", renderer.wireframe); redraw(); }
    else if (k === "h") { showGrid = !showGrid; gridBtn.classList.toggle("on", showGrid); redraw(); }
    else return;
    e.preventDefault();
  });
  function scenePoint(e) { const r = stage.getBoundingClientRect(); return camera.toScene(e.clientX - r.left, e.clientY - r.top); }

  const wireBtn = element.querySelector('[data-role="wire"]'), gridBtn = element.querySelector('[data-role="grid"]'), lockBtn = element.querySelector('[data-role="lock"]');
  // Auto gain rescales every frame, so a louder source looks the same: the
  // lock freezes the scale at the current range (it is saved in the scene's view line).
  function toggleLock() {
    const g = state.scene?.view.gain;
    const value = g === "auto" ? parseFloat(currentRange().toPrecision(3)) : "auto";
    state.modify((sc) => { sc.view.gain = value; }, { origin: "viewport", level: "view" });
  }
  function drawLock() { lockBtn.classList.toggle("on", state.scene?.view.gain !== "auto"); lockBtn.title = state.scene?.view.gain === "auto" ? "Lock the colour scale at its current range, to compare amplitudes between runs (K)" : `Colour scale locked at ±${state.scene.view.gain}: click to follow the peak again (K)`; }
  lockBtn.addEventListener("click", toggleLock);
  element.querySelector('[data-role="fit"]').addEventListener("click", fit);
  wireBtn.addEventListener("click", () => { if (renderer) { renderer.wireframe = !renderer.wireframe; wireBtn.classList.toggle("on", renderer.wireframe); redraw(); } });
  gridBtn.addEventListener("click", () => { showGrid = !showGrid; gridBtn.classList.toggle("on", showGrid); redraw(); });

  // --- The simulation.
  const sim = state.sim;
  const offs = [
    // The engine works in metres; the drawing is in the scene's unit.
    sim.on("mesh", (m) => {
      const k = state.scene?.unitScale() || 1;
      const xy = k === 1 ? m.xy : m.xy.map((v) => v / k);
      renderer?.setMesh(xy, m.tri);
      frame = null; range = 1e-12; redraw();
    }),
    sim.on("field", (f) => { frame = f; renderer?.setField(f.data); redraw(); }),
    state.on("scene", ({ origin, level }) => {
      mirrors = state.scene ? mirrorTransforms(state.scene) : [];
      loadSnap();
      if (origin === "load") applySceneView();
      if (level !== "view" && renderer && state.stale.mesh) { renderer.clearMesh(); frame = null; }
      legend.style.background = cssGradient(state.scene?.view.colormap);
      renderer?.setColormap(state.scene?.view.colormap);
      drawLock();
      redraw();
    }),
    state.on("selection", redraw),
    state.on("sim", redraw),
    state.on("frame", (n) => { if (n.type === "wall") { const e = state.scene.element(n.key); if (e) { const s = new (state.scene.constructor)(); s.elements = [e]; camera.fit(s.bbox(), 0.2); redraw(); } } }),
    state.on("reset-field", () => { frame = null; range = 1e-12; if (renderer) renderer.hasField = false; redraw(); }),
  ];
  const ro = new ResizeObserver(resize);
  ro.observe(stage);
  legend.style.background = cssGradient(state.scene?.view.colormap);
  mirrors = state.scene ? mirrorTransforms(state.scene) : [];
  drawLock();
  resize();
  applySceneView();
  view.setTool("select");
  return { dispose: () => { offs.forEach((f) => f()); ro.disconnect(); state.viewport = null; } };
}
