import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD0WkxHi99Ism3qiBwY0-MVivmzGcnKnrU",
    authDomain: "bookshop-88d5d.firebaseapp.com",
    projectId: "bookshop-88d5d",
    storageBucket: "bookshop-88d5d.firebasestorage.app",
    messagingSenderId: "804529683826",
    appId: "1:804529683826:web:7d1d8a74b4ef49a3c0b1eb"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, db, auth, googleProvider }; 