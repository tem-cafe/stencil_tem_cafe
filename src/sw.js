importScripts('workbox-v4.3.1/workbox-sw.js');
var temCafe
setInterval(() => {
  getTemCafe()
}, 3600000000);
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
function send_message_to_sw(msg){
  const title = 'Push Notification';
  const options = {
    body: `${msg}`,
    data: { href: '/users/donald' },
    actions: [
      { action: 'details', title: 'Details' },
      { action: 'dismiss', title: 'Dismiss' },
    ],
  };

  self.registration.showNotification(title, options);
}
async function getTemCafe() {
  
  var temCafeNow = await(await fetch("https://api-tem-cafe.herokuapp.com/tem-cafe", { "credentials": "omit", "headers": { "accept": "application/json", "content-type": "application/json", "sec-fetch-mode": "cors" }, "referrer": "http://127.0.0.1:8080/", "referrerPolicy": "no-referrer-when-downgrade", "body": null, "method": "GET", "mode": "cors" })).json()
  if(!!temCafe && temCafe.temCafe != temCafeNow.temCafe && temCafe.temCafe){
    send_message_to_sw("Alou CAFÉ")
  }
  if(!!temCafe && temCafe.temCafe != temCafeNow.temCafe && !temCafe.temCafe){
    // send_message_to_sw("Alou TEM CAFÉ")
  }
  
    temCafe = temCafeNow
  
}
// the precache manifest will be injected into the following line
self.workbox.precaching.precacheAndRoute([]);