// change to the version you get from `npm ls workbox-build`
importScripts('workbox-v4.3.1/workbox-sw.js');
self.addEventListener('push', event => {
    console.log(`Push received with data "${event.data.text()}"`);
  
    const title = 'Push Notification';
    const options = {
      body: `${event.data.text()}`,
      data: { href: '/users/donald' },
      actions: [
        { action: 'details', title: 'Details' },
        { action: 'dismiss', title: 'Dismiss' },
      ],
    };
  
    event.waitUntil(self.registration.showNotification(title, options));
  });
  self.addEventListener('message', function (evt) {
    self.registration.showNotification(evt.data);
  })
 

// the precache manifest will be injected into the following line
self.workbox.precaching.precacheAndRoute([]);