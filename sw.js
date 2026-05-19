const CACHE_NAME = 'workout-tracker-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// Kurulum (Install) aşamasında dosyaları önbelleğe al
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// İnternet yoksa veriyi önbellekten (cache) getir
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache'de varsa onu döndür, yoksa internetten indir
        return response || fetch(event.request);
      })
  );
});