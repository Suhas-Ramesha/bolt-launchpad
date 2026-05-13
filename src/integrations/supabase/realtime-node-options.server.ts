import ws from "ws";

/**
 * Node.js before v22 has no global WebSocket; @supabase/realtime-js needs the `ws` transport.
 * Browser and Node 22+ use the default (native WebSocket). Import only from server bundles.
 */
export function supabaseRealtimeOptionsForNodeRuntime():
  | { realtime: { transport: typeof ws } }
  | Record<string, never> {
  if (typeof globalThis.WebSocket === "function") return {};
  if (typeof process === "undefined" || typeof process.versions?.node !== "string") return {};
  return { realtime: { transport: ws } };
}
