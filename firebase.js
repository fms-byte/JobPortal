import { getApp, initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD62UUazksmNS7h_TVFTIKSmwhYiO6uzzs",
  authDomain: "job-search-app-10c7a.firebaseapp.com",
  projectId: "job-search-app-10c7a",
  storageBucket: "job-search-app-10c7a.appspot.com",
  messagingSenderId: "422266782981",
  appId: "1:422266782981:web:f601b666f9e05b8d9f636c"
};
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore();
// export {auth,db};

let app;
let auth;
let db;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

export { auth, db };