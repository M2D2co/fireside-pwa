# Angular PWA

## Setup PWA

$ cd angular
$ ng add @angular/pwa@13

## Test PWA

You'll need to run the emulator to fully test:

  $ npm run serve

  https://localhost:5000
  Run Lighthouse

## Fix Issues

- Add a valid apple-touch-icon
- Note the test is unable to determine "Content is sized correctly for the viewport"
- Icons

## Add an install button

* Colors
* Uncomment service

## Add Notifications

1. Add `AngularFireMessagingModule` from '@angular/fire/compat/messaging'
2. Add button to Enable/Disable Notifications
3. Prompt for browser permissions
4. Store FCM Token on User record
5. Create Function to publish notifications on new chats
6. Create Firebase Messaging Service Worker (add file to 'angular.json')
7. Show in-app notifications when loaded
