import React, { useState } from "react";
import Footer from '../footer/footer'
import "./Signup.css";
import "../../firebase";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import logo from '../../main images/logo.png';

// Component for user signup
function Signup() {
  // State variables for form inputs and error handling
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();

  // Function to handle user signup
  const handleSignUp = (e) => {
    e.preventDefault();
    const auth = getAuth();

    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Update display name after creating the user
        await updateProfile(auth.currentUser, { displayName });
        console.log(userCredential);
        navigate("/Signin");
      })
      .catch((error) => {
        console.log(error);

        switch (error.code) {
          case "auth/weak-password":
            setErrorMessage("Password should be at least 6 characters");
            break;
          case "auth/email-already-in-use":
            setErrorMessage("This email is already in use");
            break;
          default:
            setErrorMessage("An error occurred. Please try again.");
            break;
          case "auth/invalid-display-name":
            setErrorMessage("Please enter a display name.");
            break;
          case "auth/invalid-email":
            setErrorMessage("Email address is Invalid!");
            break;
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // JSX for the signup form
  return (
    <div className="sign-up-body">
      <img className="logo" src={logo} alt="" />
      <div className="sign-up-container">
        <div className="sign-up-header">
          <h2 className="sign-up-title">Sign Up</h2>
        </div>
        <form onSubmit={handleSignUp}>
          
          {/* Input for display name */}
          <label htmlFor="displayName">Enter your display name</label>
          <input
            required
            type="text"
            placeholder="Enter your display name"
            id="displayName"
            value={displayName}
            onChange={(e) => {
              setDisplayName(e.target.value);
            }}
          />

          {/* Input for email */}
          <label htmlFor="email">Enter an email</label>
          <input
            required
            type="email"
            placeholder="Enter an email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          {/* Input for password */}
          <label htmlFor="password">Enter a password</label>
          <input
            required
            type="password"
            placeholder="Enter a password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          {/* Signup button */}
          <button type="submit">Sign up</button>

          {/* Link to login */}
          <p className="login-link">
            Or <NavLink to={"/Signin"}>Log in</NavLink>
          </p>

          {/* Display error message */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          {/* Display loading message */}
          {loading && <p className="loading"></p>}
        </form>
      </div>
      <Footer/>
    </div>
  );
}

export default Signup;
