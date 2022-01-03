// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZAn4aYeR9IIarDiOHxKwXmtNd_AgCXzo",
  authDomain: "hibridinisprojektas.firebaseapp.com",
  projectId: "hibridinisprojektas",
  storageBucket: "hibridinisprojektas.appspot.com",
  messagingSenderId: "651899146164",
  appId: "1:651899146164:web:b6a81dfba76cdb26edece1",
  measurementId: "G-E2M8SEB9TD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const authentication = getAuth();

