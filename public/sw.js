// Service Worker para PWA do Protocolo Intestinal Vital 4F
const CACHE_NAME = 'piv4f-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/piv4f-logo.png',
  '/pivlogo-solo.png',
  '/assets/index.css',
  '/assets/index.js'
];

// Instalação do service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Ativação e limpeza de caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => {
          return cacheName !== CACHE_NAME;
        }).map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Estratégia de cache: network first, falling back to cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Armazenar em cache a resposta fresh
        if (event.request.method === 'GET') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
        }
        return response;
      })
      .catch(() => {
        // Se falhar, tentar buscar do cache
        return caches.match(event.request);
      })
  );
});

// Sincronização em background quando online novamente
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    // Implementar lógica de sincronização quando necessário
    console.log('Sincronizando dados...');
  }
});
