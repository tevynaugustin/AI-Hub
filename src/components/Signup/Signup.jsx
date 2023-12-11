import React, { useState } from "react";
import "./Signup.css";
import "../../firebase";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Update display name after creating the user
        await updateProfile(auth.currentUser, { displayName });
        console.log(userCredential);
        navigate("/Signin");
      })
      .catch((error) => {
        console.log(error);

        if (error.code === "auth/weak-password") {
          setErrorMessage("Password should be at least 6 characters");
        } else if (error.code === "auth/email-already-in-use") {
          setErrorMessage("This email is already in use");
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      });
  };

  return (
    <div className="sign-up-container">
      <form onSubmit={handleSignUp}>
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

        <button type="submit">Sign up</button>

        <p>
          Or <NavLink to={"/Signin"}>Sign in</NavLink>
        </p>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default Signup;
