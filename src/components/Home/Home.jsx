import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import "./Home.css";
import Navbar from "../navbar/navbar";
import Typewriter from 'typewriter-effect';
import bgImg from './landing-video.mp4';


function Home() {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
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

  const handleLogOut = () => {
    signOut(auth)
    .then(() => {
      navigate("/Signin");
    })
    .catch((error) => {
      console.error("Error Signing Out:", error)
    })
  }

  return (
    <div>
      <Navbar />
      <div className="home-body">
        <div className="landing-photo">
          <video autoPlay loop muted style={{
            objectFit: "cover",
            height: "425px",
            width: "100%",
            opacity: "0.5",
            borderBottom: "5px solid #0080ff"
          }}>
            <source src={bgImg} type="video/mp4"/>
            Your Browser does not support the video tag
          </video>
        </div>
      <h1 className="welcome-msg">
      <Typewriter onInit={(typewriter) => {
  typewriter.typeString(`Hey, `)
    .start()
    .typeString(`<span class="displayName">${displayName}</span>!`)
    .start();
}} />

        </h1>
        <p className="introduction">
          Unleash your inner geek with
          DataZ, your daily dose of tech tales! From giants like Google and
          Apple to David-and-Goliath startups, we've got the scoop on the
          coolest gadgets, quirkiest apps, and everything in between. Join the
          nerdy fun at DataZ because tech news doesn't have to be serious!
        </p>

        <button className="logOut" onClick={handleLogOut}>Log Out</button>
      </div>
    </div>
  );
}

export default Home;
