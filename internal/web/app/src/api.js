/*
 * The server's JSON API, in one place: fetch with cookies, JSON in and out,
 * the ETag of what was read sent back as If-Match on a write, and refusals
 * ({error, detail}) turned into an Error with a .status.
 */
async function call(method, path, body, etag) {
  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (etag) headers["If-Match"] = etag;
  const r = await fetch(path, { method, headers, body: body === undefined ? undefined : JSON.stringify(body), credentials: "same-origin" });
  if (r.status === 204) return { data: null, etag: null, status: r.status };
  let data = null;
  try { data = await r.json(); } catch {}
  if (!r.ok) {
    const e = new Error(data?.error || `${r.status} ${r.statusText}`);
    e.status = r.status; e.detail = data?.detail;
    throw e;
  }
  return { data, etag: r.headers.get("ETag"), status: r.status };
}

export const api = {
  get: (path) => call("GET", path),
  post: (path, body) => call("POST", path, body),
  put: (path, body, etag) => call("PUT", path, body, etag),
  del: (path) => call("DELETE", path),
};
