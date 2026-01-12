const CACHE = 'personal-site-v2';
const ASSETS = [
  '/', '/index.html', '/styles.css', '/script.js', '/manifest.json'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => {
    return caches.open(CACHE).then(cache => { cache.put(e.request, res.clone()); return res; });
  }).catch(()=>caches.match('/'))));
});

