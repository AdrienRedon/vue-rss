importScripts('/serviceworker-cache-polyfill.js');

var CACHE_NAME = 'vue-rss';

// File want to cache
var urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/serviceworker-cache-polyfill.js',
  '/dist/build.js',
];


// Set the callback for the install step
self.addEventListener('install', function(event) {
  // perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});


self.addEventListener('fetch', function(event) {

  console.log('[serviceWorker]: Fetching ' + event.request.url);
  var raceUrl = 'api/';
  if(event.request.url.indexOf(raceUrl) > -1){
    event.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return fetch(event.request).then(function (res) {
          cache.put(event.request.url, res.clone());
          return res;
        }).catch(err => {
          console.log('[serviceWorker]: Fetch Error ' + err);
        });
      })
    );
  }

  else if (event.request.url.indexOf('src/assets/img-content') > -1) {
    event.respondWith(
      caches.match(event.request).then(function (res) {

        if(res) return res

        return fetch(event.request.clone(), { mode: 'no-cors' }).then(function (newRes) {

          if(!newRes || newRes.status !== 200 || newRes.type !== 'basic') {
            return newRes;
          }

          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, newRes.clone());
          }).catch(err => {
            console.log('[serviceWorker]: Fetch Error ' + err);
          });

          return newRes;
        });

      })
    );
  }

  else {
    event.respondWith(
      caches.match(event.request).then(function (res) {
        return res || fetch(event.request)
      })
    );
  }

});


self.addEventListener('activate', function(event) {

  console.log('[serviceWorker]: Actived');

  var whiteList = ['vue-rss'];

  event.waitUntil(
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
