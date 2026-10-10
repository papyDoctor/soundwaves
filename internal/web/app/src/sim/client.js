/*
 * The main-thread side of the simulation: a proxy over the worker. Requests
 * are promises (one reply per id); what the worker volunteers — the mesh
 * arrays, a field frame, a tick, the end of the run — comes out as events.
 *
 * The field travels in two Float32Array buffers that bounce between threads:
 * the client hands one over, the worker fills and returns it, zero copies.
 * At most one request is outstanding, so frames never pile up.
 */
export class SimClient {
  constructor() {
    this.worker = new Worker(new URL("./worker.js", import.meta.url), { type: "module" });
    this.pending = new Map();
    this.nextId = 1;
    this.listeners = new Map();
    this.mesh = null;          // { xy, tri, edges, edgeKinds } last received
    this.field = null;         // the last filled Float32Array, with .time/.min/.max on the frame
    this.spare = null;         // the buffer waiting to be handed to the worker
    this.fieldInFlight = false;
    this.running = false;
    this.time = 0; this.step = 0; this.rate = 0;
    this.worker.onmessage = ({ data: m }) => this._receive(m);
    // A worker that fails to start (a module that does not load) answers no
    // request at all: reject them, so the page can say what happened.
    this.worker.onerror = (e) => {
      const msg = e.message || "worker error";
      for (const p of this.pending.values()) p.reject(new Error(msg));
      this.pending.clear();
      this.emit("fault", msg);
    };
  }

  on(event, fn) {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event).add(fn);
    return () => this.listeners.get(event).delete(fn);
  }
  emit(event, ...args) { for (const fn of this.listeners.get(event) || []) { try { fn(...args); } catch (e) { console.error(e); } } }

  request(type, payload = {}, transfer = []) {
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.worker.postMessage({ type, id, ...payload }, transfer);
    });
  }

  _receive(m) {
    switch (m.type) {
      case "result": { const p = this.pending.get(m.id); this.pending.delete(m.id); p?.resolve(m); break; }
      case "error": {
        const p = this.pending.get(m.id); this.pending.delete(m.id);
        const err = new Error(m.message); err.line = m.line;
        if (p) p.reject(err); else this.emit("fault", m.message);
        break;
      }
      case "mesh": this.mesh = m; this.emit("mesh", m); break;
      case "field": {
        this.pending.delete(m.id);
        this.fieldInFlight = false;
        this.spare = this.field;             // the previous frame becomes the spare
        this.field = m.buffer;
        this.emit("field", { data: m.buffer, time: m.time, step: m.step, min: m.min, max: m.max });
        break;
      }
      case "tick": this.time = m.time; this.step = m.step; this.rate = m.rate; this.emit("tick", m); break;
      case "done": this.running = false; this.time = m.time; this.step = m.step; this.emit("done", m); break;
      case "fault": this.running = false; this.emit("fault", m.message); break;
      case "crashed": this.running = false; this.mesh = null; this.emit("crashed"); break;
    }
  }

  /** Ask for a field frame if none is in flight. The answer comes as a "field" event. */
  requestField() {
    if (this.fieldInFlight) return;
    this.fieldInFlight = true;
    const buffer = this.spare && this.spare.length ? this.spare : null;
    this.spare = null;
    const id = this.nextId++;
    this.worker.postMessage({ type: "field", id, buffer }, buffer ? [buffer.buffer] : []);
  }

  load() { return this.request("load"); }
  async setScene(json) { this.running = false; const r = await this.request("scene", { json }); if (!r.meshKept) this.mesh = null; return r.meshKept; }
  async doMesh() { const r = await this.request("mesh"); return r.stats; }
  async prepare() { const r = await this.request("prepare"); this.time = 0; this.step = 0; return r.stats; }
  async run(stepsPerTick = 0) { this.running = true; await this.request("run", { stepsPerTick }); }
  async pause() { this.running = false; await this.request("pause"); }
  async stepOnce(n = 1) { const r = await this.request("step", { n }); this.time = r.time; this.step = r.step; return r; }
  async reset() { this.running = false; const r = await this.request("reset"); this.time = 0; this.step = 0; this.emit("tick", r); return r; }
  probes() { return this.request("probes"); }
}
