importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.precaching.precacheAndRoute([{
    url: "/",
    version: '1'
  },
  {
    url: "/index.html",
    version: '1'
  },
  {
    url: "/detail.html",
    version: '1'
  },
  {
    url: "/nav.html",
    version: '1'
  },
  {
    url: "/team.html",
    version: '1'
  },
  {
    url: "/manifest.json",
    version: '1'
  },
  {
    url: "/package.json",
    version: '1'
  },
  {
    url: "/push.js",
    version: '1'
  },
  {
    url: "/service-worker.js",
    version: '1'
  },
  {
    url: "/pages/home.html",
    version: '1'
  },
  {
    url: "/pages/contact.html",
    version: '1'
  },
  {
    url: "/pages/about.html",
    version: '1'
  },
  {
    url: "/pages/myfavorite.html",
    version: '1'
  },
  {
    url: "/js/nav.js",
    version: '1'
  },
  {
    url: "/js/api.js",
    version: '1'
  },
  {
    url: "/js/materialize.min.js",
    version: '1'
  },
  {
    url: "/js/bolaku_db.js",
    version: '1'
  },
  {
    url: "/js/idb/lib/idb.js",
    version: '1'
  },
  {
    url: "/js/idb/lib/node.js",
    version: '1'
  },
  {
    url: "/js/listLeague.js",
    version: '1'
  },
  {
    url: "/js/detailLeague.js",
    version: '1'
  },
  {
    url: "/js/team.js",
    version: '1'
  },
  {
    url: "/js/favoriteTeams.js",
    version: '1'
  },
  {
    url: "/js/cek_sw.js",
    version: '1'
  },
  {
    url: "/css/materialize.min.css",
    version: '1'
  },
  {
    url: "/css/style.css",
    version: '1'
  },
  {
    url: "/css/style.css.map",
    version: '1'
  },
  {
    url: "/css/style.scss",
    version: '1'
  },
  {
    url: "/favicon-32x32.png",
    version: '1'
  },
  {
    url: "/logo.png",
    version: '1'
  },
  {
    url: "/logo72.png",
    version: '1'
  },
  {
    url: "/logo96.png",
    version: '1'
  },
  {
    url: "/logo128.png",
    version: '1'
  },
  {
    url: "/logo144.png",
    version: '1'
  },
  {
    url: "/logo192.png",
    version: '1'
  },
  {
    url: "/logo256.png",
    version: '1'
  },
  {
    url: "/logo384.png",
    version: '1'
  },
  {
    url: "/logo512.png",
    version: '1'
  },
  {
    url: "/img/profile.jpg",
    version: '1'
  },
  {
    url: "/img/2002.png",
    version: '1'
  },
  {
    url: "/img/2003.png",
    version: '1'
  },
  {
    url: "/img/2014.png",
    version: '1'
  },
  {
    url: "/img/2015.png",
    version: '1'
  },
  {
    url: "/img/2019.png",
    version: '1'
  },
  {
    url: "/img/2021.png",
    version: '1'
  },
  {
    url: "/img/linkedin.png",
    version: '1'
  },
  {
    url: "/img/instagram.png",
    version: '1'
  },
  {
    url: "https://fonts.googleapis.com/icon?family=Material+Icons",
    version: '1'
  },
  {
    url: "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@1,600&display=swap",
    version: '1'
  },
  {
    url: "https://use.fontawesome.com/releases/v5.13.1/js/all.js",
    version: '1'
  },
  {
    url: "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
    version: '1'
  },
  {
    url: "https://fonts.gstatic.com/s/opensans/v18/memnYaGs126MiZpBA-UFUKXGUdhmIqOjjg.woff2",
    version: '1'
  },
  {
    url: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css",
    version: '1'
  },
]);

self.addEventListener("install", function (event) {
  const urls = ['/offline.html'];
  const cacheName = workbox.core.cacheNames.runtime;
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(urls);
    })
  );
});

const urls = ['/offline.html'];

workbox.routing.registerRoute(new RegExp('/'),
  async ({
    event
  }) => {
    try {
      return await workbox.strategies.networkFirst({
        cacheName: 'BolaKu',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
          }),
        ],
      }).handle({
        event
      });
    } catch (error) {
      return caches.match(urls);
    }
  }
);

workbox.routing.registerRoute(
  /^https:\/\/api\.football\-data\.org\/v2\//,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'football-data-api',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 120,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  /\.(?:png|jpx|css|svg)$/,
  workbox.strategies.networkFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 25,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);

self.addEventListener('push', function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'img/2002.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  if (!event.action) {
    console.log('Notification Clicked.');
    return;
  }
  switch (event.action) {
    case 'yes-action':
      clients.openWindow('/#myfavorite');
      break;
    case 'no-action':
      break;
    default:
      console.log(`Action yang dipilih tidak dikenal: '${event.action}'`);
      break;
  }
});