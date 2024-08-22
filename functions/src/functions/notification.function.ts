import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';
// import { Profile } from '../models/profile.model';
// import { Chat } from '../models/chat.model';

// const TOPIC = 'chats';

// TODO: FCM - Subscribe user to chat topic when they set their notification token
// eslint-disable-next-line camelcase
export const onUpdate_User_Subscribe = functions.firestore.document('users/{uid}')
  .onUpdate(async change => {
    // const user = change.before.data() as Profile;
    // const newUser = change.after.data() as Profile;

    // if (!user.notificationToken && newUser.notificationToken) {
    //   // Adding Token
    //   return admin.messaging().subscribeToTopic(newUser.notificationToken, TOPIC);
    // } else if (user.notificationToken && !newUser.notificationToken) {
    //   // Removing Token
    //   return admin.messaging().unsubscribeFromTopic(user.notificationToken, TOPIC);
    // }

    return Promise.resolve();
  });

// TODO: FCM - Send notification when chat message is written
// eslint-disable-next-line camelcase
export const onCreate_Chat_Notify = functions.firestore.document('chats/{chatId}')
  .onCreate(async snapshot => {
    // const chat = await snapshot.data() as Chat;

    // return admin.messaging().send({
    //   topic: TOPIC,
    //   notification: {
    //     title: `New Chat Message from ${chat.displayName}`,
    //     body: chat.contentText,
    //   },
    //   // webpush: {
    //   //   fcmOptions: {
    //   //     link: '',
    //   //   },
    //   // },
    // });
  });
