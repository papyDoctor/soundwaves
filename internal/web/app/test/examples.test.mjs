// Every example scene parses without errors, becomes engine JSON, meshes and
// steps a few times in the wasm engine, in both the parser's and the
// engine's eyes. This is the round trip the app performs on Open + Run.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import init, { Simulation } from "../wasm/engine.js";
import { parse, serialize } from "../src/scene/format.js";

const wasmBytes = await readFile(new URL("../wasm/engine_bg.wasm", import.meta.url));
await init({ module_or_path: wasmBytes });
const dir = new URL("../examples/", import.meta.url);

for (const file of (await readdir(dir)).filter((f) => f.endsWith(".sw"))) {
  test(`example ${file} parses, meshes and runs`, async () => {
    const text = await readFile(new URL(file, dir), "utf8");
    const { scene, errors } = parse(text);
    assert.deepEqual(errors, [], `${file}: parse errors`);
    assert.equal(serialize(parse(serialize(scene)).scene), serialize(scene), `${file}: round trip`);
    const sim = new Simulation(JSON.stringify(scene.toEngineJson()));
    const stats = JSON.parse(sim.mesh());
    assert.ok(stats.nodes > 100, `${file}: only ${stats.nodes} nodes`);
    assert.ok(stats.minAngle > 20, `${file}: min angle ${stats.minAngle}`);
    assert.ok(stats.refinementComplete, `${file}: refinement incomplete`);
    const prep = JSON.parse(sim.prepare());
    assert.ok(prep.dt > 0 && prep.steps > 10);
    assert.equal(sim.step(20), 20);
    const range = sim.field_range();
    sim.field_ptr();
    assert.ok(Number.isFinite(sim.field_range()[0]) && Number.isFinite(sim.field_range()[1]));
    assert.ok(sim.probe_count() === scene.probeIds().length);
    void range;
    sim.free();
  });
}
