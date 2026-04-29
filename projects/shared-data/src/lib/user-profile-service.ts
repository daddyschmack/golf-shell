import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { collection, collectionData, doc, docData, Firestore, setDoc, getDoc, getDocs } from '@angular/fire/firestore';
import { Auth, signInWithPopup, signOut, user } from '@angular/fire/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { map, Observable, of, switchMap } from 'rxjs';
import { GHIN_Info, UserProfile } from './models/golf-course';



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
        map((val: any) => (val ? { ...val, email: val.email || u.email, displayName: val.displayName || u.displayName } as UserProfile : null))
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
  getAllUser(): Observable<UserProfile[]>{
    const userRef = collection(this.firestore,'users');
    return collectionData(userRef, {idField: 'uid'}) as Observable<UserProfile[]>;
  }

  async migrateOldProfile() {
    const u = this.currentUser();
    if (!u) return;
    const oldDocRef = doc(this.firestore, `Users/${u.uid}`);
    const oldDocSnap = await getDoc(oldDocRef);

    if (oldDocSnap.exists()) {
      const newDocRef = doc(this.firestore, `users/${u.uid}`);
      await setDoc(newDocRef, oldDocSnap.data(), { merge: true });
      console.log('Successfully copied your old profile to the new lowercase collection!');
    }
  }

  async seedDummyUsers() {
    const dummyUsers = [
      { uid: 'dummy-1', displayName: 'Tiger Woods', email: 'tiger@example.com', handicap: 2 },
      { uid: 'dummy-2', displayName: 'Phil Mickelson', email: 'phil@example.com', handicap: 4 },
      { uid: 'dummy-3', displayName: 'Rory McIlroy', email: 'rory@example.com', handicap: 1 },
      { uid: 'dummy-4', displayName: 'Scottie Scheffler', email: 'scottie@example.com', handicap: 0 },
    ];
    for (const dummyUser of dummyUsers) {
      const userDoc = doc(this.firestore, `users/${dummyUser.uid}`);
      await setDoc(userDoc, dummyUser, { merge: true });
    }
  }

  async migrateAllUsers() {
    console.log('Starting mass migration from Users to users...');
    const oldCollectionRef = collection(this.firestore, 'Users');
    const snapshot = await getDocs(oldCollectionRef);

    let count = 0;
    for (const document of snapshot.docs) {
      const data = document.data();
      // Use the uid field as the clean document name, fallback to old ID if missing
      const newDocId = data['uid'] || document.id;
      const newDocRef = doc(this.firestore, `users/${newDocId}`);
      await setDoc(newDocRef, data, { merge: true });
      count++;
    }
    console.log(`Migration complete! Successfully copied ${count} records.`);
  }
  getMyHandicapIndex(ghin: number){
    console.log("we would look this up, and will eventually")
  }

  loginWithEmail(){
    console.log("we would look this up, and will eventually")
   }


}
