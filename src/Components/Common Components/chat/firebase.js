// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCSCUlO80jr-eIdj-A3XE2GEF1bBk7slzE",
//   authDomain: "react-chat-d709b.firebaseapp.com",
//   databaseURL: "https://react-chat-d709b-default-rtdb.firebaseio.com",
//   projectId: "react-chat-d709b",
//   storageBucket: "react-chat-d709b.appspot.com",
//   messagingSenderId: "630687946313",
//   appId: "1:630687946313:web:d27ec33346923854cc1198"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);



import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfigg = {
    apiKey: "AIzaSyCSCUlO80jr-eIdj-A3XE2GEF1bBk7slzE",
    authDomain: "react-chat-d709b.firebaseapp.com",
    databaseURL: "https://react-chat-d709b-default-rtdb.firebaseio.com",
    projectId: "react-chat-d709b",
    storageBucket: "react-chat-d709b.appspot.com",
    messagingSenderId: "630687946313",
    appId: "1:630687946313:web:d27ec33346923854cc1198"


    // apiKey: "AIzaSyBk4ikzpBvcXHARCzBvC4nCZseWzFuehxI",
    // authDomain: "skiller-261b6.firebaseapp.com",
    // projectId: "skiller-261b6",
    // storageBucket: "skiller-261b6.appspot.com",
    // messagingSenderId: "463552141536",
    // appId: "1:463552141536:web:de48608a9797674ddad885",
    // measurementId: "G-ZDDWPJSMR4"
};

// Initialize Firebase
const signupp = initializeApp(firebaseConfigg);

export const auth = getAuth(signupp);
export const db = getFirestore(signupp);
