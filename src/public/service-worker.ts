// public/service-worker.ts

import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';

// Cache HTML files with a network-first strategy
registerRoute(
  ({ request }) => request.destination === 'document',
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

// Cache CSS, JS, and image files with cache-first strategy
registerRoute(
  ({ request }) => request.destination === 'style' || request.destination === 'script',
  new CacheFirst({
    cacheName: 'assets-cache',
    plugins: [
      // Customize caching rules here
    ],
  })
);

registerRoute(
  ({ request }) => request.destination === 'image',
  new StaleWhileRevalidate({
    cacheName: 'image-cache',
  })
);
