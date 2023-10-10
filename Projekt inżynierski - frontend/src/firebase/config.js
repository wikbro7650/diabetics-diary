import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCqcGGZ6Y9m03K-PXqI7oNemjuofi_OJPQ",
  authDomain: "white-caster-340113.firebaseapp.com",
  projectId: "white-caster-340113",
  storageBucket: "white-caster-340113.appspot.com",
  messagingSenderId: "744161316157",
  appId: "1:744161316157:web:55cbf3a4f3dca435690954",
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };
