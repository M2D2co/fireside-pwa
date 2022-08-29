importScripts('https://www.gstatic.com/firebasejs/9.4.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.4.1/firebase-messaging-compat.js');

console.log('fcm-sw loaded')

fetch('/firebase.config.json').then(init)

function init(value) {
  console.log('fcm-sw init')
  firebase.initializeApp(value.json());
  console.log('fcm-sw init-app')

  var isSupported = firebase.messaging.isSupported();
  if (isSupported) {
    var fcm = firebase.messaging();
    fcm.onBackgroundMessage(handleMessage);
  }
}

function handleMessage(message) {
  var title = message.notification.title,
    body = message.notification.body,
    image = message.notification.image;
  console.log(title, body);
  self.registration.showNotification(title, { body: body, icon: image || '/assets/icons/icon-72x72.png' });
}
