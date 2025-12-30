const CACHE_NAME = 'amazon-dark-v3-webapk'; // Version change kiya
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  './term.html'
];

self.addEventListener('install', (e) => {
  self.skipWaiting(); // Force update immediately
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim()); // Control clients immediately
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
