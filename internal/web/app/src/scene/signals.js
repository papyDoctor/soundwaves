/*
 * The source signals in JavaScript, for previews: the same formulas as the
 * engine (engine/src/sources.rs), plus their spectrum. Pure.
 */
const PI = Math.PI;

/** A function of time for a signal {type, f0, amp, t0, cycles}. */
export function value(sig) {
  switch (sig.type) {
    case "gauss": { const s = 1 / (PI * sig.f0), t0 = sig.t0 ?? 4 * s; return (t) => sig.amp * Math.exp(-(((t - t0) / s) ** 2)); }
    case "ricker": { const t0 = sig.t0 ?? 1.5 / sig.f0; return (t) => { const a = (PI * sig.f0 * (t - t0)) ** 2; return sig.amp * (1 - 2 * a) * Math.exp(-a); }; }
    case "burst": { const t0 = sig.t0 ?? 0, len = (sig.cycles ?? 3) / sig.f0; return (t) => { const tau = t - t0; return tau < 0 || tau >= len ? 0 : sig.amp * Math.sin(2 * PI * sig.f0 * tau) * 0.5 * (1 - Math.cos(2 * PI * tau / len)); }; }
    default: { const t0 = sig.t0 ?? 0, len = 2 / sig.f0; return (t) => { const tau = t - t0; if (tau < 0) return 0; const r = tau >= len ? 1 : 0.5 * (1 - Math.cos(PI * tau / len)); return sig.amp * Math.sin(2 * PI * sig.f0 * tau) * r; }; }
  }
}

/**
 * |S(f)| of the signal, relative to its maximum over [fmin, fmax], at n
 * frequencies. Pulses have a closed form; the others are summed numerically
 * over `duration` seconds. Returns { f: [], rel: [] } with rel in 0..1.
 */
export function spectrum(sig, fmin, fmax, n = 200, duration = 0.05) {
  const f = Array.from({ length: n }, (_, i) => fmin + (fmax - fmin) * i / (n - 1));
  let mag;
  if (sig.type === "gauss") mag = f.map((x) => Math.exp(-((x / sig.f0) ** 2)));
  else if (sig.type === "ricker") mag = f.map((x) => (x / sig.f0) ** 2 * Math.exp(-((x / sig.f0) ** 2)));
  else {
    const fn = value(sig), dt = 1 / (16 * Math.max(fmax, sig.f0)), N = Math.ceil(duration / dt);
    const s = Array.from({ length: N }, (_, k) => fn(k * dt));
    mag = f.map((x) => { const w = 2 * PI * x * dt; let re = 0, im = 0; for (let k = 0; k < N; k++) { re += s[k] * Math.cos(w * k); im -= s[k] * Math.sin(w * k); } return Math.hypot(re, im); });
  }
  const m = Math.max(...mag, 1e-30);
  return { f, rel: mag.map((v) => v / m) };
}

/** The band where the spectrum stays within `db` of its peak: [flo, fhi]. */
export function band(sig, db = -6) {
  const top = sig.type === "sine" || sig.type === "burst" ? 4 * sig.f0 : 4 * sig.f0;
  const { f, rel } = spectrum(sig, 1, top, 400);
  const thr = Math.pow(10, db / 20);
  const peak = rel.indexOf(Math.max(...rel));
  let lo = peak, hi = peak;
  while (lo > 0 && rel[lo - 1] >= thr) lo--;
  while (hi < rel.length - 1 && rel[hi + 1] >= thr) hi++;
  return [f[lo], f[hi]];
}
