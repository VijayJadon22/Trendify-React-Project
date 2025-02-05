import { createContext, useContext, useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const FirebaseContext = createContext(null); // Create a context for Firebase

export const useFirebase = () => {
  return useContext(FirebaseContext); // Custom hook to use Firebase context
};

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null); // State to hold the current user

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user); // Set user if logged in
      } else {
        setUser(null); // Clear user if logged out
      }
    });
    return unsubscribe; // Cleanup the subscription on unmount
  }, []);

  // Function to sign up a user with email and password
  const signupUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  // Function to sign in a user with Google
  const signinWithGoogle = async () => {
    const details = await signInWithPopup(firebaseAuth, firebaseProvider);
    console.log(details); // Log details for debugging
  };

  // Function to sign in a user with email and password
  const signinUserWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  // Function to log out a user
  const logoutUser = async () => {
    try {
      await signOut(firebaseAuth);
      console.log("User logged out"); // Log for debugging
    } catch (error) {
      console.log("Error logging out: ", error); // Log any errors
    }
  };

  const isUserLoggedIn = !!user; // Convert the user object to a boolean. True if a user is logged in, false if no user is logged in.

  console.log("current user: ", firebaseAuth.currentUser); // Log the current user for debugging

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
      {props.children} {/* Render children components */}
    </FirebaseContext.Provider>
  );
};
