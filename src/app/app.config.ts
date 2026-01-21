import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { routes } from './app.routes';

// TODO: Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDESyvcUsfpU7OVo5Z9zeUFr8sUOpzAt44",
  authDomain: "golf-stats-ed7cb.firebaseapp.com",
  projectId: "golf-stats-ed7cb",
  storageBucket: "golf-stats-ed7cb.appspot.com",
  messagingSenderId: "529452128326",
  appId: "1:529452128326:web:7ce04fa6fc0aa447a45247",
  measurementId: "G-7VYRTX8LKH"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
};
