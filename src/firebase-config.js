// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-b5FKDajoZwzjpYIEkUm2fpyWZah9-3I",
  authDomain: "whoamigameapp.firebaseapp.com",
  projectId: "whoamigameapp",
  storageBucket: "whoamigameapp.appspot.com",
  messagingSenderId: "866584359638",
  appId: "1:866584359638:web:d931b4a20d3cd4bf2f8f77"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();