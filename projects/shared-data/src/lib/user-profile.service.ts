import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, user, signInWithPopup, GoogleAuthProvider, signOut } from '@angular/fire/auth';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { of, switchMap, map } from 'rxjs';

export interface UserProfile {
  uid: string;
  displayName?: string;
  email?: string;
  handicap?: number;
  defaultTees?: string;
}

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  private user$ = user(this.auth);
  public currentUser = toSignal(this.user$);

  private profile$ = this.user$.pipe(
    switchMap((u) => {
      if (!u) return of(null);
      const userDoc = doc(this.firestore, `users/${u.uid}`);
      return docData(userDoc, { idField: 'uid' }).pipe(
        map((val) => (val ?? null) as UserProfile | null)
      );
    })
  );

  public userProfile = toSignal(this.profile$, { initialValue: null });

  login() {
    signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    signOut(this.auth);
  }

  async updateProfile(data: Partial<UserProfile>) {
    const u = this.currentUser();
    if (!u) return;
    const userDoc = doc(this.firestore, `users/${u.uid}`);
    await setDoc(userDoc, data, { merge: true });
  }
}