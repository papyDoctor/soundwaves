/*
 * A question to the user, in the page: a title, a text, buttons. Resolves to
 * the value of the chosen button; Escape is the last button ("Cancel" by
 * convention), Enter the primary one. No browser confirm(): it only says yes
 * or no, and it blocks everything.
 *
 * `content` (an element) mounts under the text; `check(value)` returns "" to
 * close, or a refusal to show — the question stays open.
 */
export function ask({ title, text, buttons, content = null, check = null }) {
  return new Promise((resolve) => {
    const backdrop = document.createElement("div");
    backdrop.className = "dialog-backdrop";
    backdrop.innerHTML = `<div class="dialog" role="dialog" aria-modal="true"><h3></h3><p></p><div class="dialog-actions"></div></div>`;
    backdrop.querySelector("h3").textContent = title;
    backdrop.querySelector("p").textContent = text;
    const actions = backdrop.querySelector(".dialog-actions");
    const refusal = document.createElement("p"); refusal.className = "msg error"; refusal.hidden = true;
    if (content) actions.before(content);
    actions.before(refusal);
    const attempt = (v) => {
      const r = check ? check(v) : "";
      if (r) { refusal.textContent = r; refusal.hidden = false; return; }
      finish(v);
    };
    const finish = (v) => { document.removeEventListener("keydown", onKey, true); backdrop.remove(); resolve(v); };
    let primary = null;
    for (const b of buttons) {
      const el = document.createElement("button");
      el.type = "button";
      el.className = "button" + (b.primary ? " primary" : "") + (b.danger ? " danger" : "");
      el.textContent = b.label;
      el.dataset.value = b.value;
      el.addEventListener("click", () => (b.primary ? attempt(b.value) : finish(b.value)));
      actions.append(el);
      if (b.primary) primary = b;
    }
    const onKey = (e) => {
      if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); finish(buttons.at(-1).value); }
      else if (e.key === "Enter" && primary) { e.preventDefault(); e.stopPropagation(); attempt(primary.value); }
    };
    document.addEventListener("keydown", onKey, true);
    document.body.append(backdrop);
    actions.querySelector(".primary")?.focus();
  });
}

/**
 * A destructive button takes two clicks: the first arms it (red for 4 s),
 * the second does it. Returns the button.
 */
export function armed(button, action) {
  let timer = null;
  const disarm = () => { button.classList.remove("armed"); button.textContent = button.dataset.label; timer = null; };
  button.dataset.label = button.textContent;
  button.addEventListener("click", () => {
    if (timer) { clearTimeout(timer); disarm(); action(); return; }
    button.classList.add("armed");
    button.textContent = "Sure?";
    timer = setTimeout(disarm, 4000);
  });
  return button;
}
