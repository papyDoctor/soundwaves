/*
 * The scene as text: the `.sw` file in CodeMirror. Typing does not change the
 * scene; Apply (Ctrl/Cmd+Enter) parses and replaces it, so a half-typed line
 * never reaches the engine. Changes made elsewhere (viewport, inspector)
 * rewrite the text, unless it has unsaved edits of its own.
 */
import { createEditor, replaceText, gotoLine } from "../editor/cm.js";
import { parse, serialize } from "../scene/format.js";

export function mountText(element, state) {
  element.classList.add("flush", "bar-panel");
  element.innerHTML = `<div class="panel-bar">
      <button type="button" class="button primary small" data-role="apply" title="Parse the text and make it the scene (Ctrl/Cmd+Enter)">Apply</button>
      <button type="button" class="button small" data-role="revert" title="Throw away the edits and show the current scene again">Revert</button>
      <span class="dot" data-role="dirty" hidden title="The text differs from the scene">●</span>
      <span class="message" data-role="message"></span>
      <span class="space"></span>
      <span class="soft">one statement per line · # comment · indent to continue · @material switches segments</span>
    </div><div class="panel-body" data-role="body"></div>`;
  const body = element.querySelector('[data-role="body"]');
  const dirty = element.querySelector('[data-role="dirty"]');
  const message = element.querySelector('[data-role="message"]');
  let view = null, suppress = false;

  const current = () => (state.scene ? serialize(state.scene) : "");
  const say = (txt, kind = "") => { message.textContent = txt; message.className = "message " + kind; };
  const markDirty = () => { dirty.hidden = !view || view.state.doc.toString() === current(); };

  function apply() {
    if (!view) return;
    const text = view.state.doc.toString();
    const { scene, errors } = parse(text);
    if (errors.length) {
      say(`${errors.length} error${errors.length > 1 ? "s" : ""}: line ${errors[0].line}, ${errors[0].message}`, "error");
      state.output.add({ title: "Scene text has errors", kind: "error", body: errors.map((e) => { const p = document.createElement("p"); p.append(state.output.lineLink(e.line), ` ${e.message}`); return p; }) });
      gotoLine(view, errors[0].line);
      return;
    }
    suppress = true;
    state.replaceScene(scene, { origin: "text" });
    suppress = false;
    say("applied", "ok");
    markDirty();
  }

  function revert() { if (view) { replaceText(view, current()); say(""); markDirty(); } }

  view = createEditor(body, current(), { onChange: () => { markDirty(); if (!dirty.hidden) say(""); }, onApply: apply });
  element.querySelector('[data-role="apply"]').addEventListener("click", apply);
  element.querySelector('[data-role="revert"]').addEventListener("click", revert);

  const offs = [
    state.on("scene", ({ origin }) => {
      if (suppress || origin === "text") { markDirty(); return; }
      // Someone else changed the scene: refresh the text, unless the user is mid-edit.
      if (dirty.hidden) { replaceText(view, current()); say(""); }
      markDirty();
    }),
    state.on("goto-line", (line) => { state.docks?.show("text"); gotoLine(view, line); }),
  ];
  return { dispose: () => { offs.forEach((f) => f()); view.destroy(); } };
}
