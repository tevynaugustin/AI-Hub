import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";

function Home() {
  const auth = getAuth();
  const user = auth.currentUser;
  let email = "";
  let displayName = "";

  if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    displayName = user.displayName;
    console.log(displayName)
    email = user.email; // Assign value to the email variable
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;
    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    const uid = user.uid;
  }

  return (
    <div className="home-container">
      <h1 className="welcome-msg">Hey {displayName}</h1>
      <p>Sign out</p>
    </div>
  );
}

export default Home;
