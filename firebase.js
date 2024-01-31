import { getApp, initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJ5kSezu5E7B9yV0J9tGbxHBbprE8LhL8",
  authDomain: "jobportal-3b857.firebaseapp.com",
  projectId: "jobportal-3b857",
  storageBucket: "jobportal-3b857.appspot.com",
  messagingSenderId: "888199955517",
  appId: "1:888199955517:web:3aa7be61b64dffe2d4d654",
  measurementId: "G-YHS3QQHS8R"
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