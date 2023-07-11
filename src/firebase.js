// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgiaJfxdPXK9-96Dib7XfM4J4KGwAansE",
  authDomain: "speech-recog01.firebaseapp.com",
  projectId: "speech-recog01",
  storageBucket: "speech-recog01.appspot.com",
  messagingSenderId: "403258293126",
  appId: "1:403258293126:web:b0fd1ed569a06e4d710a07",
  measurementId: "G-JSYQWN62JG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
