import { Workbox } from 'workbox-window';

if ('serviceWorker' in navigator) {
	const swName = '/sw.js';
	const wb = new Workbox(swName);

	// ******************************
	// Lifecycle Methods
	// ******************************

	wb.addEventListener('installed', event => {
		if (!event.isUpdate) {
			// First-installed code goes here...
		}
	});

	wb.addEventListener('activated', event => {
		if (!event.isUpdate) {
			// First time installing
		}
	});

	wb.addEventListener('waiting', () => {
		// A new service worker is waiting (Shouldn't happen)
	});

	wb.addEventListener('controlling', () => {
		// A new service worker took control of the page (update!)
	});

	wb.addEventListener('message', () => {
		// This is how we can communicate from the window to the service worker and back
	});

	// External service workers on other pages
	wb.addEventListener('externalinstalled', () => {
		// Another service worker is attempting to install
	});

	wb.addEventListener('externalwaiting', () => {
		// Another service worker is stuck waiting, probably because it needs this tab to close before activating
		window.refresh();
	});

	wb.addEventListener('externalactivated', () => {
		// If an updated service worker is activating and the page didn't refresh, the page will be broken so refresh
		window.refresh();
	});

	window.addEventListener('load', function() {
		wb.register()
			.then(registration => {
				registration.addEventListener('updatefound', () => {
					// A wild service worker has appeared in reg.installing!
				});
			})
			.catch(err => {
				// The service worker failed to register
			});
	});
}
