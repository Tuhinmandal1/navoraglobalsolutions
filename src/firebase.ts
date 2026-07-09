import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOzDn-0UL3F0zJLGTU8WBPjumFs0gcfCw",
  authDomain: "navora-global-solutions.firebaseapp.com",
  projectId: "navora-global-solutions",
  storageBucket: "navora-global-solutions.firebasestorage.app",
  messagingSenderId: "663384810564",
  appId: "1:663384810564:web:caafa9972224ee1a83c811",
  measurementId: "G-EJPZVTVXXV",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);