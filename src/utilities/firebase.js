// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, where, query } from 'firebase/firestore';
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore';
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
  measurementId: "G-E2M8SEB9TD",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const authentication = getAuth(app);
export const database = getFirestore(app);

export const citiesRef = collection(database, "cities");
export const advertsRef = collection(database, "adverts");
