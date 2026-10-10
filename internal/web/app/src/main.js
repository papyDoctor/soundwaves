/*
 * SoundWaves — entry point. Order matters: the state and the simulation
 * client first (the worker loads the wasm meanwhile), then the panels —
 * empty, they listen —, then the scene, which fills them.
 *
 * Everything a smoke script touches goes through window.sw: that is the test
 * surface, stable on purpose. The DOM may change.
 */
import { createDockview, themeDark } from "../vendor/dockview-core-8.3.1.min.mjs";
import { state } from "./state.js";
import { createDocks } from "./shell/docks.js";
import { mountTopbar } from "./shell/topbar.js";
import { ask } from "./shell/dialog.js";
import { mountOutput, output } from "./panels/output.js";
import { mountInspector } from "./panels/inspector.js";
import "./panels/inspectors/cards.js";
import { mountTree } from "./panels/tree_panel.js";
import { mountText } from "./panels/text_panel.js";
import { mountProbes, ProbeStore } from "./panels/probes_panel.js";
import { mountViewport } from "./view/viewport_panel.js";
import { SimClient } from "./sim/client.js";
import { parse, serialize } from "./scene/format.js";
import { Scene } from "./scene/model.js";
import { History } from "./scene/undo.js";
import { api } from "./api.js";

const DRAFT = "sw.draft.v1";
const EXAMPLES = ["room.sw", "hall_half.sw", "tube_axisym.sw", "horn.sw"];

/** Make `text` the scene. Parse errors are reported but what parsed is kept.
    `project` is the server record it came from ({id, version, etag}), if any. */
function loadScene(text, name, project = null) {
  state.project = project;
  const { scene, errors } = parse(text);
  if (errors.length) {
    state.output.add({ title: `${name}: ${errors.length} problem${errors.length > 1 ? "s" : ""} in the text`, kind: "warning",
      body: errors.map((e) => { const p = document.createElement("p"); p.append(state.output.lineLink(e.line), ` ${e.message}`); return p; }) });
  }
  state.sceneName = name;
  state.history.clear();
  state.probes.clear();
  state.lastMesh = null; state.lastPrepare = null;
  state.replaceScene(scene, { origin: "load", record: false });
  state.select(null);
}

/** The engine's errors name things by id: make the id a link to its line. */
function engineError(title, message) {
  const p = document.createElement("p");
  const m = /'([\w-]+)'/.exec(message);
  const line = m && state.scene?.lineOf(m[1]);
  if (line) { p.append(message.slice(0, m.index + 1), state.output.lineLink(line, m[1]), message.slice(m.index + m[0].length - 1)); }
  else p.textContent = message;
  state.output.add({ title, kind: "error", body: [p] });
}

async function start() {
  state.output = output(state);
  state.history = new History();
  state.probes = new ProbeStore();
  state.sim = new SimClient();
  const loading = state.sim.load().then(
    (r) => state.output.ok("Engine loaded", r.version),
    (e) => state.output.error("Engine failed to load", e.message),
  );

  // The scene before the panels, so they have something to draw.
  let draft = null;
  try { draft = JSON.parse(localStorage.getItem(DRAFT) || "null"); } catch {}
  if (draft?.text) { state.sceneName = draft.name; state.scene = parse(draft.text).scene; }
  else {
    try { const r = await fetch("examples/room.sw"); state.sceneName = "room.sw"; state.scene = parse(await r.text()).scene; }
    catch { state.sceneName = "untitled.sw"; state.scene = Scene.blank(); }
  }

  state.docks = createDocks(document.getElementById("docks"), { createDockview, themeDark }, {
    tree: mountTree, viewport: mountViewport, text: mountText, inspector: mountInspector, output: mountOutput, probes: mountProbes,
  }, state);

  const sim = state.sim;
  let speed = 5;

  // The engine holds its own copy of the scene: send it whenever ours moved.
  // A change that does not touch the geometry keeps the mesh over there.
  let sent = { scene: null, version: -1 };
  async function syncScene() {
    const scene = state.scene;
    if (sent.scene === scene && sent.version === scene.version) return true;
    let json;
    try { json = JSON.stringify(scene.toEngineJson()); } catch (e) { engineError("Scene is not complete", e.message); return false; }
    try {
      const meshKept = await sim.setScene(json);
      sent = { scene, version: scene.version };
      if (!meshKept) state.stale.mesh = true;
      state.stale.system = true;
      return true;
    } catch (e) { engineError("Scene refused", e.message); return false; }
  }

  async function mesh() {
    if (!(await syncScene())) return false;
    try {
      const t0 = performance.now();
      const stats = await sim.doMesh();
      state.lastMesh = stats; state.lastPrepare = null;
      state.stale.mesh = false; state.stale.system = true;
      state.probes.clear(); state.emit("probes"); state.emit("reset-field");
      const body = [state.output.table([
        ["nodes", stats.nodes.toLocaleString()], ["triangles", stats.triangles.toLocaleString()], ["boundary edges", stats.boundaryEdges.toLocaleString()],
        ["h", `${stats.h.toPrecision(4)} m`], ["h min", `${stats.hMin.toPrecision(4)} m`], ["min angle", `${stats.minAngle.toFixed(1)}°`], ["time", `${(performance.now() - t0).toFixed(0)} ms`],
      ])];
      for (const w of stats.warnings || []) { const p = document.createElement("p"); p.className = "msg warning"; p.textContent = w; body.push(p); }
      state.output.add({ title: "Meshed", kind: stats.warnings?.length ? "warning" : "ok", body });
      state.emit("sim");
      return true;
    } catch (e) { engineError("Mesh failed", e.message); state.emit("sim"); return false; }
  }

  async function prepare() {
    try {
      const stats = await sim.prepare();
      state.lastPrepare = stats; state.stale.system = false;
      state.probes.clear(); state.emit("probes"); state.emit("reset-field");
      state.output.add({ title: "Prepared", kind: "ok", body: [state.output.table([
        ["dt", `${(stats.dt * 1e6).toFixed(3)} µs`], ["steps", stats.steps.toLocaleString()], ["geometric dt", `${(stats.dtGeometric * 1e6).toFixed(3)} µs`], ["nonzeros", stats.nnz.toLocaleString()],
      ])] });
      state.emit("sim");
      return true;
    } catch (e) { engineError("Prepare failed", e.message); return false; }
  }

  const actions = {
    async open() {
      const content = document.createElement("div");
      content.innerHTML = `<p class="note">Pick an example${state.session?.account ? " or one of your projects" : ""}, or a .sw file from your computer.</p>`;
      const pick = document.createElement("select");
      for (const ex of EXAMPLES) { const o = document.createElement("option"); o.value = "example:" + ex; o.textContent = `example · ${ex}`; pick.append(o); }
      for (const p of state.projects || []) { const o = document.createElement("option"); o.value = "project:" + p.id; o.textContent = `mine · ${p.name}`; pick.append(o); }
      const file = document.createElement("input"); file.type = "file"; file.accept = ".sw,text/plain"; file.style.marginTop = "0.5rem";
      content.append(pick, file);
      const choice = await ask({ title: "Open a scene", text: "Unsaved changes to the current scene are lost.", content,
        buttons: [{ label: "Open", value: "ok", primary: true }, { label: "Cancel", value: "cancel" }] });
      if (choice !== "ok") return;
      if (file.files[0]) loadScene(await file.files[0].text(), file.files[0].name);
      else if (pick.value.startsWith("project:")) await actions.openProject(Number(pick.value.slice(8)));
      else { const ex = pick.value.slice(8); const r = await fetch(`examples/${ex}`); loadScene(await r.text(), ex); }
    },
    download() {
      const text = serialize(state.scene);
      const blob = new Blob([text], { type: "text/plain" });
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
      a.download = (state.sceneName || "scene").replace(/\.sw$/, "") + ".sw"; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      state.output.ok("Saved", `${a.download} downloaded (${text.length} bytes)`);
    },
    mesh: () => { sim.pause(); mesh(); },
    async toggleRun() {
      if (sim.running) { await sim.pause(); state.emit("sim"); return; }
      if (!(await syncScene())) return;
      if (state.stale.mesh && !(await mesh())) return;
      if (state.stale.system && !(await prepare())) return;
      if (sim.time >= state.scene.sim.duration) { await sim.reset(); state.probes.clear(); state.emit("probes"); }
      await sim.run(speed);
      state.emit("sim");
    },
    async reset() {
      if (state.stale.system) return;
      await sim.reset();
      state.probes.clear(); state.emit("probes"); state.emit("reset-field"); state.emit("sim");
    },
    setSpeed(v) { speed = v; if (sim.running) sim.run(speed); },
    undo() { const step = state.history.undo(); if (step) state.replaceScene(Scene.fromSnapshot(step.before), { origin: "undo", level: step.level, record: false }); },
    redo() { const step = state.history.redo(); if (step) state.replaceScene(Scene.fromSnapshot(step.after), { origin: "undo", level: step.level, record: false }); },
    loadScene,
  };
  mountTopbar(state, actions);

  sim.on("done", () => state.emit("sim"));
  // After a crash the engine forgot the scene: send it again before anything else.
  sim.on("crashed", () => { sent = { scene: null, version: -1 }; state.stale.mesh = true; state.stale.system = true; state.emit("sim"); });
  sim.on("fault", (m) => { engineError("Engine fault", m); state.emit("sim"); });
  // The clock in the bar, throttled: the worker ticks every few milliseconds.
  let lastClock = 0;
  sim.on("tick", () => { const now = performance.now(); if (now - lastClock > 100) { lastClock = now; state.emit("sim"); } });

  // One field frame and one probe batch per displayed frame while running.
  let probesBusy = false;
  (function loop() {
    if (sim.running) {
      sim.requestField();
      if (!probesBusy && state.scene.probeIds().length) {
        probesBusy = true;
        sim.probes().then((r) => { probesBusy = false; if (r.data.length) { state.probes.append(r.data, r.count, r.dt); state.emit("probes"); } }, () => { probesBusy = false; });
      }
    }
    requestAnimationFrame(loop);
  })();
  sim.on("done", () => { if (state.scene.probeIds().length) sim.probes().then((r) => { if (r.data.length) { state.probes.append(r.data, r.count, r.dt); state.emit("probes"); } }); sim.requestField(); });

  // A changed scene stops the run, and is kept as a draft against a crash.
  let draftTimer = null;
  state.on("scene", ({ level }) => {
    if (level !== "view" && sim.running) sim.pause().then(() => state.emit("sim"));
    clearTimeout(draftTimer);
    draftTimer = setTimeout(() => { try { localStorage.setItem(DRAFT, JSON.stringify({ name: state.sceneName, text: serialize(state.scene) })); } catch {} }, 500);
  });

  // Keyboard, wherever the focus is (but not while typing).
  document.addEventListener("keydown", (e) => {
    const mod = e.metaKey || e.ctrlKey;
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName) || document.activeElement?.closest(".cm-editor");
    if (mod && e.key.toLowerCase() === "s") { e.preventDefault(); actions.save(); }
    else if (mod && e.key.toLowerCase() === "z" && !typing) { e.preventDefault(); e.shiftKey ? actions.redo() : actions.undo(); }
    else if (mod && e.key.toLowerCase() === "y" && !typing) { e.preventDefault(); actions.redo(); }
    else if (e.key === " " && !typing && !mod) { e.preventDefault(); actions.toggleRun(); }
  }, true);

  // --- The server: who is signed in, their projects.
  state.session = null; state.projects = [];
  async function refreshSession() {
    try { state.session = (await api.get("/api/session")).data; } catch { state.session = { account: null, dev: false, storage: false }; }
    state.emit("session");
    await refreshProjects();
  }
  async function refreshProjects() {
    state.projects = [];
    if (state.session?.account) { try { state.projects = (await api.get("/api/projects")).data; } catch (e) { state.output.error("Could not list your projects", e.message); } }
    state.emit("projects");
  }
  actions.signIn = async () => {
    const providers = state.session?.providers || [];
    if (!providers.length && !state.session?.dev) { state.output.warn("Sign in", "This server has no sign-in configured yet."); return; }
    const content = document.createElement("div");
    // One button per identity provider: a plain link, the server does the rest.
    if (providers.length) {
      const row = document.createElement("div"); row.className = "card-actions";
      for (const p of providers) {
        const a = document.createElement("a"); a.className = "button primary"; a.href = `/login/${p.name}`; a.textContent = `Continue with ${p.label}`;
        a.title = `Sign in with your ${p.label} account; only a stable identifier and your name are kept`;
        row.append(a);
      }
      content.append(row);
    }
    let input = null;
    if (state.session?.dev) {
      input = document.createElement("input"); input.type = "text"; input.placeholder = "development: any name"; input.value = localStorage.getItem("sw.devname") || "";
      input.style.width = "100%"; input.style.marginTop = "0.6rem"; content.append(input);
    }
    const buttons = input ? [{ label: "Sign in as this name", value: "ok", primary: true }, { label: "Cancel", value: "cancel" }] : [{ label: "Cancel", value: "cancel" }];
    const choice = await ask({ title: "Sign in", text: providers.length ? "Keep your scenes in your account on this server." : "A name is all it takes here: the same name gives the same account.", content, buttons,
      check: () => (!input || /^[A-Za-z0-9 _-]{2,32}$/.test(input.value.trim()) ? "" : "2 to 32 characters: letters, digits, space, hyphen or underscore") });
    if (choice !== "ok" || !input) return;
    return actions.devLogin(input.value.trim());
  };
  actions.devLogin = async (name) => {
    try {
      state.session = (await api.post("/api/dev-login", { name })).data;
      try { localStorage.setItem("sw.devname", name); } catch {}
      state.emit("session");
      await refreshProjects();
      state.output.ok("Signed in", `as ${state.session.account.name}`);
    } catch (e) { state.output.error("Sign-in failed", e.message); }
  };
  actions.signOut = async () => {
    try { await api.post("/api/logout"); } catch {}
    state.project = null;
    await refreshSession();
    state.output.ok("Signed out");
  };
  actions.openProject = async (id) => {
    try {
      const { data, etag } = await api.get(`/api/projects/${id}`);
      loadScene(data.text, data.name, { id: data.id, version: data.version, etag });
      state.output.ok("Opened", `${data.name} from your account`);
    } catch (e) { state.output.error("Could not open the project", e.message); }
  };
  actions.saveToServer = async () => {
    const text = serialize(state.scene);
    const name = state.sceneName.replace(/\.sw$/, "");
    try {
      if (state.project?.id) {
        const { data, etag } = await api.put(`/api/projects/${state.project.id}`, { name, text }, state.project.etag);
        state.project = { id: data.id, version: data.version, etag };
      } else {
        const { data, etag } = await api.post("/api/projects", { name, text });
        state.project = { id: data.id, version: data.version, etag };
      }
      await refreshProjects();
      state.emit("scene", { origin: "save", level: "view" });
      state.output.ok("Saved", `${name} (${text.length} bytes) in your account`);
    } catch (e) {
      if (e.status === 412) {
        const choice = await ask({ title: "Saved elsewhere since you opened it", text: "This project changed on the server (another tab?). Overwrite it with this scene, or save under a new name?",
          buttons: [{ label: "Overwrite", value: "force", danger: true }, { label: "Save as new", value: "new" }, { label: "Cancel", value: "cancel" }] });
        if (choice === "force") { state.project.etag = null; return actions.saveToServer(); }
        if (choice === "new") { state.project = null; state.sceneName = name + "-copy.sw"; return actions.saveToServer(); }
        return;
      }
      if (e.status === 409) {
        const choice = await ask({ title: "Name taken", text: `You already have a project named '${name}'. Replace it?`,
          buttons: [{ label: "Replace", value: "replace", danger: true }, { label: "Cancel", value: "cancel" }] });
        if (choice === "replace") {
          const existing = state.projects.find((p) => p.name === name);
          if (existing) { state.project = { id: existing.id, version: 0, etag: null }; return actions.saveToServer(); }
        }
        return;
      }
      state.output.error("Save failed", e.message);
    }
  };
  actions.save = () => (state.session?.account ? actions.saveToServer() : actions.download());
  actions.deleteProject = async () => {
    if (!state.project?.id) return;
    try { await api.del(`/api/projects/${state.project.id}`); state.project = null; await refreshProjects(); state.emit("scene", { origin: "save", level: "view" }); state.output.ok("Deleted from your account"); }
    catch (e) { state.output.error("Delete failed", e.message); }
  };
  await refreshSession();
  // Back from an identity provider: the address says how it went.
  const back = new URLSearchParams(location.search).get("login");
  if (back) {
    history.replaceState(null, "", location.pathname);
    if (back === "ok" && state.session?.account) state.output.ok("Signed in", `as ${state.session.account.name}`);
    else if (back === "failed") state.output.error("Sign-in failed", "The identity provider did not confirm you, or the request expired. Try again.");
  }

  await loading;
  state.emit("scene", { origin: "load", level: "geometry" });
  window.sw = { state, actions, ask, parse, serialize, api };
}

start().catch((e) => { console.error(e); document.body.insertAdjacentHTML("beforeend", `<pre class="msg error">${e.message}</pre>`); });
