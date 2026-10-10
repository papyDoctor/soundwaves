/*
 * The dock shell: dockview provides the mechanics (tabs, dragging,
 * splitters); we provide the panels, the default layout and its memory.
 *
 * A panel is a component named by its role (tree, viewport, text, inspector,
 * output, probes) — that name is what dockview stores in the saved layout.
 * The layout is remembered under a versioned key: when the default layout
 * changes shape, bump the version and everyone starts from the new one.
 * "Reset layout" in the bar brings the original back.
 */

const KEY = "sw.layout.v1";

const TITLES = {
  tree: "Scene", viewport: "Viewport", text: "Scene text",
  inspector: "Inspector", output: "Output", probes: "Probes",
};

export function createDocks(container, { createDockview, themeDark }, components, state) {
  const instances = {};

  const api = createDockview(container, {
    theme: themeDark,
    createComponent: (o) => {
      const element = document.createElement("div");
      element.className = "panel";
      element.dataset.panel = o.id;
      element.dataset.component = o.name;
      const mount = components[o.name];
      let instance = {};
      return {
        element,
        init(p) {
          if (mount) instances[o.id] = instance = mount(element, state, { id: o.id, params: p.params, api: p.api }) || {};
          else element.innerHTML = `<h2>${TITLES[o.name] || o.name}</h2><p class="empty">soon</p>`;
          instance.init?.(p);
        },
        dispose() { instance.dispose?.(); delete instances[o.id]; },
      };
    },
  });

  function defaults() {
    const add = (id, position, size = {}) => api.addPanel({ id, component: id, title: TITLES[id], position, ...size });
    add("tree", undefined, { initialWidth: 240 });
    add("viewport",  { referencePanel: "tree",     direction: "right" });
    add("text",      { referencePanel: "viewport", direction: "within" });
    add("inspector", { referencePanel: "viewport", direction: "right" }, { initialWidth: 340 });
    add("output",    { referencePanel: "viewport", direction: "below" }, { initialHeight: 220 });
    add("probes",    { referencePanel: "output",   direction: "within" });
    api.getPanel("viewport")?.api.setActive();
    api.getPanel("output")?.api.setActive();
    // Sizes only stick once dockview has measured its container, a tick later.
    setTimeout(() => {
      api.getPanel("tree")?.api.setSize({ width: 240 });
      api.getPanel("inspector")?.api.setSize({ width: 340 });
      api.getPanel("output")?.api.setSize({ height: 230 });
    }, 60);
  }

  /** A saved layout is only worth restoring if every panel in it is a known
      component: otherwise dockview would recreate them empty, silently. */
  function valid(saved) {
    const panels = Object.values(saved?.panels || {});
    return panels.length > 0 && panels.every((p) => p.contentComponent in components || p.contentComponent in TITLES);
  }

  function restore() {
    let saved = null;
    try { saved = JSON.parse(localStorage.getItem(KEY) || "null"); } catch { saved = null; }
    if (saved && valid(saved)) {
      try {
        api.fromJSON(saved);
        // Titles come from the code, not from the saved layout.
        for (const panel of api.panels) if (TITLES[panel.id]) panel.api.setTitle(TITLES[panel.id]);
        return;
      } catch (e) { console.warn("unreadable layout, using the default:", e); }
    }
    defaults();
  }

  function remember() {
    try { localStorage.setItem(KEY, JSON.stringify(api.toJSON())); } catch {}
  }

  function reset() {
    try { localStorage.removeItem(KEY); } catch {}
    api.clear();
    defaults();
    remember();
  }

  /** Bring a panel to the front (e.g. the text editor after "go to line"). */
  function show(id) {
    const p = api.getPanel(id);
    if (p) { p.api.setActive(); return p; }
    const ref = api.panels.find((q) => q.id !== id);
    return api.addPanel({ id, component: id, title: TITLES[id], position: ref ? { referencePanel: ref.id, direction: "within" } : undefined });
  }

  restore();
  api.onDidLayoutChange(remember);

  return { api, instances, reset, show };
}
