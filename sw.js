const CACHE = "le-ge-bday-v1";
const ASSETS = ["/le-ge-birthday/", "/le-ge-birthday/index.html", "/le-ge-birthday/manifest.json"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
