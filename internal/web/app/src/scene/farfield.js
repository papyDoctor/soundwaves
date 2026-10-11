/*
 * Far-field extrapolation for an axisymmetric scene. Outside a sphere that
 * contains every wall and source, the field is a sum of outgoing spherical
 * waves, p(r, θ) = Σ a_l h_l(kr) P_l(cos θ). The complex pressure on a ring
 * (a half circle of radius r0, 0 to 180 degrees) gives the a_l by projection
 * on the Legendre polynomials; the far-field pattern is then
 * F(θ) = Σ a_l i^(l+1) P_l(cos θ), exactly, whatever the distance of the ring.
 *
 * Conventions: spectra are X(f) = Σ x(t) e^(-iωt) dt, so an outgoing wave
 * carries e^(-ikr) and the outgoing function is h_l^(2) = j_l - i y_l.
 * Pure: no DOM, tested under Node.
 */

/** Spherical Bessel j_l and y_l, l = 0..L, at x > 0. */
export function sphericalBessel(L, x) {
  const y = new Array(L + 1), j = new Array(L + 1);
  // y_l upward: stable.
  y[0] = -Math.cos(x) / x;
  if (L >= 1) y[1] = -Math.cos(x) / (x * x) - Math.sin(x) / x;
  for (let l = 1; l < L; l++) y[l + 1] = ((2 * l + 1) / x) * y[l] - y[l - 1];
  // j_l by Miller's downward recurrence from a high order, then normalized.
  const start = L + 30 + Math.ceil(Math.sqrt(40 * (L + 1)));
  let jp = 0, jc = 1e-300;
  const tmp = new Array(start + 1);
  tmp[start] = jc; tmp[start + 1] = jp;
  for (let l = start; l >= 1; l--) {
    const jm = ((2 * l + 1) / x) * jc - jp;
    jp = jc; jc = jm;
    tmp[l - 1] = jc;
    if (Math.abs(jc) > 1e250) { for (let m = l - 1; m <= start; m++) tmp[m] *= 1e-250; jc *= 1e-250; jp *= 1e-250; }
  }
  const scale = (Math.sin(x) / x) / tmp[0];
  for (let l = 0; l <= L; l++) j[l] = tmp[l] * scale;
  return { j, y };
}

/** Legendre P_0..P_L at x. */
export function legendre(L, x) {
  const P = new Array(L + 1);
  P[0] = 1; if (L >= 1) P[1] = x;
  for (let l = 1; l < L; l++) P[l + 1] = ((2 * l + 1) * x * P[l] - l * P[l - 1]) / (l + 1);
  return P;
}

/**
 * Far-field pattern from complex pressures on an axisymmetric half ring.
 * angles: degrees 0..180 (sorted), re/im: the spectrum at each, r0: ring
 * radius (m), k = 2πf/c. Returns |F| at the same angles, with the number of
 * harmonics used. L is limited by the sampling (two probes per harmonic).
 */
export function farFieldAxisym(angles, re, im, r0, k) {
  const n = angles.length;
  const x = k * r0;
  const L = Math.max(2, Math.min(Math.floor(n / 2) - 1, Math.ceil(x + 12)));
  const { j, y } = sphericalBessel(L, x);
  const th = angles.map((a) => (a * Math.PI) / 180);
  const cos = th.map(Math.cos), sin = th.map(Math.sin);
  const P = cos.map((c) => legendre(L, c));
  // c_l = (2l+1)/2 ∫ p(θ) P_l(cos θ) sin θ dθ, trapezoid over the ring.
  const aRe = new Array(L + 1).fill(0), aIm = new Array(L + 1).fill(0);
  for (let l = 0; l <= L; l++) {
    let cr = 0, ci = 0;
    for (let s = 0; s < n - 1; s++) {
      const d = th[s + 1] - th[s];
      cr += d * (re[s] * P[s][l] * sin[s] + re[s + 1] * P[s + 1][l] * sin[s + 1]) / 2;
      ci += d * (im[s] * P[s][l] * sin[s] + im[s + 1] * P[s + 1][l] * sin[s + 1]) / 2;
    }
    cr *= (2 * l + 1) / 2; ci *= (2 * l + 1) / 2;
    // a_l = c_l / h_l^(2)(x), h = j - i y.
    const hr = j[l], hi = -y[l], den = hr * hr + hi * hi;
    aRe[l] = (cr * hr + ci * hi) / den;
    aIm[l] = (ci * hr - cr * hi) / den;
  }
  // F(θ) = Σ a_l i^(l+1) P_l(cos θ).
  const out = new Array(n);
  for (let s = 0; s < n; s++) {
    let fr = 0, fi = 0;
    for (let l = 0; l <= L; l++) {
      const ph = (l + 1) % 4; // i^(l+1): 1, i, -1, -i for ph = 0..3
      const [pr, pi] = ph === 0 ? [1, 0] : ph === 1 ? [0, 1] : ph === 2 ? [-1, 0] : [0, -1];
      const tr = aRe[l] * pr - aIm[l] * pi, ti = aRe[l] * pi + aIm[l] * pr;
      fr += tr * P[s][l]; fi += ti * P[s][l];
    }
    out[s] = Math.hypot(fr, fi);
  }
  return { magnitude: out, harmonics: L };
}
