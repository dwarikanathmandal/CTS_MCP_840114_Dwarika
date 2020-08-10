import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from '../configs/firebase';

export const firebaseClient = firebase.initializeApp(firebaseConfig);
const baseDb = firebaseClient.firestore();
export const db = baseDb;