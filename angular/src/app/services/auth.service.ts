import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '@firebase/auth-types';
import { EMPTY, Observable, of } from 'rxjs';
import md5 from 'crypto-js/md5';
import { Profile } from '../models/profile.model';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';

const DEFAULT_USER = 'Anonymous';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly profile: Observable<Profile> = this.auth.authState.pipe(
    switchMap(authUser => {
      if (authUser?.uid) {
        return this.db.doc<Profile>(`users/${authUser.uid}`).valueChanges().pipe(
          switchMap(profile => {
            if (!profile) {
              const newProfile = this.buildProfile(authUser);
              // this._currentProfile = newProfile;
              return this.db.collection('users').doc(newProfile.uid).set(newProfile, { merge: true }).then(() => newProfile)
            }
            return of(profile)
          })
        )
      }
      return EMPTY
    }),
  );

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
  ) { }

  logout(): Promise<void> {
    return this.auth.signOut();
  }

  private buildProfile(user: User): Profile {
    // Default to auth settings
    const profile = {
      uid: user.uid,
      displayName: user.displayName || '',
      avatarUrl: user.photoURL || '',
    };
    if (!profile.avatarUrl) {
      const email = user.email || ''
      // Use the Gravatar URL
      profile.avatarUrl = `https://www.gravatar.com/avatar/${md5(email)}?s=64&d=identicon`;
    }
    if (!profile.displayName && user.email) {
      const username = user.email.match(/(.*?)@/);
      profile.displayName = username ? username[1] : '';
    }
    // Finally, user our default values
    if (!profile.displayName) {
      profile.displayName = DEFAULT_USER;
    }

    return profile;
  }

}
