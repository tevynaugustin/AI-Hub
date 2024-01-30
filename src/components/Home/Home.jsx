// Imports
import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Navbar from "../navbar/navbar";
import Typewriter from "typewriter-effect";
import bgImg from "./cover-photo.webp";
import imageGeneratorBG from "./image-generator-bg.webp";
import imageAnalyzerBG from "./image-analyzer.png";

function Home() {
  // Firebase authentication and user information
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  let displayName = "";

  // Set user display name if available
  if (user !== null) {
    displayName = user.displayName;
  }

  // Scroll to showcase section
  const scrollToShowcase = () => {
    const showcaseContainer = document.querySelector(".showcase-container");

    if (showcaseContainer) {
      showcaseContainer.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    }
  };

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

  return (
    <div>
      {/* Navbar component */}
      <Navbar />
      <div className="home-body">
        {/* Landing photo */}
        <div className="landing-photo">
          <img src={bgImg} alt="" />
        </div>
        <>
          {/* Welcome message with typewriter effect */}
          <h1 className="welcome-msg">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString(`Hey, `)
                  .start()
                  .typeString(
                    `<span class="displayName">${displayName}</span>!`
                  )
                  .start();
              }}
            />
          </h1>
          {/* Introduction text */}
          <p className="introduction">
            Step into the dynamic realm of OPTIC, your AI hub for generating and
            scanning images to unveil their descriptions. Engage in enthralling
            conversations with our AI chatbot, embark on a discovery journey,
            and unlock endless possibilities. OPTIC isn't just a platform—it's
            an adventure of exploration. Immerse yourself and let the excitement
            unfold!
          </p>
          {/* Floating arrow for scrolling to showcase */}
          <div class="floating-arrow" onClick={scrollToShowcase}></div>
        </>

        {/* Log out button */}
        <button className="logOut" onClick={handleLogOut}>
          Log Out
        </button>

        {/* Showcase container with available services */}
        <div className="showcase-container">
          <h1 className="showcase-title">Available Services</h1>
          <div className="showcase-items">
            {/* Card for Image Generator */}
            <div
              className="service-card"
              onClick={() => navigate("/imagegenerator")}
            >
              <img
                className="card-background"
                src={imageGeneratorBG}
                alt="Generator"
              />
              <div className="card-content">
                <h2 className="card-title">Image Generator</h2>
                <p>
                  Generate stunning AI images with our advanced Image Generator.
                </p>
              </div>
            </div>

            {/* Card for Image Analyzer */}
            <div
              className="service-card"
              onClick={() => navigate("/ImageAnalyzer")}
            >
              <img
                className="card-background"
                src={imageAnalyzerBG}
                alt="Analyzer"
              />
              <div className="card-content">
                <h2 className="card-title">Image Analyzer</h2>
                <p>
                  Analyze images with precision using our Image Analyzer tool.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
