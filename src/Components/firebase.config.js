import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    // apiKey: "AIzaSyDmAfSl4SZmRweSUHZ5Uori3I1V-dWTH6I",
    // authDomain: "otpsend-95064.firebaseapp.com",
    // projectId: "otpsend-95064",
    // storageBucket: "otpsend-95064.appspot.com",
    // messagingSenderId: "286811810855",
    // appId: "1:286811810855:web:3e8bd005765194393db202"

    // apiKey: "AIzaSyCSCUlO80jr-eIdj-A3XE2GEF1bBk7slzE",
    // authDomain: "react-chat-d709b.firebaseapp.com",
    // databaseURL: "https://react-chat-d709b-default-rtdb.firebaseio.com",
    // projectId: "react-chat-d709b",
    // storageBucket: "react-chat-d709b.appspot.com",
    // messagingSenderId: "630687946313",
    // appId: "1:630687946313:web:d27ec33346923854cc1198"

   
       apiKey: "AIzaSyCzHG3ZC9z2Y0pNf-ixyVqJSoXrCE3mD7o",
       authDomain: "skillerwebnmob.firebaseapp.com",
       projectId: "skillerwebnmob",
       storageBucket: "skillerwebnmob.appspot.com",
       messagingSenderId: "45174501658",
       appId: "1:45174501658:web:27ef8101e503decafc7ca3"
      
};

// Initialize Firebase
const signup = initializeApp(firebaseConfig);

export const auth = getAuth(signup);
export const db = getFirestore(signup);

