/* Network-first for pages so a saved copy cannot stick. Hashed files are left alone. */
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const fresh = req.mode === "navigate" || url.pathname === "/version.json" || url.pathname === "/sw.js";
  if (!fresh) return;
  event.respondWith(fetch(req, { cache: "no-store" }));
});
