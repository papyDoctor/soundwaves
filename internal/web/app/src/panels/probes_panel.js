/*
 * The Probes panel. Two views of the same samples:
 *   Signals — pressure against time at every point probe, as lines.
 *   Pattern — for a probe ring, the peak (or RMS) pressure against the angle
 *             on a polar plot: the radiation diagram.
 * The samples arrive from the worker in batches (one value per probe per
 * step, point probes first, then the rings') and accumulate until Reset.
 */
import { lut } from "../sim/colormap.js";
import { spectrum as sourceSpectrum } from "../scene/signals.js";
import { farFieldAxisym } from "../scene/farfield.js";

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
  /** X(f) of a series as [re, im], by direct summation over the whole recording. */
  spectrumComplex(i, f) {
    const s = this.series[i] || [];
    const w = 2 * Math.PI * f * this.dt;
    let re = 0, im = 0;
    for (let n = 0; n < s.length; n++) { re += s[n] * Math.cos(w * n); im -= s[n] * Math.sin(w * n); }
    return [re * this.dt, im * this.dt];
  }
  spectrum(i, f) { const [re, im] = this.spectrumComplex(i, f); return Math.hypot(re, im); }
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
      <button type="button" class="button small" data-role="pattern" title="Pressure against the angle on a probe ring: the radiation diagram">Pattern</button>
      <button type="button" class="button small" data-role="map" title="The radiation diagram at every frequency at once: angle across, frequency up, from the spectrum of one broadband pulse">Map</button>
      <span data-role="legend"></span>
      <select data-role="ring" title="Which probe ring" hidden></select>
      <select data-role="measure" title="What is plotted at each angle. peak: largest |p| (pulses). RMS: over the last 5 periods of the source, the steady state of a sine. energy: integral of p² over the run (pulses). spectrum: |P| at the frequency below, from the Fourier transform of the recording (use a broadband pulse)" hidden><option value="peak">peak</option><option value="rms">RMS</option><option value="energy">energy</option><option value="spectrum">spectrum at</option></select>
      <label data-role="freq-row" hidden title="The frequency of the spectrum pattern, Hz"><input type="number" data-role="freq" value="1000" min="1" step="50" style="width:5rem"> Hz</label>
      <label data-role="band-row" hidden title="The frequency band of the map, Hz: keep it under fmax / 2.5 and inside the source's spectrum"><input type="number" data-role="fmin" value="500" min="1" step="50" style="width:4.5rem"> – <input type="number" data-role="fmax" value="3500" min="1" step="50" style="width:4.5rem"> Hz</label>
      <select data-role="layout" hidden title="polar: angle around, frequency as the radius (low in the centre). flat: angle across, frequency up"><option value="polar">polar</option><option value="flat">flat</option></select>
      <label data-role="far-row" hidden title="Extrapolate the ring's spectra to infinity (axisymmetric scenes, a half ring around everything, in open air): the true far-field pattern even when the ring is close. Needs about two probes per harmonic: n ≥ 2 (k r + 12)"><input type="checkbox" data-role="far"> far field</label>
      <select data-role="scale" title="Linear, normalized to the maximum, or decibels below it" hidden><option value="lin">linear</option><option value="db">dB</option></select>
      <span class="space"></span>
      <span class="soft mono" data-role="info"></span>
      <button type="button" class="button small" data-role="csv" title="Download every probe's signal as CSV">CSV</button>
    </div><div class="panel-body"><canvas data-role="plot"></canvas></div>`;
  const q = (r) => element.querySelector(`[data-role="${r}"]`);
  const canvas = q("plot"), legend = q("legend"), info = q("info"), ringSel = q("ring"), measureSel = q("measure"), scaleSel = q("scale");
  const freqRow = q("freq-row"), freqIn = q("freq"), bandRow = q("band-row"), fminIn = q("fmin"), fmaxIn = q("fmax"), layoutSel = q("layout");
  const farRow = q("far-row"), farIn = q("far");
  const ctx = canvas.getContext("2d");
  state.probes ??= new ProbeStore();
  let view = "signals";

  function setView(v) {
    view = v;
    for (const name of ["signals", "pattern", "map"]) q(name).classList.toggle("on", v === name);
    ringSel.hidden = v === "signals";
    measureSel.hidden = scaleSel.hidden = v !== "pattern";
    freqRow.hidden = !(v === "pattern" && measureSel.value === "spectrum");
    bandRow.hidden = layoutSel.hidden = v !== "map";
    farRow.hidden = !(v === "map" || (v === "pattern" && measureSel.value === "spectrum")) || state.scene?.mode !== "axisym";
    draw();
  }
  q("signals").addEventListener("click", () => setView("signals"));
  q("pattern").addEventListener("click", () => setView("pattern"));
  q("map").addEventListener("click", () => setView("map"));
  for (const s of [ringSel, scaleSel, freqIn, fminIn, fmaxIn, layoutSel, farIn]) s.addEventListener("change", draw);
  measureSel.addEventListener("change", () => { freqRow.hidden = measureSel.value !== "spectrum"; farRow.hidden = measureSel.value !== "spectrum" || state.scene?.mode !== "axisym"; draw(); });

  /** |P| at each probe of the ring at frequency f: measured on the ring, or extrapolated to infinity. */
  function ringSpectrum(scene, g, pts, f) {
    const store = state.probes;
    if (!farIn.checked || scene.mode !== "axisym") return pts.map((p) => store.spectrum(p.i, f));
    const re = [], im = [];
    for (const p of pts) { const [r, i] = store.spectrumComplex(p.i, f); re.push(r); im.push(i); }
    const c = scene.media[0]?.c || 343, k = 2 * Math.PI * f / c, r0 = g.r * scene.unitScale();
    return farFieldAxisym(pts.map((p) => p.angle), re, im, r0, k).magnitude;
  }

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
    syncRingSelect(rings);
    if (legend.dataset.ids !== "") { legend.replaceChildren(); legend.dataset.ids = ""; }
    if (!rings.length) return say("No probe ring: draw one with the ring tool (O), or add `ring name cx cy r n=36`.");
    const { g, layout, pts } = ringProbes(scene);
    if (!store.length || store.count !== layout.length) return say("No samples yet: run the simulation (Mesh again after changing the ring).");
    const measure = measureSel.value, db = scaleSel.value === "db";
    // The RMS window: 5 periods of the lowest source frequency.
    const f0s = [...scene.sources.map((s) => s.signal.f0), ...scene.materials.filter((m) => m.kind === "piston" && m.signal).map((m) => m.signal.f0)].filter((f) => f > 0);
    const window = f0s.length && store.dt > 0 ? (5 / Math.min(...f0s)) / store.dt : Infinity;
    const freq = Math.max(1, parseFloat(freqIn.value) || 1000);
    const values = measure === "spectrum" ? ringSpectrum(scene, g, pts, freq) : pts.map((p) => (measure === "rms" ? store.rms(p.i, window) : measure === "energy" ? store.energy(p.i) : store.peak(p.i)));
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
    const axisymHalf = scene.mode === "axisym" && pts.every((p) => p.y >= g.cy - 1e-12);
    const diValues = measure === "energy" ? values.map(Math.sqrt) : values;
    const diDb = directivityIndex(pts, diValues, axisymHalf);
    const unit = measure === "energy" ? "Pa²·s" : measure === "spectrum" ? "Pa·s" : "Pa";
    const how = measure === "rms" && Number.isFinite(window) ? ` (last ${(window * store.dt * 1000).toFixed(1)} ms)` : measure === "spectrum" ? ` ${freq} Hz${farIn.checked && scene.mode === "axisym" ? ", far field" : ""}` : "";
    info.textContent = `${g.id}: ${measure}${how} max ${vmax.toPrecision(3)} ${unit} at ${pts[best]?.angle.toFixed(0)}° · DI ${diDb.toFixed(1)} dB${axisymHalf ? "" : " (2D)"} · ${pts.length} probes · r ${g.r} ${scene.units}`;
  }

  // Rebuild the ring list only when it changed: this runs every frame, and a
  // select rebuilt under the cursor cannot be used.
  function syncRingSelect(rings) {
    const ids = rings.map((g) => g.id).join("\n");
    if (ringSel.dataset.ids === ids) return;
    const keep = ringSel.value;
    ringSel.replaceChildren(...rings.map((g) => { const o = document.createElement("option"); o.value = g.id; o.textContent = g.id; return o; }));
    if (rings.some((g) => g.id === keep)) ringSel.value = keep;
    ringSel.dataset.ids = ids;
  }

  /**
   * Directivity index of a pattern: 10 log of the ratio between an
   * omnidirectional source and this one for the same on-axis level, i.e. the
   * gain against a diffuse (ambient) field. `values` are amplitudes at the
   * ring's probes (sorted by angle). Axisymmetric half rings integrate over
   * the sphere (weight sin θ); planar rings over the circle, a 2D index.
   */
  function directivityIndex(pts, values, axisym) {
    const m = Math.max(...values, 1e-30);
    const d2 = values.map((v) => (v / m) ** 2);
    let num = 0, den = 0;
    const n = pts.length;
    const full = n > 1 && Math.abs((pts[n - 1].angle - pts[0].angle) - 360 * (n - 1) / n) < 1e-6;
    const segs = full ? n : n - 1;
    for (let k = 0; k < segs; k++) {
      const a0 = pts[k].angle * Math.PI / 180, a1 = pts[(k + 1) % n].angle * Math.PI / 180 + (k + 1 === n ? 2 * Math.PI : 0);
      const da = a1 - a0;
      const w = axisym ? (Math.sin(a0) + Math.sin(a1)) / 2 : 1;
      num += w * da; den += w * da * (d2[k] + d2[(k + 1) % n]) / 2;
    }
    return den > 0 ? 10 * Math.log10(num / den) : 0;
  }

  // The ring's probes, sorted by angle, for the chosen ring.
  function ringProbes(scene) {
    const rings = scene?.rings || [];
    const g = scene?.ring(ringSel.value) || rings[0];
    if (!g) return null;
    const layout = scene.probeLayout();
    return { g, layout, pts: layout.map((p, i) => ({ ...p, i })).filter((p) => p.ring === g.id).sort((a, b) => a.angle - b.angle) };
  }

  // Angle across, frequency up, colour: |P(f, angle)| normalized to the
  // loudest angle at that frequency, in dB. One broadband pulse gives it all.
  let mapCache = { key: "", rows: null };
  function drawMap() {
    const store = state.probes, scene = state.scene;
    const f = frame(); if (!f) return;
    const [W, H] = f;
    if (legend.dataset.ids !== "") { legend.replaceChildren(); legend.dataset.ids = ""; }
    syncRingSelect(scene?.rings || []);
    const rp = ringProbes(scene);
    if (!rp) return say("No probe ring: draw one with the ring tool (O), or add `ring name cx cy r n=36`.");
    const { g, layout, pts } = rp;
    if (!store.length || store.count !== layout.length) return say("No samples yet: run the simulation with a broadband pulse (ricker or gauss) first.");
    const fmin = Math.max(1, parseFloat(fminIn.value) || 500), fmax = Math.max(fmin + 1, parseFloat(fmaxIn.value) || 3500);
    const NF = 48, FLOOR = -30;
    const far = farIn.checked && scene.mode === "axisym";
    const key = `${g.id}|${store.length}|${fmin}|${fmax}|${pts.length}|${far}`;
    if (mapCache.key !== key) {
      const rows = [];
      for (let k = 0; k < NF; k++) {
        const fr = fmin + (fmax - fmin) * k / (NF - 1);
        const mags = ringSpectrum(scene, g, pts, fr);
        const m = Math.max(...mags, 1e-30);
        const axisymHalf = scene.mode === "axisym" && pts.every((p) => p.y >= g.cy - 1e-12);
        rows.push({ f: fr, db: mags.map((v) => Math.max(FLOOR, 20 * Math.log10(Math.max(v, 1e-30) / m))), max: m, best: pts[mags.indexOf(m)].angle, di: directivityIndex(pts, mags, axisymHalf) });
      }
      mapCache = { key, rows };
    }
    const rows = mapCache.rows;
    // The source's own level at each frequency: where it is weak, the row is
    // noise, not physics. All sources and pistons together, loudest counts.
    const sources = [...scene.sources.map((s) => s.signal), ...scene.materials.filter((m) => m.kind === "piston" && m.signal).map((m) => m.signal)];
    const srcLevel = rows.map(() => 0);
    for (const sig of sources) { const { rel } = sourceSpectrum(sig, 1, Math.max(fmax, 4 * sig.f0), 300); const top = Math.max(...rel); rows.forEach((r, k) => { const i = Math.min(299, Math.round((r.f - 1) / (Math.max(fmax, 4 * sig.f0) - 1) * 299)); srcLevel[k] = Math.max(srcLevel[k], rel[i] / top); }); }
    const lutData = lut("viridis");
    const colour = (d) => { const t = Math.round(255 * (1 - d / FLOOR)); return `rgb(${lutData[t * 4]},${lutData[t * 4 + 1]},${lutData[t * 4 + 2]})`; };
    const weakRows = srcLevel.filter((v) => v < 0.1).length;
    if (layoutSel.value === "polar") {
      // Angle around, frequency as the radius: fmin in the centre, fmax at the rim.
      const half = scene.mode === "axisym" && pts.every((p) => p.y >= g.cy - 1e-12);
      const cx = W / 2 - 30, cy = half ? H - 24 : H / 2, R0 = Math.min(W / 2 - 110, half ? H - 44 : H / 2 - 26);
      if (R0 < 30) return;
      const full = Math.abs(g.a1 - g.a0) >= 360 - 1e-9;
      const spanDeg = full ? 360 : Math.abs(g.a1 - g.a0);
      const cellDeg = spanDeg / (full ? pts.length : Math.max(1, pts.length - 1));
      const r0 = R0 * 0.12; // a small hole in the middle, so fmin is not a point
      for (let k = 0; k < NF; k++) {
        const ri = r0 + (R0 - r0) * k / NF, ro = r0 + (R0 - r0) * (k + 1) / NF + 0.6;
        rows[k].db.forEach((d, j) => {
          const a0 = ((pts[j].angle - cellDeg / 2) * Math.PI) / 180, a1 = ((pts[j].angle + cellDeg / 2) * Math.PI) / 180;
          ctx.fillStyle = colour(d);
          ctx.beginPath(); ctx.arc(cx, cy, ro, -a1, -a0); ctx.arc(cx, cy, ri, -a0, -a1, true); ctx.closePath(); ctx.fill();
        });
        if (sources.length && srcLevel[k] < 0.1) {
          ctx.fillStyle = "#1b1d22cc"; ctx.beginPath(); ctx.arc(cx, cy, ro, 0, 2 * Math.PI); ctx.arc(cx, cy, ri, 2 * Math.PI, 0, true); ctx.closePath(); ctx.fill();
        }
      }
      // Frequency rings and angle spokes, with labels.
      ctx.strokeStyle = "#ffffff30"; ctx.lineWidth = 1; ctx.fillStyle = "#e4e6ea"; ctx.font = "10px ui-monospace, monospace";
      for (let k = 0; k <= 4; k++) {
        const fr = fmin + (fmax - fmin) * k / 4, rr = r0 + (R0 - r0) * k / 4;
        ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 2 * Math.PI); ctx.stroke();
        ctx.fillText(`${fr.toFixed(0)}`, cx + rr * 0.7071 + 3, cy - rr * 0.7071 - 2);
      }
      for (let a = 0; a < 360; a += 30) {
        if (half && a > 180) continue;
        const t = (a * Math.PI) / 180;
        ctx.beginPath(); ctx.moveTo(cx + r0 * Math.cos(t), cy - r0 * Math.sin(t)); ctx.lineTo(cx + R0 * Math.cos(t), cy - R0 * Math.sin(t)); ctx.stroke();
        ctx.fillStyle = "#9aa0ab"; ctx.fillText(`${a}°`, cx + (R0 + 14) * Math.cos(t) - 8, cy - (R0 + 14) * Math.sin(t) + 4); ctx.fillStyle = "#e4e6ea";
      }
      ctx.fillStyle = "#9aa0ab"; ctx.fillText("Hz on the rings", cx + R0 * 0.7071 + 3, cy - R0 * 0.7071 - 14);
      // The colour bar and the source level, on the right.
      const bx = W - 60, bt = 14, bh = H - 40;
      for (let i = 0; i < 100; i++) { ctx.fillStyle = colour(FLOOR * (1 - i / 99)); ctx.fillRect(bx, bt + bh - (i + 1) * bh / 100, 10, Math.ceil(bh / 100)); }
      ctx.fillStyle = "#9aa0ab"; ctx.fillText("0 dB", bx + 14, bt + 10); ctx.fillText(`${FLOOR} dB`, bx + 14, bt + bh);
      ctx.fillStyle = "#82aaff";
      for (let k = 0; k < NF; k++) { const d = Math.max(-40, 20 * Math.log10(Math.max(srcLevel[k], 1e-9))); ctx.fillRect(bx - 14, bt + bh - (k + 1) * bh / NF, 8 * (1 + d / 40), Math.ceil(bh / NF)); }
      // The directivity index per frequency, 0 to 20 dB, in green.
      ctx.fillStyle = "#3ec281";
      for (let k = 0; k < NF; k++) ctx.fillRect(bx - 40, bt + bh - (k + 1) * bh / NF, 22 * Math.min(1, Math.max(0, rows[k].di / 20)), Math.ceil(bh / NF));
      ctx.fillStyle = "#9aa0ab"; ctx.fillText("source", bx - 24, bt + bh + 12); ctx.fillText("DI 0–20", bx - 44, bt + 10);
      const diAt = (f) => rows.reduce((a, b) => (Math.abs(b.f - f) < Math.abs(a.f - f) ? b : a)).di.toFixed(1);
      info.textContent = `${g.id}: |P| per frequency (radius)${far ? ", far field" : ""}, each ring normalized to its loudest angle · DI ${diAt(fmin)} dB at ${fmin} Hz, ${diAt((fmin + fmax) / 2)} dB at ${((fmin + fmax) / 2).toFixed(0)} Hz, ${diAt(fmax)} dB at ${fmax} Hz` + (weakRows ? ` · ${weakRows} rings greyed: source below −20 dB there` : "");
      return;
    }
    const L = 52, R = 70, T = 10, B = 24;
    const cw = (W - L - R) / pts.length, ch = (H - T - B) / NF;
    for (let k = 0; k < NF; k++) {
      const y = H - B - (k + 1) * ch;
      rows[k].db.forEach((d, j) => {
        ctx.fillStyle = colour(d);
        ctx.fillRect(L + j * cw, y, Math.ceil(cw), Math.ceil(ch));
      });
    }
    // Grey out the rows where the source is more than 20 dB below its peak.
    for (let k = 0; k < NF; k++) {
      if (sources.length && srcLevel[k] < 0.1) { ctx.fillStyle = "#1b1d22cc"; ctx.fillRect(L, H - B - (k + 1) * ch, W - L - R, Math.ceil(ch)); }
    }
    // The source level, as a bar per row, between the map and the colour bar.
    ctx.fillStyle = "#82aaff";
    for (let k = 0; k < NF; k++) { const db = Math.max(-40, 20 * Math.log10(Math.max(srcLevel[k], 1e-9))); ctx.fillRect(W - R + 2, H - B - (k + 1) * ch, 8 * (1 + db / 40), Math.ceil(ch)); }
    ctx.fillStyle = "#9aa0ab"; ctx.font = "10px ui-monospace, monospace";
    for (let k = 0; k < NF; k += Math.max(1, Math.round(NF / 6))) ctx.fillText(`${rows[k].f.toFixed(0)} Hz`, 2, H - B - (k + 0.5) * ch + 3);
    const step = Math.max(1, Math.round(pts.length / 8));
    for (let j = 0; j < pts.length; j += step) ctx.fillText(`${pts[j].angle.toFixed(0)}°`, L + (j + 0.5) * cw - 8, H - 6);
    // The colour bar.
    for (let i = 0; i < 100; i++) { const t = Math.round(255 * i / 99); ctx.fillStyle = `rgb(${lutData[t * 4]},${lutData[t * 4 + 1]},${lutData[t * 4 + 2]})`; ctx.fillRect(W - R + 14, H - B - (i + 1) * (H - T - B) / 100, 10, Math.ceil((H - T - B) / 100)); }
    ctx.fillStyle = "#3ec281";
    for (let k = 0; k < NF; k++) ctx.fillRect(W - R - 26, H - B - (k + 1) * ch, 22 * Math.min(1, Math.max(0, rows[k].di / 20)), Math.ceil(ch));
    ctx.fillStyle = "#9aa0ab"; ctx.fillText("0 dB", W - R + 28, T + 10); ctx.fillText(`${FLOOR} dB`, W - R + 28, H - B); ctx.fillText("DI", W - R - 24, T + 10);
    const weak = srcLevel.filter((v) => v < 0.1).length;
    info.textContent = `${g.id}: |P| per frequency, each row normalized to its loudest angle · ${pts.length} probes · ${NF} frequencies` + (weak ? ` · ${weak} rows greyed: source below −20 dB there (thin blue bar = source level)` : "");
  }

  function draw() { if (view === "pattern") drawPattern(); else if (view === "map") drawMap(); else drawSignals(); }

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
