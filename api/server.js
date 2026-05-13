import path from "node:path";
import { pathToFileURL } from "node:url";

/** Node.js serverless — Edge cannot load this SSR bundle (uses node:stream, etc.). */
export const config = {
  runtime: "nodejs20.x",
  maxDuration: 60,
};

async function readBody(req) {
  if (req.method === "GET" || req.method === "HEAD") return undefined;
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (chunks.length === 0) return undefined;
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  const entry = pathToFileURL(path.join(process.cwd(), "dist/server/index.js")).href;
  const { default: serverHandler } = await import(entry);

  const host = req.headers.host ?? "localhost";
  const proto = req.headers["x-forwarded-proto"] ?? "https";
  const url = new URL(req.url ?? "/", `${proto}://${host}`);

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

  try {
    const response = await serverHandler.fetch(webRequest, {}, {});

    res.statusCode = response.status;

    const setCookies =
      typeof response.headers.getSetCookie === "function"
        ? response.headers.getSetCookie()
        : null;
    if (setCookies?.length) {
      for (const c of setCookies) res.appendHeader("Set-Cookie", c);
    }

    response.headers.forEach((value, key) => {
      if (key.toLowerCase() === "set-cookie" && setCookies?.length) return;
      res.setHeader(key, value);
    });

    const buf = Buffer.from(await response.arrayBuffer());
    res.end(buf);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end("Internal Server Error");
  }
}
