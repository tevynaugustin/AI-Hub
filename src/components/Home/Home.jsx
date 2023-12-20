// Imports
import React , {useState} from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate, NavLink } from "react-router-dom";
import "./Home.css";
import Navbar from "../navbar/navbar";
import Typewriter from "typewriter-effect";
import bgImg from "./landing-pic.png";
import logo from "../../main images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
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
    const featuredFeedsTitle = document.getElementById("featured-feeds-title");

    if (featuredFeedsTitle) {
      featuredFeedsTitle.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    }
  };

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  // --------------------------------------------------------------------------------------------------------------------

  return (
    <div>
      <Navbar />
      <div className="home-body">
        <div className="landing-photo">
          <img src={bgImg} alt="" />
          <div className="menu-icon" onClick={toggleDropdown}>
          <div className={`dropdown ${isDropdownOpen ? 'open' : ''}`}>
            <div className="dropdown-content">
              <NavLink to="/myaccount" className="nav-link">
                My Account
              </NavLink>
            </div>
          </div>
            <FontAwesomeIcon icon={faBars} />
          </div>
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
          Step into the vibrant world of OPTIC, where the magic of AI comes to
          life! Explore the realm of limitless possibilities as you generate
          stunning AI images, engage in captivating conversations with our AI
          companions, and embark on a thrilling journey of discovery. OPTIC is
          not just a platform—it's an adventure waiting to unfold. Dive in and
          let the excitement begin!
        </p>

        <button className="logOut" onClick={handleLogOut}>
          Log Out
        </button>

        {/* Floating Arrow */}
        <div className="floating-arrow" onClick={scrollToFeaturedFeeds}></div>
      </div>
    </div>
  );
}

export default Home;
