importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');

const wb = workbox;

// wb.setConfig({
// 	debug: true
// });

const { registerRoute, setDefaultHandler } = wb.routing;
const { CacheFirst, NetworkFirst, StaleWhileRevalidate, NetworkOnly } = wb.strategies;
const { precacheAndRoute } = wb.precaching;
const { ExpirationPlugin } = wb.expiration;
const { CacheableResponsePlugin } = wb.cacheableResponse;

precacheAndRoute(self.__WB_MANIFEST);

// ******************************
// Strategies
// ******************************

// We are ~~~pre-caching~~~ client.js, fonts, client.css, and the web manifest

// Use a Network-First approach for the index.html file, but still precache in-case the use is offline
registerRoute(
	self.location.origin + '/',
	new NetworkOnly({
		cacheName: 'updated'
	})
);

// Use Network-First for the window-sw that registers the service worker
registerRoute(
	new RegExp(/(?=window-sw).*\.(?:js|css)$/),
	new NetworkFirst({
		cacheName: 'updated',
		plugins: [
			new ExpirationPlugin({
				maxEntries: 50,
				maxAgeSeconds: 24 * 60 * 60 * 7 // 1 Week
			})
		]
	})
);

// Cache images and icons
registerRoute(
	new RegExp(/.(png|jpg|jpeg|ico)$/),
	new CacheFirst({
		cacheName: 'images',
		plugins: [
			new ExpirationPlugin({
				maxEntries: 50,
				maxAgeSeconds: 24 * 60 * 60 * 7 // 1 Week
			})
		]
	})
);

// Page files serve from Cache then prompt when an update is available
registerRoute(
	new RegExp(/^(?!client.*)(?!window-sw.*).*\.(?:js|css)$/),
	new NetworkFirst({
		cacheName: 'pages',
		plugins: [
			new ExpirationPlugin({
				maxEntries: 50,
				maxAgeSeconds: 24 * 60 * 60 * 7 // 1 Week
			}),
			new CacheableResponsePlugin({
				statuses: [200]
			})
		]
	})
);

// Use Network Only for all other responses
setDefaultHandler(
	new NetworkFirst({
		cacheName: 'default'
	})
);

// ******************************
// Lifecycle Methods
// ******************************

// When it first installs
self.addEventListener('install', () => {
	// When installing, take control of the page immediately
	self.skipWaiting();
});

self.addEventListener('waiting', () => {
	// If stuck waiting for some reason, skip waiting
	self.skipWaiting();
});

self.addEventListener('activate', () => {
	// While activating, skip waiting and take control of the page immediately
	self.skipWaiting();
	self.clients.claim();
});

self.addEventListener('message', () => {
	// This is how we can communicate from the window to the service worker and back
});

self.addEventListener('fetch', event => {
	let request = event.request;

	// Make sure we are not trying to cache POST requests
	if (request.method !== 'GET') {
		return;
	}

	// Avoid some offline errors
	if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
		return;
	}
});

// ******************************
// Events
// ******************************

// Listen for push events
self.addEventListener('push', () => {
	// Does nothing for now... This could be used for notifications
});
