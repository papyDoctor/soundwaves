// The wasm engine loads under Node and answers: the glue that wasm-pack
// generates for the browser also takes the module bytes directly, so the
// physics can be exercised here without a browser.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import init, { version } from "../wasm/engine.js";

const wasmBytes = await readFile(new URL("../wasm/engine_bg.wasm", import.meta.url));
await init({ module_or_path: wasmBytes });

test("engine reports its version", () => {
  assert.match(version(), /^engine \d+\.\d+\.\d+$/);
});
