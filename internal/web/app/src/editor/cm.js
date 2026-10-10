/*
 * CodeMirror 6 for the scene text: the only importer of the vendored bundle.
 * Line numbers, undo, search, a stream tokenizer for the `.sw` statements,
 * and a linter that runs the real parser so errors show where they are.
 */
import {
  EditorState, EditorView, keymap, lineNumbers, highlightActiveLine, highlightActiveLineGutter,
  drawSelection, rectangularSelection, StreamLanguage, syntaxHighlighting, HighlightStyle, indentUnit,
  defaultKeymap, history, historyKeymap, indentWithTab, searchKeymap, highlightSelectionMatches,
  linter, lintGutter, tags,
} from "../../vendor/codemirror-20260923.min.mjs";
import { parse, STATEMENTS as STATEMENT_LIST } from "../scene/format.js";

const STATEMENTS = new Set(STATEMENT_LIST);
const WORDS = new Set(["planar", "axisym", "closed", "rigid", "absorb", "impedance", "open", "point", "piston", "m", "cm", "mm"]);

// A line-oriented tokenizer: the first word of a non-indented line is the statement.
const sw = {
  startState: () => ({ first: true }),
  token(stream, st) {
    // A statement keyword starts a statement even on an indented line (the parser agrees).
    if (stream.sol()) st.first = !/^\s/.test(stream.string) || STATEMENTS.has(stream.string.trim().split(/\s+/)[0]);
    if (stream.eatSpace()) return null;
    if (stream.match(/^#.*/)) return "comment";
    if (stream.match(/^@[\w-]+/)) return "labelName";
    if (stream.match(/^[A-Za-z_][\w-]*(?==)/)) { return "propertyName"; }
    if (stream.match(/^=/)) return "operator";
    if (stream.match(/^[-+]?(\d+\.?\d*|\.\d+)([eE][-+]?\d+)?(,[-+]?(\d+\.?\d*|\.\d+)([eE][-+]?\d+)?)?/)) return "number";
    if (stream.match(/^[A-Za-z_][\w-]*/)) {
      const w = stream.current();
      if (st.first) { st.first = false; return STATEMENTS.has(w) ? "keyword" : "invalid"; }
      return WORDS.has(w) ? "atom" : "variableName";
    }
    stream.next();
    return null;
  },
};

const style = HighlightStyle.define([
  { tag: tags.keyword, color: "#c792ea" },
  { tag: tags.atom, color: "#ff9cac" },
  { tag: tags.number, color: "#f78c6c" },
  { tag: tags.comment, color: "#6b7385", fontStyle: "italic" },
  { tag: tags.propertyName, color: "#82aaff" },
  { tag: tags.labelName, color: "#c3e88d" },
  { tag: tags.operator, color: "#89ddff" },
  { tag: tags.variableName, color: "#e4e6ea" },
  { tag: tags.invalid, color: "#ffb4ae", textDecoration: "underline wavy" },
]);

const theme = EditorView.theme({
  "&": { height: "100%", fontSize: "13px", backgroundColor: "var(--bg)", color: "var(--text)" },
  ".cm-scroller": { fontFamily: "var(--mono)", lineHeight: "1.5" },
  ".cm-content": { caretColor: "#fff" },
  ".cm-gutters": { backgroundColor: "var(--bg-2)", color: "#5c6370", border: "none", borderRight: "1px solid var(--line)" },
  ".cm-activeLine": { backgroundColor: "#ffffff08" },
  ".cm-activeLineGutter": { backgroundColor: "#ffffff0d", color: "var(--text)" },
  "&.cm-focused .cm-cursor": { borderLeftColor: "#fff" },
  "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection": { backgroundColor: "#4fa3ff40 !important" },
  ".cm-selectionMatch": { backgroundColor: "#4fa3ff22" },
  ".cm-panels": { backgroundColor: "var(--bg-2)", color: "var(--text)", borderColor: "var(--line)" },
  ".cm-textfield": { backgroundColor: "var(--bg)", color: "var(--text)", border: "1px solid var(--line)" },
  ".cm-button": { backgroundImage: "none", backgroundColor: "var(--bg-3)", color: "var(--text)", border: "1px solid var(--line)" },
  ".cm-tooltip": { backgroundColor: "var(--bg-2)", border: "1px solid var(--line)", color: "var(--text)" },
  ".cm-lintRange-error": { backgroundImage: "none", textDecoration: "underline wavy #e5534b" },
  ".cm-diagnostic-error": { borderLeftColor: "#e5534b" },
}, { dark: true });

// The linter runs the parser on the whole document: errors land on their line.
const lint = linter((view) => {
  const doc = view.state.doc;
  const { errors } = parse(doc.toString());
  return errors.filter((e) => e.line >= 1 && e.line <= doc.lines).map((e) => {
    const l = doc.line(e.line);
    return { from: l.from, to: l.to, severity: "error", message: e.message };
  });
}, { delay: 300 });

export function createEditor(parent, text, { onChange, onApply } = {}) {
  const extensions = [
    lineNumbers(), highlightActiveLineGutter(), history(), drawSelection(), rectangularSelection(),
    indentUnit.of("    "), EditorState.tabSize.of(4), highlightActiveLine(), highlightSelectionMatches(), theme,
    StreamLanguage.define(sw), syntaxHighlighting(style), lint, lintGutter(),
    keymap.of([
      { key: "Mod-Enter", run: () => { onApply?.(); return true; } },
      ...defaultKeymap, ...searchKeymap, ...historyKeymap, indentWithTab,
    ]),
    EditorView.updateListener.of((u) => { if (u.docChanged) onChange?.(); }),
  ];
  return new EditorView({ state: EditorState.create({ doc: text, extensions }), parent });
}

/** Replace the text (after a change elsewhere) and keep the cursor where it can. */
export function replaceText(view, text) {
  if (view.state.doc.toString() === text) return;
  const pos = Math.min(view.state.selection.main.head, text.length);
  view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: text }, selection: { anchor: pos } });
}

export function gotoLine(view, line) {
  const n = Math.max(1, Math.min(line, view.state.doc.lines));
  const l = view.state.doc.line(n);
  view.dispatch({ selection: { anchor: l.from, head: l.to }, scrollIntoView: true });
  view.focus();
}
