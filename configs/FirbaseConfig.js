// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "business-promote-mobile-869e0.firebaseapp.com",
  projectId: "business-promote-mobile-869e0",
  storageBucket: "business-promote-mobile-869e0.appspot.com",
  messagingSenderId: "703569492021",
  appId: "1:703569492021:web:d0d55933b3d6b1475c997c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
