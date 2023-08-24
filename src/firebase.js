import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCD4GViTCvWoEPcbEWq3PDA9kUZ7U4lGes",
  authDomain: "zerodha-clone-86dad.firebaseapp.com",
  projectId: "zerodha-clone-86dad",
  storageBucket: "zerodha-clone-86dad.appspot.com",
  messagingSenderId: "1049953917743",
  appId: "1:1049953917743:web:5cea580b330ee1db879fda",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
