import React from "react";
import { getAuth } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import "./Home.css";
import Navbar from "../navbar/navbar";

function Home() {
  const auth = getAuth();
  const user = auth.currentUser;
  let displayName = "";

  if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    displayName = user.displayName;
    // Additional user properties if needed:
    // const email = user.email;
    // const photoURL = user.photoURL;
    // const emailVerified = user.emailVerified;
    // const uid = user.uid;
  }

  return (
    <div>
      <Navbar />
      <div className="home-body">
        <h1 className="welcome-msg">
          Hey, <span className="displayName">{displayName}</span>
        </h1>
        <p className="introduction">
          Unleash your inner geek with
          $name$, your daily dose of tech tales! From giants like Google and
          Apple to David-and-Goliath startups, we've got the scoop on the
          coolest gadgets, quirkiest apps, and everything in between. Join the
          nerdy fun at $name$ because tech news doesn't have to be serious!
        </p>
      </div>
    </div>
  );
}

export default Home;
