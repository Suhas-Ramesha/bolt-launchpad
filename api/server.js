import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
/** Static import so Vercel’s bundler traces `dist/server/**` (dynamic `import(path)` often → MODULE_NOT_FOUND). */
import serverHandler from "../dist/server/index.js";

export const config = {
  runtime: "nodejs",
  maxDuration: 60,
};

const HOP_BY_HOP = new Set([
  "connection",
  "keep-alive",
  "transfer-encoding",
  "upgrade",
  "http2-settings",
]);

function firstHeader(val) {
  if (val == null) return "";
  return Array.isArray(val) ? String(val[0]) : String(val);
}

async function readBody(req) {
  if (req.method === "GET" || req.method === "HEAD") return undefined;
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (chunks.length === 0) return undefined;
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (!serverHandler?.fetch) {
    console.error("dist/server default export has no fetch()");
    res.statusCode = 500;
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end("Server misconfiguration");
    return;
  }

  const host = firstHeader(req.headers.host) || "localhost";
  const proto = firstHeader(req.headers["x-forwarded-proto"]) || "https";

  let url;
  try {
    url = new URL(req.url ?? "/", `${proto}://${host}`);
  } catch {
    url = new URL("/", `${proto}://${host}`);
  }

  const rawBody = await readBody(req);

  const inHeaders = new Headers();
  for (const [key, val] of Object.entries(req.headers)) {
    if (val == null) continue;
    if (Array.isArray(val)) {
      for (const v of val) inHeaders.append(key, v);
    } else {
      inHeaders.set(key, val);
    }
  }

  const webRequest = new Request(url, {
    method: req.method,
    headers: inHeaders,
    body: rawBody,
  });

  let response;
  try {
    response = await serverHandler.fetch(webRequest, {}, {});
  } catch (err) {
    console.error("SSR handler.fetch error:", err);
    res.statusCode = 500;
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end("Internal Server Error");
    return;
  }

  const setCookies =
    typeof response.headers.getSetCookie === "function"
      ? response.headers.getSetCookie()
      : [];

  /** @type {Record<string, string | string[]>} */
  const outgoing = {};

  response.headers.forEach((value, key) => {
    const kl = key.toLowerCase();
    if (kl === "set-cookie") return;
    if (HOP_BY_HOP.has(kl)) return;
    outgoing[key] = value;
  });

  if (setCookies.length === 1) {
    outgoing["Set-Cookie"] = setCookies[0];
  } else if (setCookies.length > 1) {
    outgoing["Set-Cookie"] = setCookies;
  }

  try {
    res.writeHead(response.status || 200, outgoing);

    if (response.body) {
      await pipeline(Readable.fromWeb(response.body), res);
    } else {
      res.end();
    }
  } catch (err) {
    console.error("Response pipeline error:", err);
    if (!res.headersSent) {
      res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    }
    try {
      res.end("Internal Server Error");
    } catch {
      /* ignore */
    }
  }
}
