/*
 * The simulation worker: owns the wasm engine and the one Simulation, so the
 * main thread never blocks on a mesh or a step. Messages in, messages out;
 * big data (mesh, field) travels as transferable typed arrays, never JSON.
 *
 * Protocol (main → worker, each with an `id`, answered once with the same id):
 *   load                      → { version }
 *   scene { json }            → { meshKept }       the scene to simulate; the mesh survives physics-only changes
 *   mesh                      → { stats }          plus an unsolicited "mesh" message with the arrays
 *   prepare                   → { stats }          assemble, compute dt, reset to t = 0
 *   run { stepsPerTick }      → {}                 start: N steps per requested frame, or 0 = free-running
 *   pause                     → {}
 *   step { n }                → { time, step }
 *   reset                     → {}
 *   field { buffer }          → "field" message with the buffer filled (ping-pong)
 *   probes                    → { data, count, dt }
 * Unsolicited: "mesh", "field", "tick", "done", "fault".
 */
import init, { version, Simulation, last_panic } from "../../wasm/engine.js";

let wasm = null;        // the module (for .memory)
let sim = null;
let running = false;
let stepsPerTick = 0;
let fieldRequest = null; // a pending { id, buffer } to serve after the next tick
let stepsLastSecond = 0, lastRate = performance.now(), rate = 0;

const reply = (id, result = {}, transfer = []) => postMessage({ type: "result", id, ...result }, transfer);
const errorText = (e) => (typeof e === "string" ? e : e?.message || String(e));
// A Rust panic reaches us as "unreachable" (or, afterwards, as "recursive use
// of an object"): the Simulation is unusable. Report the panic's own message
// and drop the object; the next scene message builds a fresh one.
function fail(id, e) {
  let message = errorText(e);
  if (/unreachable|recursive use of an object/.test(message)) {
    const why = last_panic?.() || "";
    message = `the engine crashed${why ? ": " + why : ""}`;
    running = false;
    sim = null;
    postMessage({ type: "crashed" });
  }
  postMessage({ type: "error", id, message, line: e?.line });
}

// A MessageChannel tick is not clamped like setTimeout(0) in background tabs.
const channel = new MessageChannel();
channel.port1.onmessage = () => { if (running) tick(); };
const schedule = () => channel.port2.postMessage(0);

function view(ptr, n, Type) { return new Type(wasm.memory.buffer, ptr, n); }

/** Copy the mesh arrays out of wasm memory and send them (transferred). */
function sendMesh() {
  const nn = sim.node_count(), nt = sim.triangle_count(), ne = sim.edge_count();
  const xy = view(sim.coords_ptr(), 2 * nn, Float32Array).slice();
  const tri = view(sim.triangles_ptr(), 3 * nt, Uint32Array).slice();
  const edges = view(sim.edges_ptr(), 2 * ne, Uint32Array).slice();
  const edgeKinds = view(sim.edge_kinds_ptr(), ne, Uint16Array).slice();
  postMessage({ type: "mesh", xy, tri, edges, edgeKinds }, [xy.buffer, tri.buffer, edges.buffer, edgeKinds.buffer]);
}

function serveField() {
  if (!fieldRequest || !sim) return;
  const { id, buffer } = fieldRequest;
  fieldRequest = null;
  const n = sim.node_count();
  const out = buffer && buffer.length === n ? buffer : new Float32Array(n);
  out.set(view(sim.field_ptr(), n, Float32Array));
  const range = sim.field_range();
  postMessage({ type: "field", id, buffer: out, time: sim.time(), step: sim.steps_done(), min: range[0], max: range[1] }, [out.buffer]);
}

// Two paces. A finite speed is "steps per displayed frame": the worker
// advances only when the page asks for a frame, so the animation shows every
// batch and a small scene does not finish before its first picture. Speed 0
// ("max") runs free, as fast as the ticks come, and serves frames on the way.
function tick() {
  if (!running || !sim) return;
  const t0 = performance.now();
  let done;
  try {
    if (stepsPerTick > 0) done = sim.step(stepsPerTick);
    else {
      // As many steps as fit in ~8 ms: a first batch to measure, then the rest.
      done = sim.step(8);
      const per = Math.max(0.01, (performance.now() - t0) / 8);
      const more = Math.floor((8 - (performance.now() - t0)) / per);
      if (more > 0) done += sim.step(more);
    }
  } catch (e) {
    running = false;
    postMessage({ type: "fault", message: errorText(e) });
    return;
  }
  stepsLastSecond += done;
  const now = performance.now();
  if (now - lastRate > 500) { rate = stepsLastSecond * 1000 / (now - lastRate); stepsLastSecond = 0; lastRate = now; }
  serveField();
  postMessage({ type: "tick", time: sim.time(), step: sim.steps_done(), rate });
  if (done === 0 || sim.finished()) { running = false; postMessage({ type: "done", time: sim.time(), step: sim.steps_done() }); return; }
  if (stepsPerTick === 0) schedule();
}

onmessage = async ({ data: m }) => {
  const { id } = m;
  try {
    switch (m.type) {
      case "load":
        wasm = await init();
        reply(id, { version: version() });
        break;
      case "scene": {
        // A new scene keeps the mesh when only the physics changed.
        running = false;
        let meshKept = false;
        if (sim) meshKept = sim.set_scene(m.json);
        else sim = new Simulation(m.json);
        reply(id, { meshKept });
        break;
      }
      case "mesh": {
        running = false;
        const stats = JSON.parse(sim.mesh());
        sendMesh();
        reply(id, { stats });
        break;
      }
      case "prepare": {
        running = false;
        const stats = JSON.parse(sim.prepare());
        reply(id, { stats });
        break;
      }
      case "run":
        stepsPerTick = m.stepsPerTick | 0;
        if (!running) { running = true; lastRate = performance.now(); stepsLastSecond = 0; }
        if (stepsPerTick === 0) schedule();
        reply(id);
        break;
      case "pause":
        running = false;
        reply(id);
        break;
      case "step": {
        running = false;
        sim.step(m.n | 0);
        serveField();
        reply(id, { time: sim.time(), step: sim.steps_done() });
        break;
      }
      case "reset":
        running = false;
        sim.reset();
        reply(id, { time: 0, step: 0 });
        break;
      case "field":
        fieldRequest = { id, buffer: m.buffer };
        if (running && stepsPerTick > 0) tick();       // frame-paced: one batch per picture
        else if (!running) serveField();
        break;
      case "probes": {
        const data = sim.read_probes();
        reply(id, { data, count: sim.probe_count(), dt: sim.dt() }, [data.buffer]);
        break;
      }
      default:
        fail(id, `unknown message ${m.type}`);
    }
  } catch (e) {
    fail(id, e);
  }
};
