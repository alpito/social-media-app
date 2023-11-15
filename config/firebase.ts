// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADveCZUAarr2YZWBiATT1ZX3d014RJ_2g",
  authDomain: "react-project-c191b.firebaseapp.com",
  projectId: "react-project-c191b",
  storageBucket: "react-project-c191b.appspot.com",
  messagingSenderId: "192061293443",
  appId: "1:192061293443:web:be5ea3311e6fdef6e06cb6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);