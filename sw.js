const CACHE = "le-ge-bday-v3";
const ASSETS = ["/le-ge-birthday/", "/le-ge-birthday/index.html", "/le-ge-birthday/manifest.json"];

self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  e.waitUntil(clients.claim());
});

self.addEventListener("fetch", e => {
  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
  } else {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
  }
});