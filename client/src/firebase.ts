// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "mern-estate-app1.firebaseapp.com",
  projectId: "mern-estate-app1",
  storageBucket: "mern-estate-app1.appspot.com",
  messagingSenderId: "731674902211",
  appId: "1:731674902211:web:196f9fb4e11f5308eb6c76",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
