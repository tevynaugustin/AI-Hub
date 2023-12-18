// Imports
import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Navbar from "../navbar/navbar";
import Typewriter from "typewriter-effect";
import bgImg from "./landing-pic.png";
import logo from '../../main images/logo.png'
import Featuredfeed from "../Featured News/featuredfeed";
// ------------------------------------------------------------------------------------------------------------

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

  // Log Out Function
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/Signin");
      })
      .catch((error) => {
        console.error("Error Signing Out:", error);
      });
  };
  // --------------------------------------------------------------------------------------------------------------------

  // Function for floating arrow
  const scrollToFeaturedFeeds = () => {
    const featuredFeedsTitle = document.getElementById('featured-feeds-title');

    if (featuredFeedsTitle) {
      featuredFeedsTitle.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start'
      });
    }
  }
  // --------------------------------------------------------------------------------------------------------------------

  return (
    <div>
      <Navbar />
      <div className="home-body">
        <div className="landing-photo">
          <img src={bgImg} alt="" />
          <img className="logo-home" src={logo} alt="" />
        </div>
        <h1 className="welcome-msg">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString(`Hey, `)
                .start()
                .typeString(`<span class="displayName">${displayName}</span>!`)
                .start();
            }}
          />
        </h1>
        <p className="introduction">
          Unleash your inner geek with OPTIC, your daily dose of tech tales!
          From giants like Google and Apple to David-and-Goliath startups, we've
          got the scoop on the coolest gadgets, quirkiest apps, and everything
          in between. Join the nerdy fun at OPTIC because tech news doesn't have
          to be serious!
        </p>

        <button className="logOut" onClick={handleLogOut}>
          Log Out
        </button>

        {/* Floating Arrow */}
        <div className="floating-arrow" onClick={scrollToFeaturedFeeds}></div>

        <div className="featured-feeds">
          <h1 id="featured-feeds-title" className="featured-feeds-title">Featured Feeds</h1>
          <Featuredfeed/>
        </div>
      </div>
    </div>
  );
}

export default Home;
