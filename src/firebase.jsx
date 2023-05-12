// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBplM-ShTcNo1R_pfvHBlsekxwURriKes",
  authDomain: "mimosas-training-app.firebaseapp.com",
  projectId: "mimosas-training-app",
  storageBucket: "mimosas-training-app.appspot.com",
  messagingSenderId: "467708964248",
  appId: "1:467708964248:web:f7b98851958b07212d0fed",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
