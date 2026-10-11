import { test } from "node:test";
import assert from "node:assert/strict";
import { Library } from "../src/scene/library.js";

// A localStorage stand-in.
function fakeStorage() { const m = new Map(); return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)) }; }

test("the browser library keeps scenes by name", () => {
  const lib = new Library(fakeStorage());
  assert.deepEqual(lib.names(), []);
  assert.ok(lib.put("room", "soundwaves 1\n"));
  assert.ok(lib.put("hall", "soundwaves 1\nunits cm\n"));
  assert.deepEqual(lib.names(), ["hall", "room"]);
  assert.equal(lib.get("room").text, "soundwaves 1\n");
  lib.remove("room");
  assert.deepEqual(lib.names(), ["hall"]);
  assert.equal(lib.get("room"), null);
});

test("the library survives a storage that throws", () => {
  const lib = new Library({ getItem: () => { throw new Error("private mode"); }, setItem: () => { throw new Error("full"); } });
  assert.deepEqual(lib.names(), []);
  assert.equal(lib.put("x", "y"), false);
});
