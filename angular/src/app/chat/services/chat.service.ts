import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { EMPTY, Observable } from 'rxjs';
import { Chat, ChatRecord } from '../chat.model';
import { map } from 'rxjs/operators';
import { Profile } from '../../models/profile.model';
import { Timestamp } from 'firebase/firestore';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface ChatFromAPI extends Omit<Chat, 'timestamp'> {
  timestamp: string;
}

@Injectable()
export class ChatService {

  constructor(
    private db: AngularFirestore,
    private fs: AngularFireStorage,
    private http: HttpClient,
  ) { }

  private convertRecordToChat(record: ChatRecord): Chat {
    return {
      contentText: record.contentText,
      contentImageURL: record.contentImageURL,
      displayName: record.displayName,
      avatarURL: record.avatarURL,
      timestamp: record.timestamp.toDate(),
      uid: record.uid,
    };
  }

  /**
   * Returns an active observable of all chats in the log.
   */
  list(): Observable<Chat[]> {
    // TODO: read chats
    return EMPTY
  }

  search(email: string): Observable<Chat[]> {
    const url = `${environment.functionBaseUrl}/api/search?email=${email}`;
    return this.http.get<ChatFromAPI[]>(url).pipe(
      map(chats => chats.map(
        chat => ({ ...chat, timestamp: new Date(chat.timestamp) })
      ))
    );
  }

  /**
   * Stores a chat to the log and returns the new chat ID.
   */
  private saveChat(content: string | File, user: Profile): Promise<string> {
    // TODO: write chats
    return Promise.reject()
  }

  /**
   * Posts either text content or an image file as a chat for the given user and returns the new chat ID.
   */
  async post(content: string | File, user: Profile): Promise<string> {
    const id = await this.saveChat(content, user);
    if (content instanceof File) {
      const filePath = `/images/${user.uid}/${id}/${content.name}`;
      // Upload the image
      const snapshot = await this.fs.upload(filePath, content);
      // Find the public download URL
      const imageUrl = await snapshot.ref.getDownloadURL();
      // Update the chat record with the image info
      this.db.doc(`/chats/${id}`).update({
        contentText: `User-provided image: ${content.name}`,
        contentImageURL: imageUrl,
      });
    }
    return id;
  }

}
