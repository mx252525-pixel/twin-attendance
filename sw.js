'use strict';
// Deliberately limited to the launcher shell; no cross-origin requests are handled.
const CACHE_PREFIX = 'twin-attendance-launcher:' + self.registration.scope + ':';
const CACHE_NAME = CACHE_PREFIX + 'v1';
const SHELL = ['index.html', 'style.css', 'app.js', 'logo.svg', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'maskable-512.png', 'apple-touch-icon.png'].map(path => new URL(path, self.registration.scope).href);
const INDEX = new URL('index.html', self.registration.scope).href;

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  const scope = new URL(self.registration.scope);
  if (request.method !== 'GET' || url.origin !== scope.origin || !url.pathname.startsWith(scope.pathname) || url.search) return;
  const rootNavigation = request.mode === 'navigate' && (url.href === scope.href || url.href === INDEX);
  if (!rootNavigation && !SHELL.includes(url.href)) return;
  event.respondWith((async () => {
    const key = rootNavigation ? INDEX : url.href;
    try {
      const response = await fetch(request);
      if (response.ok && response.type === 'basic' && !response.redirected) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(key, response.clone());
      }
      return response;
    } catch (error) {
      const cached = await caches.match(key, { cacheName: CACHE_NAME });
      if (cached) return cached;
      throw error;
    }
  })());
});
