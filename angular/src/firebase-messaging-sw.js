importScripts('/__/firebase/9.4.1/firebase-app-compat.js');
importScripts('/__/firebase/9.4.1/firebase-messaging-compat.js');
// Add "?useEmulator=true" to the URL for emulator mode
importScripts('/__/firebase/init.js');

var isSupported = firebase.messaging.isSupported();
if (isSupported) {
  var fcm = firebase.messaging();
  fcm.onBackgroundMessage(handleMessage);
}

function handleMessage(message) {
  var title = message.notification.title,
    body = message.notification.body,
    image = message.notification.image;
  self.registration.showNotification(title, { body: body, icon: image || '/assets/icons/icon-72x72.png' });
}
