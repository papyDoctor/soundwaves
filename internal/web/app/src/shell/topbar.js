/*
 * The top bar: open/save the scene, mesh, run/pause, reset, the clock, the
 * speed, the stats. It does nothing itself: it calls the actions main.js
 * gives it, and listens to the state to stay truthful.
 */
export function mountTopbar(state, actions) {
  const q = (role) => document.querySelector(`[data-role="${role}"]`);
  const run = q("run"), time = q("time"), stats = q("stats"), speed = q("speed"), project = q("project"), account = q("account");

  q("open").addEventListener("click", () => actions.open());
  q("save").addEventListener("click", () => actions.save());
  q("download").addEventListener("click", () => actions.download());
  q("share").addEventListener("click", () => actions.share());
  account.addEventListener("click", () => (state.session?.account ? actions.signOut() : actions.signIn()));
  project.addEventListener("change", () => {
    if (project.value.startsWith("local:")) actions.openLocal(project.value.slice(6));
    else if (project.value) actions.openProject(Number(project.value));
  });

  // The project select: the unsaved scene first, then the account's projects.
  function drawProjects() {
    project.replaceChildren();
    const current = state.project?.id ?? "";
    const list = state.projects || [];
    if (!current) { const o = document.createElement("option"); o.value = ""; o.textContent = state.sceneName + (state.share?.id ? " (shared link)" : ""); project.append(o); }
    for (const p of list) { const o = document.createElement("option"); o.value = String(p.id); o.textContent = p.name; if (p.id === current) o.selected = true; project.append(o); }
    for (const name of state.library?.names() || []) { const o = document.createElement("option"); o.value = "local:" + name; o.textContent = `${name} (this browser)`; if (!current && state.libraryName === name) o.selected = true; project.append(o); }
    const signed = !!state.session?.account;
    account.hidden = !state.session?.storage;
    q("share").hidden = !state.session?.storage;
    account.textContent = signed ? `${state.session.account.name} · sign out` : "Sign in";
    account.title = signed ? "Signed in: click to sign out" : "Sign in to keep your scenes on this server";
  }
  state.on("session", drawProjects);
  state.on("projects", drawProjects);
  q("mesh").addEventListener("click", actions.mesh);
  run.addEventListener("click", actions.toggleRun);
  q("reset").addEventListener("click", actions.reset);
  q("reset-layout").addEventListener("click", () => state.docks?.reset());
  speed.addEventListener("change", () => actions.setSpeed(Number(speed.value)));

  const ms = (t) => (t * 1000).toFixed(2);
  function drawClock() {
    const sim = state.sim;
    const duration = state.scene?.sim?.duration ?? 0;
    time.textContent = `t = ${ms(sim?.time || 0)} / ${ms(duration)} ms`;
    run.textContent = sim?.running ? "❚❚ Pause" : "▶ Run";
    run.classList.toggle("primary", !sim?.running);
  }
  function drawStats() {
    const m = state.sim?.mesh;
    const parts = [];
    if (m) parts.push(`${(m.xy.length / 2).toLocaleString()} nodes · ${(m.tri.length / 3).toLocaleString()} tris`);
    if (state.sim?.running && state.sim.rate) parts.push(`${Math.round(state.sim.rate).toLocaleString()} steps/s`);
    if (state.stale.mesh && m) parts.push("mesh stale");
    stats.textContent = parts.join(" · ");
  }
  state.on("sim", () => { drawClock(); drawStats(); });
  state.on("scene", () => { drawClock(); drawStats(); drawProjects(); });
  drawClock(); drawStats(); drawProjects();
  return { speed: () => Number(speed.value) };
}
