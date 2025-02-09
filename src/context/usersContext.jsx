import { createContext, useContext, useEffect, useState } from "react";
import {
  firebaseAuth,
  googleAuthProvider,
  firestoreDB,
} from "../Database/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";

// Create a context for User
const UserContext = createContext(null);

// Custom hook to use User context
export const useUserContext = () => {
  return useContext(UserContext);
};

// UserProvider component to manage user state and provide context
export const UserProvider = (props) => {
  const [user, setUser] = useState(null); // State to hold the current user

  // Effect to handle authentication state changes
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

  // Function to create a user document in FirestoreDB
  const createUserDocument = async (user) => {
    const userDocRef = doc(
      firestoreDB,
      "Trendify-DB",
      "CPb5EC3jQCNFEmZYvuRq",
      "users",
      user.uid
    );
    try {
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        createdAt: new Date(), // Set the creation timestamp
      });
    } catch (error) {
      console.log("Error creating user document: ", error); // Log any errors
    }
  };

  // Function to sign up a user with email and password
  const signupUserWithEmailAndPassword = async (
    email,
    password,
    displayName
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName }); // Update the user's display name
      setUser(user); // Set user state
      await createUserDocument(user); // Create user document in Firestore
    } catch (error) {
      console.log("Error signing up: ", error); // Log any errors
    }
  };

  // Function to sign in a user with email and password
  const signinUserWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const user = userCredential.user;
      setUser(user); // Set user state
    } catch (error) {
      console.log("Error signing in: ", error); // Log any errors
    }
  };

  // Function to sign in a user with Google
  const signinWithGoogle = async () => {
    try {
      const details = await signInWithPopup(firebaseAuth, googleAuthProvider);
      const user = details.user;
      console.log("User signed in with Google: ", details); // Logging details for debugging
      setUser(user); // Set user state
      await createUserDocument(user); // Create user document in Firestore
    } catch (error) {
      console.log("Error signing in with Google: ", error); // Log any errors
    }
  };

  // Function to log out a user
  const logoutUser = async () => {
    try {
      await signOut(firebaseAuth);
      console.log("User logged out"); // Log for debugging
      setUser(null); // Clear user state
    } catch (error) {
      console.log("Error logging out: ", error); // Log any errors
    }
  };

  const isUserLoggedIn = !!user; // Convert the user object to a boolean. True if a user is logged in, false if no user is logged in.

  console.log("current user: ", firebaseAuth.currentUser); // Log the current user for debugging

  return (
    <UserContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signinWithGoogle,
        signinUserWithEmailAndPassword,
        logoutUser,
        isUserLoggedIn,
      }}
    >
      {props.children} {/* Render children components */}
    </UserContext.Provider>
  );
};
