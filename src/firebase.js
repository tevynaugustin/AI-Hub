// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import the authentication module

const firebaseConfig = {
  apiKey: "AIzaSyCHBth-wizglnuSiTMoSfxx2jIaSr50OnI",
  authDomain: "blog-c9737.firebaseapp.com",
  projectId: "blog-c9737",
  storageBucket: "blog-c9737.appspot.com",
  messagingSenderId: "745849314103",
  appId: "1:745849314103:web:783757aec9b22adf28d8b2",
  measurementId: "G-WT759F4ZNS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Create the auth object using the authentication module

export { auth }; // Export the auth object
