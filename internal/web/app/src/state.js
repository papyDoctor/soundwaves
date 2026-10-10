/*
 * The workshop's shared state: the scene (single source of truth), the
 * selection the inspector looks at, the simulation client, and a tiny event
 * bus so panels redraw when something changes. No framework: Maps and
 * functions.
 *
 * Every change to the scene goes through `modify()`: it records undo, bumps
 * the version, works out what the change invalidates (the mesh, the
 * assembled system, or just the view) and tells everyone.
 */

export const INVALIDATES = { geometry: 2, physics: 1, view: 0 };

export const state = {
  scene: null,         // scene/model.js Scene
  sceneName: "untitled.sw",
  selection: null,     // { id, type, label, data } or null
  sim: null,           // sim/client.js SimClient
  docks: null,         // shell/docks.js
  history: null,       // scene/undo.js History
  // What the last modification invalidated since the mesh / system were built.
  stale: { mesh: true, system: true },

  _listeners: new Map(),

  on(event, fn) {
    if (!this._listeners.has(event)) this._listeners.set(event, new Set());
    this._listeners.get(event).add(fn);
    return () => this._listeners.get(event).delete(fn);
  },

  emit(event, ...args) {
    for (const fn of this._listeners.get(event) || []) {
      try { fn(...args); } catch (e) { console.error(`listener ${event}:`, e); }
    }
  },

  /** Select a node. `extra.message` is shown by the inspector after its
      redraw — a confirmation written before the redraw would vanish with the
      form that carried it. */
  select(node, extra = {}) {
    this.selection = node;
    this.emit("selection", node, extra);
  },

  /**
   * Apply `fn(scene)` as one undoable step. `origin` names the panel that
   * made the change, so it can skip its own echo; `level` says what the
   * change invalidates ("geometry" | "physics" | "view").
   * Returns false if `fn` returned false (refused, nothing happened).
   */
  modify(fn, { origin = "ui", level = "geometry" } = {}) {
    const scene = this.scene;
    if (!scene) return false;
    const before = scene.snapshot();
    if (fn(scene) === false) return false;
    scene.version++;
    this.history?.push({ before, after: scene.snapshot(), level });
    this._invalidate(level);
    this.emit("scene", { origin, level });
    return true;
  },

  /**
   * Record a change made directly to the scene (a drag that mutated it live)
   * as one undoable step, from the snapshot taken before it started.
   */
  commit(before, { origin = "viewport", level = "geometry" } = {}) {
    const scene = this.scene;
    if (!scene) return;
    scene.version++;
    this.history?.push({ before, after: scene.snapshot(), level });
    this._invalidate(level);
    this.emit("scene", { origin, level });
  },

  /** Replace the whole scene (file opened, text applied, undo). */
  replaceScene(scene, { origin = "ui", level = "geometry", record = true } = {}) {
    const before = this.scene?.snapshot();
    this.scene = scene;
    scene.version = (before ? this.scene.version : 0) + 1;
    if (record && before && this.history) this.history.push({ before, after: scene.snapshot(), level });
    this._invalidate(level);
    this.emit("scene", { origin, level });
  },

  _invalidate(level) {
    const n = INVALIDATES[level] ?? 2;
    if (n >= 2) this.stale.mesh = true;
    if (n >= 1) this.stale.system = true;
  },
};
