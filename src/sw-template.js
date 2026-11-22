/* One Stop Insurance — service worker (generated at build time from src/sw-template.js)
 * Strategy:
 *  - Precache informational pages (all languages) + hashed assets + icons.
 *  - Pages (navigations): network-first, falling back to cache when offline.
 *  - Hashed JS/CSS: cache-first (file names change on every release).
 *  - Other same-origin static files: stale-while-revalidate.
 *  - Google Fonts: stale-while-revalidate in a separate cache.
 *  - Never touches other cross-origin requests (WhatsApp, Google Maps, tel: links).
 *  - New versions install silently (skipWaiting + clients.claim); old caches are deleted.
 */
const VERSION = '__VERSION__';
const BASE = '__BASE__';
const LANGS = __LANGS__;
const PRECACHE = `osi-precache-${VERSION}`;
const RUNTIME = `osi-runtime-${VERSION}`;
const FONTS = 'osi-fonts-v1';
const PRECACHE_URLS = __PRECACHE__;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(PRECACHE)
      .then((cache) =>
        Promise.all(
          PRECACHE_URLS.map((url) =>
            cache.add(new Request(url, { cache: 'reload' })).catch(() => {
              /* skip a file that failed; the rest of the cache still works */
            }),
          ),
        ),
      )
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('osi-') && k !== PRECACHE && k !== RUNTIME && k !== FONTS).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

function langHome(url) {
  const rest = url.pathname.slice(BASE.length).split('/')[0];
  return BASE + (LANGS.includes(rest) ? rest : 'en') + '/';
}

async function networkFirst(request) {
  const cache = await caches.open(RUNTIME);
  try {
    const response = await fetch(request);
    if (response.ok && response.type === 'basic') cache.put(request, response.clone());
    return response;
  } catch (err) {
    const cached = (await caches.match(request, { ignoreSearch: true })) || (await caches.match(langHome(new URL(request.url))));
    if (cached) return cached;
    throw err;
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) (await caches.open(RUNTIME)).put(request, response.clone());
  return response;
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((response) => {
      if (response.ok || response.type === 'opaque') cache.put(request, response.clone());
      return response;
    })
    .catch(() => cached);
  return cached || network;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  if (url.origin === self.location.origin) {
    if (!url.pathname.startsWith(BASE)) return;
    if (request.mode === 'navigate') return event.respondWith(networkFirst(request));
    if (url.pathname.startsWith(BASE + 'assets/')) return event.respondWith(cacheFirst(request));
    if (url.pathname.endsWith('/sw.js')) return;
    return event.respondWith(staleWhileRevalidate(request, RUNTIME));
  }

  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    return event.respondWith(staleWhileRevalidate(request, FONTS));
  }
  // Everything else (wa.me, Google Maps, etc.) goes straight to the network and is never cached.
});
