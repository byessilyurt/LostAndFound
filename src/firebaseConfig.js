// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configurationn
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNTjQTMjhdC2DdRo_1kYxNaVnTU2fE6hs",
  authDomain: "lostandfounditem-1af19.firebaseapp.com",
  projectId: "lostandfounditem-1af19",
  storageBucket: "lostandfounditem-1af19.appspot.com",
  messagingSenderId: "956002414332",
  appId: "1:956002414332:web:b7694c2c5fd4baacd3b179",
  measurementId: "G-JZJ19508F0"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export { firebaseApp, analytics };