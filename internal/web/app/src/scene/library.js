/*
 * Scenes kept in this browser, by name, with no account and no server:
 * localStorage, one entry per scene. A convenience, not a vault: clearing the
 * site data loses them, which is why Save also downloads on request.
 */
const KEY = "sw.library.v1";

export class Library {
  constructor(storage = globalThis.localStorage) { this.storage = storage; }
  _read() { try { return JSON.parse(this.storage?.getItem(KEY) || "{}") || {}; } catch { return {}; } }
  _write(all) { try { this.storage?.setItem(KEY, JSON.stringify(all)); return true; } catch { return false; } }
  names() { return Object.keys(this._read()).sort((a, b) => a.localeCompare(b)); }
  get(name) { return this._read()[name] || null; }
  put(name, text) { const all = this._read(); all[name] = { text, updated: new Date().toISOString() }; return this._write(all); }
  remove(name) { const all = this._read(); delete all[name]; return this._write(all); }
}
