/*
 * The inspector: the selected node, its properties. One function per node
 * type renders a card; this panel mounts it on the right. A type without a
 * card of its own gets a plain listing.
 */
import { head, field } from "./inspectors/ui.js";

// Filled by main.js at startup (scene cards register here), so this module
// does not have to know every card.
export const BY_TYPE = {};

function plain(node) {
  const el = document.createElement("div");
  el.className = "card";
  el.append(head(node.type, node.label));
  for (const [k, v] of Object.entries(node.data || {})) el.append(field(k, typeof v === "object" ? JSON.stringify(v) : String(v)));
  return el;
}

export function mountInspector(element, state) {
  let lastExtra = {};
  function redraw(n, extra = {}) {
    element.replaceChildren();
    let card;
    if (!n) {
      card = document.createElement("div");
      card.innerHTML = `<h2>Inspector</h2><p class="empty">Nothing selected. Pick something in the Scene tree or the viewport.</p>`;
    } else card = (BY_TYPE[n.type] || plain)(n, state);
    element.append(card);
    if (extra.message) {
      const m = document.createElement("p");
      m.className = "msg " + (extra.kind || "ok");
      m.dataset.role = "confirmation";
      m.textContent = extra.message;
      card.prepend(m);
    }
  }
  const offs = [
    state.on("selection", (n, extra) => { lastExtra = extra || {}; redraw(n, lastExtra); }),
    // The card follows the scene: a vertex dragged in the viewport must show
    // its new coordinates. A card that is being typed into skips the echo.
    state.on("scene", ({ origin }) => { if (origin !== "inspector" && state.selection) redraw(state.selection, lastExtra); }),
    state.on("sim", () => { if (state.selection?.type === "sim") redraw(state.selection, lastExtra); }),
  ];
  redraw(state.selection);
  return { dispose: () => offs.forEach((f) => f()) };
}
