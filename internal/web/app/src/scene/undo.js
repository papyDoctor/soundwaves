/*
 * Undo / redo over whole-scene snapshots. A scene is a few kilobytes of
 * data, so a pair of copies per step is cheap and nothing can be forgotten.
 * Capped at 50 steps. No DOM: the caller applies the snapshot.
 */
const CAP = 50;

export class History {
  constructor() { this.past = []; this.future = []; }
  get canUndo() { return this.past.length > 0; }
  get canRedo() { return this.future.length > 0; }
  push(step) {
    this.past.push(step);
    if (this.past.length > CAP) this.past.shift();
    this.future.length = 0;
  }
  /** The snapshot to restore, or null. */
  undo() {
    const step = this.past.pop();
    if (!step) return null;
    this.future.push(step);
    return step;
  }
  redo() {
    const step = this.future.pop();
    if (!step) return null;
    this.past.push(step);
    return step;
  }
  clear() { this.past.length = 0; this.future.length = 0; }
}
