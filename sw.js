// Rep Log service worker.
// BUMP THIS on every deploy — manual Netlify drag-drop has no build step to do it.
const CACHE = 'replog-v5';

const PRECACHE = ['./', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Navigations are network-first so a forgotten CACHE bump can never
  // strand users on a stale app; cache is the offline fallback only.
  if (req.mode === 'navigate') {
    e.respondWith(networkFirstNav(req));
  } else if (url.origin === location.origin) {
    e.respondWith(cacheFirst(req));
  } else if (url.hostname === 'fonts.googleapis.com') {
    e.respondWith(staleWhileRevalidate(req)); // CSS varies by UA
  } else if (url.hostname === 'fonts.gstatic.com') {
    e.respondWith(cacheFirst(req)); // immutable hashed font files
  }
});

function fetchWithTimeout(req, ms) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('sw fetch timeout')), ms);
    fetch(req).then(
      r => { clearTimeout(t); resolve(r); },
      err => { clearTimeout(t); reject(err); }
    );
  });
}

async function networkFirstNav(req) {
  const cache = await caches.open(CACHE);
  try {
    const res = await fetchWithTimeout(req, 3000);
    if (res && res.ok) cache.put('./', res.clone());
    return res;
  } catch (err) {
    const hit = await cache.match('./');
    if (hit) return hit;
    throw err;
  }
}

async function cacheFirst(req) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
  return res;
}

async function staleWhileRevalidate(req) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(req);
  const refresh = fetch(req)
    .then(res => {
      if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
      return res;
    })
    .catch(() => hit);
  return hit || refresh;
}
