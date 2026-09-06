// Network-first: every load tries the network first, so a fresh deploy
// shows up on the very next reload. The cache only kicks in as a fallback
// when there's no connection (the actual point of this file — working at
// the store with spotty signal), not as the default source of truth.
// No more manual CACHE_NAME bumping needed on every deploy — freshness now
// comes from always asking the network first, not from cache versioning.
var CACHE_NAME = 'supper-cache';
var ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', function(event){
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){ return cache.addAll(ASSETS); })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){ return k !== CACHE_NAME; }).map(function(k){ return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(event){
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request).then(function(networkResponse){
      caches.open(CACHE_NAME).then(function(cache){ cache.put(event.request, networkResponse.clone()); });
      return networkResponse;
    }).catch(function(){
      return caches.match(event.request);
    })
  );
});
