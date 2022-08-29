import { firestore } from 'firebase-admin';

export type Chat = {
  contentText: string;
  contentImageURL?: string;
  displayName: string;
  avatarURL: string;
  timestamp: Date;
}

export type ChatRecord = {
  contentText: string;
  contentImageURL?: string;
  uid: string;
  displayName: string;
  avatarURL: string;
  timestamp: firestore.Timestamp;
}
