// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyADTl1--oNKuDKpVAw7sDYjM8geUkJ9vVg",
  authDomain: "art-shop-37d63.firebaseapp.com",
  databaseURL: "https://art-shop-37d63-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "art-shop-37d63",
  storageBucket: "art-shop-37d63.appspot.com",
  messagingSenderId: "551090226605",
  appId: "1:551090226605:web:c4fee89c390454d4044d24",
  measurementId: "G-WMF1S6QGGS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
console.log(auth);
export const storage = getStorage(app) // exporting the storage so that it can be accessed from a different file