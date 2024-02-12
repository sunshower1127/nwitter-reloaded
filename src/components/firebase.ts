// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTQeAqWNkCPbU7V39FeGktnqHnMBD7PRw",
  authDomain: "nwitter-reloaded-b60ff.firebaseapp.com",
  projectId: "nwitter-reloaded-b60ff",
  storageBucket: "nwitter-reloaded-b60ff.appspot.com",
  messagingSenderId: "852997487560",
  appId: "1:852997487560:web:75bc501a96d4407a0a9efd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const storage = getStorage(app)

export const db = getFirestore(app)