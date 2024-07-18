import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GithubAuthProvider,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import {
  getDownloadURL,
  getStorage,
  ref as ref_storage,
  uploadBytes,
} from "firebase/storage";
import { getDatabase, ref as ref_db, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCJH9-fOaPYryYtikoHOANMrkwLRkZSRX8",
  authDomain: "branders-375d7.firebaseapp.com",
  projectId: "branders-375d7",
  storageBucket: "branders-375d7.appspot.com",
  messagingSenderId: "201625085862",
  appId: "1:201625085862:web:3fd7d5fee14b0d0d885167",
  measurementId: "G-372NQK3L6R"
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
export const storage = getStorage(firebaseApp);
export const db = getDatabase(firebaseApp);

const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(null);
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
        // console.log(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const toast = useToast();

  const signUpUserWithEmailAndPassword = (name, email, password) => {
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then(() => {
        const user = firebaseAuth.currentUser;
        set(ref_db(db, `users/${user.uid}`), {
          name,
          email,
          photoURL: "",
        });
        updateProfile(user, {
          displayName: name,
        }).then(() => {
          sendEmailVerification(user).then(() => {
            toast({
              title: "Email verification sent.",
              status: "success",
              variant: "subtle",
              position: "top",
              isClosable: true,
            });
          });
        });
        toast({
          title: "Account created.",
          status: "success",
          variant: "subtle",
          position: "top",
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: capitalizeFirstLetter(
            error.code.split("auth/")[1].split("-").join(" ")
          ),
          status: "error",
          variant: "subtle",
          position: "top",
          isClosable: true,
        });
      });
  }

  const signInWithGoogle = () => {
    signInWithPopup(firebaseAuth, googleProvider)
      .then((res) => {
        const user = res.user;
        set(ref_db(db, `users/${user.uid}`), {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
        toast({
          title: "Signed In Successfully.",
          status: "success",
          variant: "subtle",
          position: "top",
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: capitalizeFirstLetter(
            error.code.split("auth/")[1].split("-").join(" ")
          ),
          status: "error",
          variant: "subtle",
          position: "top",
          isClosable: true,
        });
      });
  };

  const signInWithGithub = () => {
    signInWithPopup(firebaseAuth, githubProvider)
      .then((res) => {
        const user = res.user;
        set(ref_db(db, `users/${user.uid}`), {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
        toast({
          title: "Signed In Successfully.",
          status: "success",
          variant: "subtle",
          position: "top",
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: capitalizeFirstLetter(
            error.code.split("auth/")[1].split("-").join(" ")
          ),
          status: "error",
          variant: "subtle",
          position: "top",
          isClosable: true,
        });
      });
  };

  const signInUserWithEmailAndPassword = (email, password) => {
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(() => {
        toast({
          title: "Signed In Successfully.",
          status: "success",
          variant: "subtle",
          position: "top",
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: capitalizeFirstLetter(
            error.code.split("auth/")[1].split("-").join(" ")
          ),
          status: "error",
          variant: "subtle",
          position: "top",
          isClosable: true,
        });
      });
  };

  const signOutUser = () => {
    signOut(firebaseAuth)
      .then(() => {
        toast({
          title: "Logged Out Successfully.",
          status: "success",
          variant: "subtle",
          position: "top",
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: capitalizeFirstLetter(
            error.code.split("auth/")[1].split("-").join(" ")
          ),
          status: "error",
          variant: "subtle",
          position: "top",
          isClosable: true,
        });
      });
  };

  const updateUserData = async (userDetails, name, image) => {
    const user = firebaseAuth.currentUser;
    if (!user) {
      toast({
        title: "No user is currently signed in.",
        status: "error",
        variant: "subtle",
        position: "top",
        isClosable: true,
      });
      return;
    }
    if (name || image) {
      let imageURL = "";
      if (image) {
        const imageRef = ref_storage(storage, `images/profile/${user.uid}`);
        const uploadRef = await uploadBytes(imageRef, image);
        imageURL = await getDownloadURL(uploadRef.ref);
      }
      const updatedData = {
        ...userDetails,
        name: name ? name : userDetails.name,
        photoURL: image ? imageURL : userDetails.photoURL,
      };
      set(ref_db(db, `users/${user.uid}`), updatedData);
      await updateProfile(user, {
        displayName: name ? name : userDetails.name,
        photoURL: image ? imageURL : userDetails.photoURL,
      });
      toast({
        title: "Profile Updated Successfully.",
        status: "success",
        variant: "subtle",
        position: "top",
        isClosable: true,
      });
    } else {
      toast({
        title: "Please fill at least one field.",
        status: "error",
        variant: "subtle",
        position: "top",
        isClosable: true,
      });
    }
  };

  const isSignedIn = !!user;

  return (
    <FirebaseContext.Provider
      value={{
        signUpUserWithEmailAndPassword,
        isSignedIn,
        signInWithGoogle,
        signInWithGithub,
        signInUserWithEmailAndPassword,
        signOutUser,
        user,
        userName,
        setUserName,
        updateUserData,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
