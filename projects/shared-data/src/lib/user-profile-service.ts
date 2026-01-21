import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { Auth, signInWithPopup, signOut, user } from '@angular/fire/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { map, of, switchMap } from 'rxjs';

export interface UserProfile {
  uid: string;
  displayName?: string;
  email?: string;
  handicap?: number;
  defaultTees?: string;
  GHIN_Number?: any;
  HandicapIndex?: number; // we want to capture a snapshot of this for every round
}
@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  // 1. Auth State (Firebase User)
  // 'user' is an observable from @angular/fire that emits when auth state changes
  private user$ = user(this.auth);
  public currentUser = toSignal(this.user$);

  // 2. Database Profile State (Firestore Data)
  // Reactively switches to the firestore doc when the user logs in
  private profile$ = this.user$.pipe(
    switchMap(u => {
      if (!u) return of(null);
      const userDoc = doc(this.firestore, `users/${u.uid}`);
      return docData(userDoc, { idField: 'uid' }).pipe(
        map((val) => (val ?? null) as UserProfile | null)
      );
    })
  );
  // exposed signal for the UI
  public userProfile = toSignal(this.profile$, { initialValue: null });

  // 3. Actions
  login() {
    signInWithPopup(this.auth, new GoogleAuthProvider())
  }

  logout() {
    signOut(this.auth)
  }

  async updateProfile(data: Partial<UserProfile>){
    const u = this.currentUser();
    if(!u) return;
    const userDoc = doc(this.firestore, `users/${u.uid}`);
    await setDoc(userDoc, data, {merge: true});
  }
}
