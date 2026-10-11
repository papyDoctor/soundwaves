import { test } from "node:test";
import assert from "node:assert/strict";
import { sphericalBessel, legendre, farFieldAxisym } from "../src/scene/farfield.js";

test("spherical Bessel functions match the closed forms", () => {
  const { j, y } = sphericalBessel(5, 2.5);
  const x = 2.5;
  assert.ok(Math.abs(j[0] - Math.sin(x) / x) < 1e-12);
  assert.ok(Math.abs(j[1] - (Math.sin(x) / (x * x) - Math.cos(x) / x)) < 1e-12);
  assert.ok(Math.abs(y[0] + Math.cos(x) / x) < 1e-12);
  // Wronskian j_l y_{l-1} - j_{l-1} y_l = 1/x^2.
  for (let l = 1; l <= 5; l++) assert.ok(Math.abs(j[l] * y[l - 1] - j[l - 1] * y[l] - 1 / (x * x)) < 1e-10, `l=${l}`);
  assert.ok(Math.abs(legendre(3, 0.5)[3] - (2.5 * 0.125 - 1.5 * 0.5)) < 1e-12);
});

// A monopole off the centre has a spherical wave e^(-ikR)/R around it: on a
// ring centred elsewhere the pressure varies with the angle, but its far
// field is omnidirectional. The extrapolation must flatten it.
test("an off-centre monopole extrapolates to a flat far field", () => {
  const c = 343, f = 2000, k = 2 * Math.PI * f / c, r0 = 1.1, d = 0.3;
  const n = 181, angles = [], re = [], im = [];
  for (let s = 0; s < n; s++) {
    const a = 180 * s / (n - 1); angles.push(a);
    const th = (a * Math.PI) / 180;
    const R = Math.hypot(r0 * Math.cos(th) - d, r0 * Math.sin(th));
    re.push(Math.cos(-k * R) / R); im.push(Math.sin(-k * R) / R);
  }
  const near = re.map((v, i) => Math.hypot(v, im[i]));
  const nearSpread = Math.max(...near) / Math.min(...near);
  assert.ok(nearSpread > 1.5, `the ring itself must not be flat: ${nearSpread}`);
  const { magnitude } = farFieldAxisym(angles, re, im, r0, k);
  const spread = Math.max(...magnitude) / Math.min(...magnitude);
  assert.ok(spread < 1.02, `far field spread ${spread}`);
});

// Two opposite monopoles on the axis, 2d apart: |F| ∝ |sin(k d cos θ)|.
test("an axial dipole extrapolates to the sin(kd cos θ) pattern", () => {
  const c = 343, f = 1500, k = 2 * Math.PI * f / c, r0 = 1.0, d = 0.1;
  const n = 181, angles = [], re = [], im = [];
  for (let s = 0; s < n; s++) {
    const a = 180 * s / (n - 1); angles.push(a);
    const th = (a * Math.PI) / 180;
    let pr = 0, pi = 0;
    for (const [sign, x] of [[1, d], [-1, -d]]) {
      const R = Math.hypot(r0 * Math.cos(th) - x, r0 * Math.sin(th));
      pr += sign * Math.cos(-k * R) / R; pi += sign * Math.sin(-k * R) / R;
    }
    re.push(pr); im.push(pi);
  }
  const { magnitude } = farFieldAxisym(angles, re, im, r0, k);
  const m = Math.max(...magnitude);
  const expected = angles.map((a) => Math.abs(Math.sin(k * d * Math.cos((a * Math.PI) / 180))));
  const emax = Math.max(...expected);
  for (let s = 0; s < n; s += 10) {
    assert.ok(Math.abs(magnitude[s] / m - expected[s] / emax) < 0.02, `at ${angles[s]}°: ${magnitude[s] / m} vs ${expected[s] / emax}`);
  }
});
