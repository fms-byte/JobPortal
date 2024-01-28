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



// // Prepare data to be inserted into Firestore
// const jobData = {
//   title: "Software Engineer",
//   company: "ABC Tech",
//   location: "San Francisco, CA",
//   description: "We are looking for a talented software engineer to join our team...",
//   requirements: ["Bachelor's degree in Computer Science or related field", "Experience with JavaScript and Node.js", "Strong problem-solving skills"],
//   salary: "$80,000 - $100,000",
//   postedDate: firebase.firestore.FieldValue.serverTimestamp(), // Use server timestamp
//   expirationDate: new Date("2024-02-26")
// };

// // Add a new document with a generated ID to the "jobs" collection
// db.collection("jobs").add(jobData)
//   .then((docRef) => {
//     console.log("Document written with ID: ", docRef.id);
//   })
//   .catch((error) => {
//     console.error("Error adding document: ", error);
//   });
