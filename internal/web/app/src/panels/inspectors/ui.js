/* The building blocks of inspector cards: a head, a read-only field, a form
   row. Bare DOM, so each card stays short. */

export function head(type, title) {
  const h = document.createElement("header");
  h.className = "card-head";
  h.innerHTML = `<span class="type"></span><h3></h3>`;
  h.querySelector(".type").textContent = type;
  h.querySelector("h3").textContent = title;
  return h;
}

export function field(name, value) {
  const d = document.createElement("div");
  d.className = "field";
  d.innerHTML = `<span class="name"></span><span class="value"></span>`;
  d.querySelector(".name").textContent = name;
  d.querySelector(".value").textContent = value;
  return d;
}

/** A form row: label + control. `control` is an element; `help` becomes the tooltip. */
export function row(name, control, help = "") {
  const l = document.createElement("label");
  l.className = "row";
  l.innerHTML = `<span class="name"></span>`;
  l.querySelector(".name").textContent = name;
  if (help) l.title = help;
  l.append(control);
  return l;
}

export function number(value, { min, max, step = "any" } = {}) {
  const i = document.createElement("input");
  i.type = "number"; i.value = value;
  if (min !== undefined) i.min = min;
  if (max !== undefined) i.max = max;
  i.step = step;
  return i;
}

export function text(value, placeholder = "") {
  const i = document.createElement("input");
  i.type = "text"; i.value = value ?? ""; i.placeholder = placeholder;
  return i;
}

export function select(value, options) {
  const s = document.createElement("select");
  for (const o of options) {
    const opt = document.createElement("option");
    opt.value = typeof o === "string" ? o : o.value;
    opt.textContent = typeof o === "string" ? o : o.label;
    if (opt.value === String(value)) opt.selected = true;
    s.append(opt);
  }
  return s;
}

export function checkbox(checked) {
  const c = document.createElement("input");
  c.type = "checkbox"; c.checked = !!checked;
  return c;
}

export function button(label, cls = "") {
  const b = document.createElement("button");
  b.type = "button"; b.className = ("button " + cls).trim(); b.textContent = label;
  return b;
}

export function message(txt, kind = "") {
  const p = document.createElement("p");
  p.className = "msg " + kind;
  p.textContent = txt;
  return p;
}

export function note(txt) {
  const p = document.createElement("p");
  p.className = "note";
  p.textContent = txt;
  return p;
}

export function h4(txt) {
  const h = document.createElement("h4");
  h.textContent = txt;
  return h;
}

/** Two numbers side by side (a point). */
export function pair(a, b) {
  const d = document.createElement("span");
  d.className = "pair";
  d.append(a, b);
  return d;
}

/** Format a number for display: 6 significant digits, no trailing zeros. */
export function fmt(x) {
  if (!Number.isFinite(x)) return String(x);
  return String(parseFloat(x.toPrecision(6)));
}
