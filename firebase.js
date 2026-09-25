import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDh4cGxwsDeWbv7iEGIYgkmC95GSH7OMtE",
  authDomain: "planetway-a854b.firebaseapp.com",
  projectId: "planetway-a854b",
  storageBucket: "planetway-a854b.firebasestorage.app",
  messagingSenderId: "417876822486",
  appId: "1:417876822486:web:9f5bc1333c277f5e7fbc77",
  measurementId: "G-C80G6TT437",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);