// Service Worker for Weather App PWA

const CACHE_NAME = 'weather-app-v1';
const urlsToCache = [
  '/',
  '/assets/images/favicon-32x32.png',
  '/assets/images/logo.svg',
  '/assets/images/icon-search.svg',
  '/assets/images/icon-loading.svg',
  '/assets/images/icon-dropdown.svg'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .catch((error) => console.error('Cache installation failed:', error))
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('api.open-meteo.com') || 
      event.request.url.includes('geocoding-api.open-meteo.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
      .catch(() => caches.match('/'))
  );
});

