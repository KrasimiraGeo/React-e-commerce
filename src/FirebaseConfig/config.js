import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"

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

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app) 
let bucket = storage.storageBucket
