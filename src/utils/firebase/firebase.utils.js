import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBNpk-DIIUG7xnJp1904o6KBm4-MWIutgo",
    authDomain: "evoke-clothing-db.firebaseapp.com",
    projectId: "evoke-clothing-db",
    storageBucket: "evoke-clothing-db.appspot.com",
    messagingSenderId: "726692824906",
    appId: "1:726692824906:web:dd23b233aec22fdeb6e3b3",
};

const firebaseApp = initializeApp(firebaseConfig);
const goggleProvider = new GoogleAuthProvider();

goggleProvider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
    signInWithPopup(auth, goggleProvider);

export const db = getFirestore();

export const addCollectionAndDocument = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log("done");
};

export const getCategoriesAndDocument = async () => {
    const collectionRef = collection(db, "categories");
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => doc.data());
};

export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInfo = {}
) => {
    const userDocRef = await doc(db, "users", userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo,
            });
        } catch (error) {
            console.log("Error creating user", error.message);
        }
    }

    return userDocRef;
};

export const createUserAuthWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback) =>
    onAuthStateChanged(auth, callback);
