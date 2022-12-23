'use strict'

/**
 * https://github.com/shadowwalker/next-pwa
 * https://developer.chrome.com/docs/workbox/reference/workbox-build/#type-RuntimeCaching
 * https://developer.chrome.com/docs/workbox/reference/workbox-strategies/
 * https://developer.chrome.com/docs/workbox/caching-strategies-overview/#network-first-falling-back-to-cache
 * https://developer.chrome.com/docs/workbox/caching-strategies-overview/#network-only
 * https://developer.chrome.com/docs/workbox/caching-strategies-overview/#stale-while-revalidate
 */
module.exports = [
  {
    urlPattern: /\/api\/.*$/i,
    handler: 'NetworkOnly',
    method: 'GET',
  },
  {
    urlPattern: /api\..*expertsession/i,
    handler: 'NetworkFirst',
    method: 'GET',
    options: {
      cacheName: 'apis',
      expiration: {
        maxEntries: 16,
        maxAgeSeconds: 24 * 60 * 60, // 24 hours
      },
      networkTimeoutSeconds: 10, // fall back to cache if api does not response within 10 seconds
    },
  },
  {
    urlPattern: /api\..*expertsession/i,
    handler: 'NetworkFirst',
    method: 'POST',
    options: {
      cacheName: 'apis',
      expiration: {
        maxEntries: 16,
        maxAgeSeconds: 24 * 60 * 60, // 24 hours
      },
      networkTimeoutSeconds: 10, // fall back to cache if api does not response within 10 seconds
    },
  },
  {
    urlPattern: /checkout.json/i,
    handler: 'NetworkOnly',
  },
  {
    urlPattern: /\.(?:json|xml|csv)$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'static-data-assets',
      expiration: {
        maxEntries: 16,
        maxAgeSeconds: 24 * 60 * 60, // 24 hours
      },
    },
  },
  {
    urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
    handler: 'CacheFirst',
    options: {
      cacheName: 'google-fonts',
      expiration: {
        maxEntries: 4,
        maxAgeSeconds: 365 * 24 * 60 * 60, // 365 days
      },
    },
  },
  {
    urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'static-font-assets',
      expiration: {
        maxEntries: 4,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
      },
    },
  },
  {
    urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'static-image-assets',
      expiration: {
        maxEntries: 64,
        maxAgeSeconds: 24 * 60 * 60, // 24 hours
      },
    },
  },
  {
    urlPattern: /\.(?:js)$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'static-js-assets',
      expiration: {
        maxEntries: 16,
        maxAgeSeconds: 24 * 60 * 60, // 24 hours
      },
    },
  },
  {
    urlPattern: /\.(?:css|less)$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'static-style-assets',
      expiration: {
        maxEntries: 16,
        maxAgeSeconds: 24 * 60 * 60, // 24 hours
      },
    },
  },
]
