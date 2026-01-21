import { Injectable, inject } from '@angular/core';
import {
  Auth,
  authState,
  signOut,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider, getAuth,
  User as FirebaseUser
} from "@angular/fire/auth";
import { User } from "shared-data";
import { BehaviorSubject, Observable, from, of } from "rxjs";
import { map, tap, take, catchError } from "rxjs/operators";

import {
  Firestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  collectionData,
  query,
  where,
  limit
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  public loggedInUser$: Observable<FirebaseUser | null>;
  public golfer$ = new BehaviorSubject<any>(null);

  constructor() {
    this.loggedInUser$ = authState(this.auth);
  }

  login(email: string, password: string){
    return signInWithEmailAndPassword(this.auth, email, password);
  }

 register(email: string, password: string){
    return createUserWithEmailAndPassword(this.auth, email, password)
  }

  syncUserInfo(){
    const user = this.auth.currentUser;
    if( !user) { return }

    // Fetch profile from Firestore based on UID
    this.getUserProfile(user.uid).pipe(
      take(1)
    ).subscribe();
  }

  loginWithGoogle(){
    return signInWithPopup(this.auth, new GoogleAuthProvider())
  }

  logout(): void {
    signOut(this.auth)
  }

  // Helper to get the collection reference
  private get usersCollection() {
    return collection(this.firestore, 'users');
  }

  createProfile(profile:Partial<User>) {
    return from(addDoc(this.usersCollection, profile));
  }

  updateProfile(id: string, user: Partial<User>) {
    const docRef = doc(this.firestore, 'users', id);
    return from(updateDoc(docRef, user));
  }

  getUserProfile(uid: string): Observable<any> {
    const q = query(this.usersCollection, where('uid', '==', uid), limit(1));

    return collectionData(q).pipe(
      map(users => users.length > 0 ? users[0] : null),
      tap(profile => {
        if (profile) {
          this.golfer$.next(profile);
        }
      })
    );
  }

  deleteProfile(id: string) {
    const docRef = doc(this.firestore, 'users', id);
    return from(deleteDoc(docRef));
  }
}
