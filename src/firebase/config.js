import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCZf7AYmjyT2kJTdxe6CRCGTCZLbSO8Wik",
    authDomain: "satisfying-6af98.firebaseapp.com",
    projectId: "satisfying-6af98",
    storageBucket: "satisfying-6af98.appspot.com",
    messagingSenderId: "1043885466512",
    appId: "1:1043885466512:web:4e6aede7015eae69fe0915"
};

const app = initializeApp(firebaseConfig);

const auth_mod = getAuth(app);

const db = initializeFirestore(app, { experimentalForceLongPolling: true });

export { app, auth_mod, db };

