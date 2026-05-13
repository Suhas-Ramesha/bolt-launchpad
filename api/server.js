export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  // Import the server handler dynamically
  const { default: serverHandler } = await import('../dist/server/index.js');
  
  // Call the Cloudflare-style fetch handler
  return serverHandler.fetch(request, {}, {});
}
