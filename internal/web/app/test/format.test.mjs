import { test } from "node:test";
import assert from "node:assert/strict";
import { parse, serialize } from "../src/scene/format.js";
import { Scene } from "../src/scene/model.js";

const ROOM = `# A small room.
soundwaves 1
units m
mode planar
medium air c=343 rho=1.2
material rigid rigid
material panel absorb alpha=0.6
material door open
material driver piston signal=sine f0=300 amp=0.01
polyline room closed material=rigid   # the walls
    0 0   6 0   6 1 @panel   6 3 @door   6 3.9 @rigid   6 4   0 4
rect pillar 2.5 1.5 0.5 0.5 material=driver
circle column 4.5 3 0.3 material=panel
region air 1 1 medium=air
source s1 point 1 2 signal=gauss f0=800 amp=1
probe p1 5 2
sim fmax=2000 npl=10 duration=0.03 cfl=0.9 angle=28
view center=3,2 scale=120 colormap=rwb gain=auto
`;

test("parses the example room", () => {
  const { scene, errors } = parse(ROOM);
  assert.deepEqual(errors, []);
  assert.equal(scene.mode, "planar");
  assert.equal(scene.media.length, 1);
  assert.equal(scene.materials.length, 4);
  assert.deepEqual(scene.material("driver").signal, { type: "sine", f0: 300, amp: 0.01 });
  const room = scene.element("room");
  assert.equal(room.pts.length, 7);
  assert.equal(room.closed, true);
  assert.deepEqual(room.materials, ["rigid", "rigid", "panel", "door", "rigid", "rigid", "rigid"]);
  assert.equal(room.comment, "the walls");
  assert.equal(scene.element("pillar").kind, "rect");
  assert.equal(scene.element("pillar").material, "driver");
  assert.equal(scene.sim.duration, 0.03);
  assert.deepEqual(scene.view.center, [3, 2]);
  assert.deepEqual(scene.leading, ["A small room."]);
});

test("serialize then parse gives the same text", () => {
  const { scene } = parse(ROOM);
  const text = serialize(scene);
  const again = serialize(parse(text).scene);
  assert.equal(again, text);
  assert.match(text, /6 1 @panel/);
  assert.match(text, /# the walls/);
});

test("reports errors with line numbers and keeps going", () => {
  const { scene, errors } = parse(`soundwaves 1
medium air c=343 rho=1.2
wall x 1 2
rect r 0 0 1 abc
region air 0.5 0.5
probe p 0.2 0.2
`);
  assert.equal(errors.length, 2);
  assert.equal(errors[0].line, 3);
  assert.match(errors[0].message, /unknown statement/);
  assert.equal(errors[1].line, 4);
  assert.equal(scene.probes.length, 1);
});

test("engine JSON resolves names and units", () => {
  const { scene } = parse(ROOM.replace("units m", "units cm"));
  const j = scene.toEngineJson();
  assert.equal(j.elements[0].pts[1][0], 0.06);
  assert.equal(j.elements[1].kind, "polyline");
  assert.equal(j.elements[1].pts.length, 4);
  assert.equal(j.elements[2].kind, "arc");
  assert.equal(j.elements[2].a1, 360);
  assert.equal(j.materials[1].kind, "absorb");
  const R = Math.sqrt(0.4);
  assert.ok(Math.abs(j.materials[1].zeta - (1 + R) / (1 - R)) < 1e-12);
  assert.equal(j.materials[3].kind, "piston");
  assert.equal(j.materials[3].signal.f0, 300);
  assert.equal(j.elements[1].materials[0], 3);
  assert.equal(j.regions[0].medium, 0);
  assert.equal(j.sim.nodes_per_wavelength, 10);
});

test("the old piston source gets a helpful error", () => {
  const { errors } = parse("soundwaves 1\nsource s piston on=wall signal=sine f0=300\n");
  assert.equal(errors.length, 1);
  assert.match(errors[0].message, /piston is a material/);
});

test("blank scene round-trips", () => {
  const s = Scene.blank("axisym");
  const text = serialize(s);
  const { scene, errors } = parse(text);
  assert.deepEqual(errors, []);
  assert.equal(scene.mode, "axisym");
  assert.equal(serialize(scene), text);
});

test("snapshot and restore are independent copies", () => {
  const { scene } = parse(ROOM);
  const snap = scene.snapshot();
  scene.elements[0].pts[0][0] = 99;
  const back = Scene.fromSnapshot(snap);
  assert.equal(back.elements[0].pts[0][0], 0);
  assert.equal(serialize(back), serialize(parse(ROOM).scene));
});

test("symmetry lines and mirror transforms", async () => {
  const { mirrorLines, mirrorTransforms, apply } = await import("../src/scene/geometry.js");
  const { scene } = parse(`soundwaves 1
medium air c=343 rho=1.2
material rigid rigid
material mirror symmetry
polyline hall closed material=rigid
    0 0   6 0   6 8   0 8 @mirror
region air 1 1
`);
  const lines = mirrorLines(scene);
  assert.equal(lines.length, 1);
  assert.deepEqual(lines[0].d.map((v) => Math.abs(v)), [0, 1]);
  const [m] = mirrorTransforms(scene);
  const [x, y] = apply(m, [2, 3]);
  assert.ok(Math.abs(x + 2) < 1e-12 && Math.abs(y - 3) < 1e-12);
  scene.mode = "axisym";
  assert.equal(mirrorTransforms(scene).length, 3);
});

test("an indented statement keyword starts a new statement", () => {
  const { scene, errors } = parse(`soundwaves 1
medium air c=343 rho=1.2
material rigid rigid
polyline tube material=rigid
    0 0.05   1 0.05   1 0   0 0
    material drive piston signal=burst f0=1500 amp=0.01 cycles=3
    line piston 0 0 0 0.05 material=drive
region air 0.5 0.025
`);
  assert.deepEqual(errors, []);
  assert.equal(scene.element("tube").pts.length, 4);
  assert.equal(scene.material("drive").kind, "piston");
  assert.equal(scene.element("piston").material, "drive");
});

test("view grid and snap round-trip, with a default per unit", () => {
  const { scene } = parse("soundwaves 1\nunits cm\nmedium air\nregion r 0 0\n");
  assert.equal(scene.gridStep(), 5);
  assert.equal(scene.view.snap, true);
  const { scene: s2, errors } = parse("soundwaves 1\nmedium air\nregion r 0 0\nview grid=0.25 snap=off\n");
  assert.deepEqual(errors, []);
  assert.equal(s2.gridStep(), 0.25);
  assert.equal(s2.view.snap, false);
  assert.match(serialize(s2), /grid=0.25 snap=off/);
});

test("piston sides parse, default to both and round-trip", () => {
  const { scene, errors } = parse("soundwaves 1\nmedium air\nmaterial a piston signal=sine f0=100 amp=0.1\nmaterial b piston signal=sine f0=100 amp=0.1 sides=plate\nregion r 0 0\n");
  assert.deepEqual(errors, []);
  assert.equal(scene.material("a").sides, undefined);
  assert.equal(scene.material("b").sides, "plate");
  const j = scene.toEngineJson();
  assert.equal(j.materials[0].sides, "both");
  assert.equal(j.materials[1].sides, "plate");
  assert.match(serialize(scene), /material b piston signal=sine f0=100 amp=0.1 sides=plate/);
  assert.doesNotMatch(serialize(scene), /material a piston.*sides/);
});

test("a probe ring expands into probes, half of them in axisym", () => {
  const { scene, errors } = parse("soundwaves 1\nmedium air\nregion r 0 0\nring pat 1 0 0.5 n=36\n");
  assert.deepEqual(errors, []);
  assert.equal(scene.ringPoints(scene.ring("pat")).length, 36);
  assert.equal(scene.probeIds()[0], "pat:0");
  assert.match(serialize(scene), /ring pat 1 0 0.5 n=36\n/);
  scene.mode = "axisym";
  const pts = scene.ringPoints(scene.ring("pat"));
  assert.ok(pts.every((p) => p.y >= 0) && pts.length === 19, `${pts.length} points above the axis`);
  assert.equal(scene.toEngineJson().probes.length, 19);
});

test("a screen material takes rayl or a normalized r", () => {
  const { scene, errors } = parse("soundwaves 1\nmedium air\nmaterial a screen rayl=200\nmaterial b screen r=0.5\nmaterial c screen\nregion r 0 0\n");
  assert.deepEqual(errors, []);
  assert.equal(scene.material("a").rayl, 200);
  assert.ok(Math.abs(scene.material("b").rayl - 205.8) < 0.1);
  assert.equal(scene.material("c").rayl, 200);
  const j = scene.toEngineJson();
  assert.equal(j.materials[0].kind, "screen");
  assert.equal(j.materials[0].resistance, 200);
  assert.match(serialize(scene), /material a screen rayl=200/);
});
