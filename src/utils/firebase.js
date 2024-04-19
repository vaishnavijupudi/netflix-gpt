// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYZh441n3fkIhYUsSVnWNkO8ZEqyflXTQ",
  authDomain: "netflixgpt-fe7c9.firebaseapp.com",
  projectId: "netflixgpt-fe7c9",
  storageBucket: "netflixgpt-fe7c9.appspot.com",
  messagingSenderId: "838013263885",
  appId: "1:838013263885:web:03f3851751b4eaa3c1b544",
  measurementId: "G-QR59KXSFHC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();