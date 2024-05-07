// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbvPtXE7yzeXbQ6XTXZykRIldKSYeInpE",
  authDomain: "vehicle-tracking-d63ae.firebaseapp.com",
  projectId: "vehicle-tracking-d63ae",
  storageBucket: "vehicle-tracking-d63ae.appspot.com",
  messagingSenderId: "248112837481",
  appId: "1:248112837481:web:1e2448f980a43b557403f8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const database = getFirestore(app)