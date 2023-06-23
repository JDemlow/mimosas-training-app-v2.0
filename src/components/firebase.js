// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_API_KEY || import.meta.env.VITE_REACT_API_KEY,
  authDomain:
    process.env.REACT_AUTH_DOMAIN || import.meta.env.VITE_REACT_AUTH_DOMAIN,
  projectId: "mimosas-training-app",
  storageBucket:
    process.env.REACT_STORAGE_BUCKET ||
    import.meta.env.VITE_REACT_STORAGE_BUCKET,
  messagingSenderId:
    process.env.REACT_MESSAGE_SENDER_ID ||
    import.meta.env.VITE_REACT_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_ID || import.meta.env.VITE_REACT_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
