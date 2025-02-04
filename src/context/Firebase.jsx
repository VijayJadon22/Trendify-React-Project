import { createContext, useContext, useEffect, useState } from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const firebaseAuth = getAuth(app);

const firebaseProvider = new GoogleAuthProvider();
const firestore = getFirestore(app);

const FirebaseContext = createContext(null);

export const useFirebase = () => {
  return useContext(FirebaseContext);
};

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        // console.log("User logged in: ", user);
        setUser(user);
      } else {
        console.log("User logged out");
        setUser(null);
      }
    });
  }, []);
  const signupUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signinWithGoogle = async () => {
    const details = await signInWithPopup(firebaseAuth, firebaseProvider);
    console.log(details);
  };

  const signinUserWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const logoutUser = async () => {
    try {
      await signOut(firebaseAuth);
      console.log("User logged out");
    } catch (error) {
      console.log("Error logging out: ", error);
    }
  };

  const isUserLoggedIn = user ? true : false;
  console.log("current user: ", firebaseAuth.currentUser);
  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signinWithGoogle,
        signinUserWithEmailAndPassword,
        logoutUser,
        isUserLoggedIn,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
