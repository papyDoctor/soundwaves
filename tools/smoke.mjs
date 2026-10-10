// Smoke harness: open the app in headless Chromium through the DevTools
// protocol, collect console messages and exceptions, evaluate expressions,
// optionally save a screenshot. No dependency beyond Node 22+.
//
//   node tools/smoke.mjs <url> <seconds> [expr ...]
//   SHOT=out.png node tools/smoke.mjs http://127.0.0.1:8080/ 5 "sw.state.sceneName"
//   BROWSER=/path/to/chrome ...   (default: Brave, then Chrome)
import { spawn } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";

const [url, secs = "5", ...exprs] = process.argv.slice(2);
if (!url) { console.error("usage: node tools/smoke.mjs <url> <seconds> [expr ...]"); process.exit(2); }
const CANDIDATES = [
  process.env.BROWSER,
  "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
].filter(Boolean);
const BROWSER = CANDIDATES.find((p) => existsSync(p));
if (!BROWSER) { console.error("no Chromium found; set BROWSER"); process.exit(2); }
const PORT = 9333 + Math.floor(Math.random() * 100);
const profile = `${process.env.TMPDIR || "/tmp"}/sw-smoke-${process.pid}`;
const chrome = spawn(BROWSER, [
  "--headless=new", "--no-first-run", "--no-default-browser-check", "--hide-scrollbars",
  // Software WebGL2, so the field renderer runs without a GPU.
  "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist",
  `--user-data-dir=${profile}`, `--remote-debugging-port=${PORT}`,
  "--window-size=1400,900", "about:blank",
], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

try {
  let targets = null;
  for (let i = 0; i < 50 && !targets; i++) {
    await sleep(200);
    try { targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json(); } catch {}
  }
  if (!targets) throw new Error("browser did not start");
  const page = targets.find((t) => t.type === "page");
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  let id = 0; const waiting = new Map();
  const send = (method, params = {}) => new Promise((r) => { waiting.set(++id, r); ws.send(JSON.stringify({ id, method, params })); });
  const fmt = (a) => (a.value !== undefined ? String(a.value) : a.description || a.type);
  ws.onmessage = (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && waiting.has(m.id)) { waiting.get(m.id)(m.result || m.error); waiting.delete(m.id); return; }
    if (m.method === "Runtime.consoleAPICalled") console.log(`[console.${m.params.type}]`, m.params.args.map(fmt).join(" "));
    if (m.method === "Runtime.exceptionThrown") { const d = m.params.exceptionDetails; console.log("[exception]", d.text, d.exception?.description || "", d.url || "", d.lineNumber ?? ""); }
    if (m.method === "Log.entryAdded" && !/favicon/.test(m.params.entry.text)) console.log(`[log.${m.params.entry.level}]`, m.params.entry.text, m.params.entry.url || "");
  };
  await send("Runtime.enable"); await send("Log.enable"); await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: 1400, height: 900, deviceScaleFactor: 1, mobile: false });
  await send("Page.navigate", { url });
  await sleep(Number(secs) * 1000);
  for (const e of exprs) {
    // "click:x,y" and "drag:x1,y1,x2,y2" send real mouse events at page coordinates.
    const click = /^click:(-?[\d.]+),(-?[\d.]+)$/.exec(e), drag = /^drag:(-?[\d.]+),(-?[\d.]+),(-?[\d.]+),(-?[\d.]+)$/.exec(e);
    if (click || drag) {
      const [x1, y1] = (click || drag).slice(1, 3).map(Number);
      await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: x1, y: y1 });
      await send("Input.dispatchMouseEvent", { type: "mousePressed", x: x1, y: y1, button: "left", clickCount: 1 });
      if (drag) {
        const [x2, y2] = drag.slice(3, 5).map(Number);
        for (let i = 1; i <= 5; i++) await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: x1 + (x2 - x1) * i / 5, y: y1 + (y2 - y1) * i / 5, button: "left" });
        await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: x2, y: y2, button: "left", clickCount: 1 });
      } else await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: x1, y: y1, button: "left", clickCount: 1 });
      await sleep(100);
      console.log(`[mouse] ${e}`);
      continue;
    }
    const r = await send("Runtime.evaluate", { expression: e, awaitPromise: true, returnByValue: true });
    console.log(`[eval] ${e.length > 120 ? e.slice(0, 117) + "..." : e}\n  =>`, r.exceptionDetails ? "EXCEPTION " + (r.exceptionDetails.exception?.description || r.exceptionDetails.text) : JSON.stringify(r.result?.value));
  }
  if (process.env.SHOT) {
    const r = await send("Page.captureScreenshot", { format: "png" });
    await writeFile(process.env.SHOT, Buffer.from(r.data, "base64"));
    console.log(`[screenshot] ${process.env.SHOT}`);
  }
  ws.close();
} finally {
  chrome.kill();
}
