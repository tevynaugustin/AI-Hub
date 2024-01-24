// Imports
import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './forgottenpassword.css'
import logo from '../../main images/logo.png'

function ForgotPassword() {
  // State for the user's email
  const [email, setEmail] = useState("");
  // Hook to navigate between pages
  const navigate = useNavigate();

  // Function to handle the password reset process
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      // Send a password reset email
      await sendPasswordResetEmail(auth, email);
    } finally {
      // Alert the user and navigate to the Signin page
      alert("Password reset email sent. Check your inbox!");
      navigate("/Signin");
    }
  };

  // Function to navigate back to the Signin page if clicked accidentally
  const accidentallyClicked = () => {
    navigate('/Signin')
  }

  return (
    <>
      {/* Logo */}
      <img className="logo" src={logo} alt="" />
      {/* Container for the Forgot Password section */}
      <div className="forgot-password-container">
        {/* Title */}
        <h2 className="forgot-password-title">Forgot Password</h2>
        {/* Instruction */}
        <p>
          Enter your email address to receive a password reset link.
        </p>
        {/* Form for submitting email */}
        <form onSubmit={handleForgotPassword}>
          {/* Email input */}
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* Button to reset password */}
          <button type="submit">Reset Password</button>
          {/* Option to navigate back to the Signin page */}
          <p className="accidentally-clicked">Accidentally Clicked? <br/> <span className="acc-clicked-span" onClick={accidentallyClicked}>Click here to go back to the Login page.</span></p>
        </form>
      </div>
    </>
  );
}

export default ForgotPassword;
