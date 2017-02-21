importScripts('serviceworker-cache-polyfill.js');

var CACHE_NAME = 'hue-speech';

// File want to cache
var urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './src/assets/icons/icon-48.png',
  './src/assets/icons/icon-96.png',
  './src/assets/icons/icon-144.png',
  './src/assets/icons/icon-152.png',
  './src/assets/icons/icon-196.png',
  './src/assets/icons/icon-384.png',
  './serviceworker-cache-polyfill.js',
  './dist/build.js',
];


// Set the callback for the install step
self.addEventListener('oninstall', function (e) {
  console.log('[serviceWorker]: Installing...');
  // perform install steps
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('[serviceWorker]: Cache All');
        return cache.addAll(urlsToCache);
      })
      .then(function () {
        console.log('[serviceWorker]: Intalled And Skip Waiting on Install');
        return self.skipWaiting();
      })
  );
});


self.addEventListener('onfetch', function (e) {

  console.log('[serviceWorker]: Fetching ' + e.request.url);
  var raceUrl = 'API/';
  if(e.request.url.indexOf(raceUrl) > -1){
    e.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return fetch(e.request).then(function (res) {
          cache.put(e.request.url, res.clone());
          return res;
        }).catch(err => {
          console.log('[serviceWorker]: Fetch Error ' + err);
        });
      })
    );
  }

  else if (e.request.url.indexOf('src/assets/img-content') > -1) {
    e.respondWith(
      caches.match(e.request).then(function (res) {

        if(res) return res

        return fetch(e.request.clone(), { mode: 'no-cors' }).then(function (newRes) {

          if(!newRes || newRes.status !== 200 || newRes.type !== 'basic') {
            return newRes;
          }

          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(e.request, newRes.clone());
          }).catch(err => {
            console.log('[serviceWorker]: Fetch Error ' + err);
          });

          return newRes;
        });

      })
    );
  }

  else {
    e.respondWith(
      caches.match(e.request).then(function (res) {
        return res || fetch(e.request)
      })
    );
  }

});


self.addEventListener('onactivate', function (e) {

  console.log('[serviceWorker]: Actived');

  var whiteList = ['simple-pwa-v2'];

  e.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (whiteList.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(function () {
      console.log('[serviceWorker]: Clients Claims');
      return self.clients.claim();
    })
  );
});
