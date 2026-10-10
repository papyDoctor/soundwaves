/*
 * The Scene tree: everything the scene contains, grouped, one row each.
 * Clicking selects (the inspector follows); double-clicking a wall frames it
 * in the viewport.
 */
const ICONS = {
  scene: "◳", medium: "≈", material: "▤", wall: "⌐", region: "◇", source: "◎", probe: "□", ring: "◌", sim: "⏱", view: "👁",
};

export function node(type, id, label, data = {}) { return { id: `${type}:${id}`, type, key: id, label, data }; }

export function mountTree(element, state) {
  element.classList.add("flush");
  const root = document.createElement("ul");
  root.className = "tree";
  element.append(root);

  function row(n, badge = "") {
    const li = document.createElement("li");
    const div = document.createElement("div");
    div.className = "node" + (state.selection?.id === n.id ? " selected" : "");
    div.dataset.id = n.id;
    div.innerHTML = `<span class="icon"></span><span class="label"></span>${badge ? `<span class="badge"></span>` : ""}`;
    div.querySelector(".icon").textContent = ICONS[n.type] || "•";
    div.querySelector(".label").textContent = n.label;
    if (badge) div.querySelector(".badge").textContent = badge;
    div.addEventListener("click", () => state.select(n));
    div.addEventListener("dblclick", () => state.emit("frame", n));
    li.append(div);
    return li;
  }
  function group(title, items) {
    const li = document.createElement("li");
    const h = document.createElement("div");
    h.className = "node"; h.style.color = "var(--text-2)"; h.style.fontSize = "11px"; h.style.textTransform = "uppercase";
    h.textContent = title;
    li.append(h);
    const ul = document.createElement("ul");
    if (!items.length) { const e = document.createElement("li"); e.className = "empty soft"; e.textContent = "none"; ul.append(e); }
    for (const it of items) ul.append(it);
    li.append(ul);
    return li;
  }

  function draw() {
    const s = state.scene;
    root.replaceChildren();
    if (!s) return;
    root.append(row(node("scene", "scene", `Scene · ${s.mode} · ${s.units}`)));
    root.append(group("Media", s.media.map((m) => row(node("medium", m.name, m.name), `${m.c} m/s`))));
    root.append(group("Materials", s.materials.map((m) => row(node("material", m.name, m.name), m.kind))));
    const kindsOf = (e) => new Set((e.kind === "polyline" ? e.materials : [e.material]).map((m) => s.material(m)?.kind));
    root.append(group("Walls", s.elements.map((e) => row(node("wall", e.id, e.id), kindsOf(e).has("piston") ? "piston" : e.kind))));
    root.append(group("Regions", s.regions.map((r) => row(node("region", r.id, r.id), r.medium))));
    root.append(group("Sources", s.sources.map((x) => row(node("source", x.id, x.id), `${x.signal.type} ${x.signal.f0} Hz`))));
    root.append(group("Probes", [
      ...s.probes.map((p) => row(node("probe", p.id, p.id))),
      ...(s.rings || []).map((g) => row(node("ring", g.id, g.id), `ring · ${s.ringPoints(g).length}`)),
    ]));
    root.append(row(node("sim", "sim", `Simulation · fmax ${s.sim.fmax} Hz`)));
    root.append(row(node("view", "view", "View")));
  }
  const offs = [state.on("scene", draw), state.on("selection", () => {
    for (const d of root.querySelectorAll(".node[data-id]")) d.classList.toggle("selected", d.dataset.id === state.selection?.id);
  })];
  draw();
  return { dispose: () => offs.forEach((f) => f()) };
}
