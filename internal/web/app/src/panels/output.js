/*
 * The Output panel: what the workshop has to say that does not fit on one
 * line — mesh statistics, the time step, warnings, errors with a "go to
 * line" button. Entries stack, newest first; 30 at most.
 *
 * state.output.add({ title, kind, body: [Node] }) — kind: "ok" | "error" | "warning" | "".
 */
export function mountOutput(element, state) {
  element.classList.add("output-panel");
  element.innerHTML = `<div class="output-head"><h2>Output</h2><button type="button" class="button small quiet" data-role="clear">clear</button></div>
    <div class="output-list" data-role="list"><p class="empty">Nothing yet.</p></div>`;
  const list = element.querySelector('[data-role="list"]');
  // Entries live in state: a panel closed then reopened finds them again.
  state.outputEntries ??= [];
  function draw() {
    if (!state.outputEntries.length) { list.innerHTML = `<p class="empty">Nothing yet.</p>`; return; }
    list.replaceChildren(...state.outputEntries.map((e) => e.node));
  }
  element.querySelector('[data-role="clear"]').addEventListener("click", () => { state.outputEntries.length = 0; draw(); });
  const off = state.on("output", draw);
  draw();
  return { dispose: off };
}

// The API, set on state by main.js: add an entry, tell the panel.
export function output(state) {
  const add = ({ title, kind = "", body = [] }) => {
    state.outputEntries ??= [];
    const art = document.createElement("article");
    art.className = "output-entry " + kind;
    art.dataset.role = "entry";
    const h = document.createElement("header");
    const when = document.createElement("time");
    when.textContent = new Date().toLocaleTimeString();
    const t = document.createElement("strong");
    t.textContent = title;
    h.append(when, " ", t);
    art.append(h, ...body.map((b) => (typeof b === "string" ? para(b) : b)));
    state.outputEntries.unshift({ node: art });
    state.outputEntries.length = Math.min(state.outputEntries.length, 30);
    state.emit("output");
    return art;
  };
  const para = (txt) => { const p = document.createElement("p"); p.textContent = txt; return p; };
  return {
    add,
    info: (title, ...lines) => add({ title, body: lines }),
    ok: (title, ...lines) => add({ title, kind: "ok", body: lines }),
    warn: (title, ...lines) => add({ title, kind: "warning", body: lines }),
    error: (title, ...lines) => add({ title, kind: "error", body: lines }),
    /** A key/value table, monospace. */
    table(rows) {
      const t = document.createElement("table");
      for (const [k, v] of rows) {
        const tr = document.createElement("tr");
        const a = document.createElement("td"), b = document.createElement("td");
        a.textContent = k; b.textContent = v;
        tr.append(a, b); t.append(tr);
      }
      return t;
    },
    /** A button that jumps to a line of the scene text. */
    lineLink(line, label = `line ${line}`) {
      const b = document.createElement("button");
      b.type = "button"; b.className = "line-link"; b.textContent = label;
      b.addEventListener("click", () => state.emit("goto-line", line));
      return b;
    },
  };
}
