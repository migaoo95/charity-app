// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
console.log(process.env.FIREBASE_API_KEY);
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "charity-shop-2cfdd.firebaseapp.com",
  projectId: "charity-shop-2cfdd",
  storageBucket: "charity-shop-2cfdd.appspot.com",
  messagingSenderId: "158373822135",
  appId: "1:158373822135:web:160103119b31d21254d732",
};

// Initialize Firebase
// eslint-disable-next-line no-unused-vars
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
