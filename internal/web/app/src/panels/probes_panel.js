/*
 * The Probes panel. Two views of the same samples:
 *   Signals — pressure against time at every point probe, as lines.
 *   Pattern — for a probe ring, the peak (or RMS) pressure against the angle
 *             on a polar plot: the radiation diagram.
 * The samples arrive from the worker in batches (one value per probe per
 * step, point probes first, then the rings') and accumulate until Reset.
 */
const COLORS = ["#4fd0e0", "#f0a040", "#c792ea", "#3ec281", "#e5534b", "#e2b93d", "#82aaff", "#ff9cac"];

export class ProbeStore {
  constructor() { this.clear(); }
  clear() { this.series = []; this.dt = 0; this.count = 0; this.length = 0; }
  /** Append a batch: `data` holds `count` values per step, interleaved. */
  append(data, count, dt) {
    this.dt = dt;
    if (this.count !== count) { this.count = count; this.series = Array.from({ length: count }, () => []); this.length = 0; }
    const steps = count ? data.length / count : 0;
    for (let s = 0; s < steps; s++) for (let p = 0; p < count; p++) this.series[p].push(data[s * count + p]);
    this.length += steps;
  }
  peak(i) { let m = 0; for (const v of this.series[i] || []) m = Math.max(m, Math.abs(v)); return m; }
  /** RMS over the last `window` samples: the steady state, not the silence before the wave arrived. */
  rms(i, window = Infinity) {
    const s = this.series[i] || [];
    const n = Math.min(s.length, Math.max(1, Math.round(window)));
    if (!n) return 0;
    let q = 0;
    for (let k = s.length - n; k < s.length; k++) q += s[k] * s[k];
    return Math.sqrt(q / n);
  }
  /** Time integral of p²: the energy a pulse delivered, in Pa²·s. */
  energy(i) { let q = 0; for (const v of this.series[i] || []) q += v * v; return q * this.dt; }
  csv(ids) {
    const lines = ["t_s," + ids.join(",")];
    for (let i = 0; i < this.length; i++) lines.push([(i + 1) * this.dt, ...this.series.map((s) => s[i])].map((v) => (typeof v === "number" ? v.toPrecision(8) : v)).join(","));
    return lines.join("\n") + "\n";
  }
}

export function mountProbes(element, state) {
  element.classList.add("flush", "bar-panel");
  element.innerHTML = `<div class="panel-bar">
      <button type="button" class="button small on" data-role="signals" title="Pressure against time at the point probes">Signals</button>
      <button type="button" class="button small" data-role="pattern" title="Peak pressure against the angle on a probe ring: the radiation diagram">Pattern</button>
      <span data-role="legend"></span>
      <select data-role="ring" title="Which probe ring" hidden></select>
      <select data-role="measure" title="What is plotted at each angle. peak: largest |p| (pulses). RMS: over the last 5 periods of the source, the steady state of a sine. energy: integral of p² over the run (pulses)" hidden><option value="peak">peak</option><option value="rms">RMS</option><option value="energy">energy</option></select>
      <select data-role="scale" title="Linear, normalized to the maximum, or decibels below it" hidden><option value="lin">linear</option><option value="db">dB</option></select>
      <span class="space"></span>
      <span class="soft mono" data-role="info"></span>
      <button type="button" class="button small" data-role="csv" title="Download every probe's signal as CSV">CSV</button>
    </div><div class="panel-body"><canvas data-role="plot"></canvas></div>`;
  const q = (r) => element.querySelector(`[data-role="${r}"]`);
  const canvas = q("plot"), legend = q("legend"), info = q("info"), ringSel = q("ring"), measureSel = q("measure"), scaleSel = q("scale");
  const ctx = canvas.getContext("2d");
  state.probes ??= new ProbeStore();
  let view = "signals";

  function setView(v) { view = v; q("signals").classList.toggle("on", v === "signals"); q("pattern").classList.toggle("on", v === "pattern"); for (const s of [ringSel, measureSel, scaleSel]) s.hidden = v !== "pattern"; draw(); }
  q("signals").addEventListener("click", () => setView("signals"));
  q("pattern").addEventListener("click", () => setView("pattern"));
  for (const s of [ringSel, measureSel, scaleSel]) s.addEventListener("change", draw);

  function frame() {
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.clientWidth, H = canvas.clientHeight;
    if (!W || !H) return null;
    // Both sizes: a taller panel with the same width would otherwise stretch the drawing.
    if (canvas.width !== Math.round(W * dpr) || canvas.height !== Math.round(H * dpr)) { canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr); }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = "#1b1d22"; ctx.fillRect(0, 0, W, H);
    return [W, H];
  }
  const say = (txt) => { ctx.fillStyle = "#9aa0ab"; ctx.font = "12px system-ui"; ctx.fillText(txt, 12, 20); info.textContent = ""; };

  function drawSignals() {
    const store = state.probes, scene = state.scene;
    const f = frame(); if (!f) return;
    const [W, H] = f;
    const ids = scene?.probes.map((p) => p.id) || [];
    if (legend.dataset.ids !== ids.join("\n")) {
      legend.replaceChildren(...ids.map((id, i) => { const s = document.createElement("span"); s.textContent = "— " + id; s.style.color = COLORS[i % COLORS.length]; s.style.marginRight = "0.8rem"; return s; }));
      legend.dataset.ids = ids.join("\n");
    }
    if (!ids.length) return say(scene?.rings?.length ? "Only probe rings here: see Pattern." : "No probe in the scene: add `probe p1 x y`.");
    if (!store.length) return say("No samples yet: run the simulation.");
    let lo = Infinity, hi = -Infinity;
    for (let k = 0; k < ids.length; k++) for (const v of store.series[k] || []) { if (v < lo) lo = v; if (v > hi) hi = v; }
    if (!(hi > lo)) hi = lo + 1;
    const pad = (hi - lo) * 0.05; lo -= pad; hi += pad;
    const L = 48, R = 8, T = 8, B = 20, tmax = store.length * store.dt;
    const X = (i) => L + (W - L - R) * (i / Math.max(store.length - 1, 1));
    const Y = (v) => T + (H - T - B) * (1 - (v - lo) / (hi - lo));
    ctx.strokeStyle = "#383c45"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(L, T); ctx.lineTo(L, H - B); ctx.lineTo(W - R, H - B); ctx.stroke();
    if (lo < 0 && hi > 0) { ctx.strokeStyle = "#2c3038"; ctx.beginPath(); ctx.moveTo(L, Y(0)); ctx.lineTo(W - R, Y(0)); ctx.stroke(); }
    ctx.fillStyle = "#9aa0ab"; ctx.font = "10px ui-monospace, monospace";
    ctx.fillText(hi.toPrecision(3), 2, T + 9); ctx.fillText(lo.toPrecision(3), 2, H - B - 2);
    ctx.fillText("0", L, H - 6); ctx.fillText(`${(tmax * 1000).toFixed(2)} ms`, W - R - 60, H - 6);
    const stride = Math.max(1, Math.floor(store.length / ((W - L - R) * 2)));
    ids.forEach((_, k) => {
      const s = store.series[k] || [];
      ctx.strokeStyle = COLORS[k % COLORS.length]; ctx.lineWidth = 1.2; ctx.beginPath();
      for (let i = 0; i < s.length; i += stride) { const x = X(i), y = Y(s[i]); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
      ctx.stroke();
    });
    info.textContent = `${store.length} samples · dt ${(store.dt * 1e6).toFixed(2)} µs`;
  }

  function drawPattern() {
    const store = state.probes, scene = state.scene;
    const f = frame(); if (!f) return;
    const [W, H] = f;
    const rings = scene?.rings || [];
    // Rebuild the ring list only when it changed: this runs every frame, and
    // a select rebuilt under the cursor cannot be used.
    const ids = rings.map((g) => g.id).join("\n");
    if (ringSel.dataset.ids !== ids) {
      const keep = ringSel.value;
      ringSel.replaceChildren(...rings.map((g) => { const o = document.createElement("option"); o.value = g.id; o.textContent = g.id; return o; }));
      if (rings.some((g) => g.id === keep)) ringSel.value = keep;
      ringSel.dataset.ids = ids;
    }
    if (legend.dataset.ids !== "") { legend.replaceChildren(); legend.dataset.ids = ""; }
    if (!rings.length) return say("No probe ring: draw one with the ring tool (O), or add `ring name cx cy r n=36`.");
    const g = scene.ring(ringSel.value) || rings[0];
    const layout = scene.probeLayout();
    const pts = layout.map((p, i) => ({ ...p, i })).filter((p) => p.ring === g.id);
    if (!store.length || store.count !== layout.length) return say("No samples yet: run the simulation (Mesh again after changing the ring).");
    const measure = measureSel.value, db = scaleSel.value === "db";
    // The RMS window: 5 periods of the lowest source frequency.
    const f0s = [...scene.sources.map((s) => s.signal.f0), ...scene.materials.filter((m) => m.kind === "piston" && m.signal).map((m) => m.signal.f0)].filter((f) => f > 0);
    const window = f0s.length && store.dt > 0 ? (5 / Math.min(...f0s)) / store.dt : Infinity;
    const values = pts.map((p) => (measure === "rms" ? store.rms(p.i, window) : measure === "energy" ? store.energy(p.i) : store.peak(p.i)));
    const vmax = Math.max(...values, 1e-30);
    const FLOOR = -40;
    // Energy is a squared quantity: 10 log, not 20.
    const dbOf = (v) => (measure === "energy" ? 10 : 20) * Math.log10(Math.max(v, 1e-30) / vmax);
    const radial = (v) => (db ? Math.max(0, 1 + dbOf(v) / -FLOOR) : v / vmax);
    // Polar axes: a half plot in axisymmetric mode (nothing below the axis).
    const half = scene.mode === "axisym" && pts.every((p) => p.y >= g.cy - 1e-12);
    const cx = W / 2, cy = half ? H - 24 : H / 2, R = Math.min(W / 2 - 40, (half ? H - 44 : H / 2 - 20));
    if (R < 20) return;
    ctx.strokeStyle = "#383c45"; ctx.lineWidth = 1; ctx.fillStyle = "#9aa0ab"; ctx.font = "10px ui-monospace, monospace";
    for (let k = 1; k <= 4; k++) {
      ctx.beginPath(); ctx.arc(cx, cy, R * k / 4, half ? Math.PI : 0, half ? 2 * Math.PI : 2 * Math.PI); ctx.stroke();
      ctx.fillText(db ? `${FLOOR * (1 - k / 4)} dB` : (k / 4).toFixed(2), cx + R * k / 4 + 2, cy - 3);
    }
    for (let a = 0; a < 360; a += 30) {
      if (half && a > 180) continue;
      const t = (a * Math.PI) / 180;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + R * Math.cos(t), cy - R * Math.sin(t)); ctx.stroke();
      ctx.fillText(`${a}°`, cx + (R + 14) * Math.cos(t) - 8, cy - (R + 14) * Math.sin(t) + 4);
    }
    // The pattern.
    ctx.strokeStyle = COLORS[0]; ctx.lineWidth = 2; ctx.beginPath();
    const full = Math.abs(g.a1 - g.a0) >= 360 - 1e-9;
    pts.forEach((p, k) => {
      const t = (p.angle * Math.PI) / 180, r = radial(values[k]) * R;
      const x = cx + r * Math.cos(t), y = cy - r * Math.sin(t);
      k ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    });
    if (full) ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = COLORS[0];
    pts.forEach((p, k) => { const t = (p.angle * Math.PI) / 180, r = radial(values[k]) * R; ctx.fillRect(cx + r * Math.cos(t) - 2, cy - r * Math.sin(t) - 2, 4, 4); });
    const best = values.indexOf(vmax);
    const unit = measure === "energy" ? "Pa²·s" : "Pa";
    const how = measure === "rms" && Number.isFinite(window) ? ` (last ${(window * store.dt * 1000).toFixed(1)} ms)` : "";
    info.textContent = `${g.id}: ${measure}${how} max ${vmax.toPrecision(3)} ${unit} at ${pts[best]?.angle.toFixed(0)}° · ${pts.length} probes · r ${g.r} ${scene.units}`;
  }

  function draw() { if (view === "pattern") drawPattern(); else drawSignals(); }

  q("csv").addEventListener("click", () => {
    const ids = state.scene?.probeIds() || [];
    const blob = new Blob([state.probes.csv(ids)], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = (state.sceneName || "scene").replace(/\.sw$/, "") + "-probes.csv"; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });
  const ro = new ResizeObserver(draw);
  ro.observe(canvas);
  const offs = [state.on("probes", draw), state.on("scene", draw)];
  draw();
  return { dispose: () => { offs.forEach((f) => f()); ro.disconnect(); } };
}
