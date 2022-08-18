import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    SignInWithRedirect,
    GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBNpk-DIIUG7xnJp1904o6KBm4-MWIutgo",
    authDomain: "evoke-clothing-db.firebaseapp.com",
    projectId: "evoke-clothing-db",
    storageBucket: "evoke-clothing-db.appspot.com",
    messagingSenderId: "726692824906",
    appId: "1:726692824906:web:dd23b233aec22fdeb6e3b3",
};

const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = await doc(db, "users", userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
            });
        } catch (error) {
            console.log("Error creating user", error.message);
        }
    }

    return userDocRef;
};
