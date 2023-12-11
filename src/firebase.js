// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHBth-wizglnuSiTMoSfxx2jIaSr50OnI",
  authDomain: "blog-c9737.firebaseapp.com",
  projectId: "blog-c9737",
  storageBucket: "blog-c9737.appspot.com",
  messagingSenderId: "745849314103",
  appId: "1:745849314103:web:783757aec9b22adf28d8b2",
  measurementId: "G-WT759F4ZNS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);