import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBX5B1u3Upb6ldywtBlC6_Vv9yHZMOXyF0",
  authDomain: "peak-catbird-267720.firebaseapp.com",
  projectId: "peak-catbird-267720",
  storageBucket: "peak-catbird-267720.appspot.com",
  messagingSenderId: "696403130312",
  appId: "1:696403130312:web:c0abcf2f84cc039e6772fd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
