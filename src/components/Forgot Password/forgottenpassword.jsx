// ForgotPassword.js
import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './forgottenpassword.css'

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const auth = getAuth();
  
    try {
      await sendPasswordResetEmail(auth, email);
    } finally {
        alert("Password reset email sent. Check your inbox!");
        navigate("/Signin");
    }
  };

  const accidentallyClicked = () => {
    navigate('/Signin')
  }
  

  return (
    <div className="forgot-password-container">
      <h2 className="forgot-password-title">Forgot Password</h2>
      <p>
        Enter your email address to receive a password reset link.
      </p>
      <form onSubmit={handleForgotPassword}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
        <p className="accidentally-clicked">Accidentally Clicked? <br/> <span className="acc-clicked-span" onClick={accidentallyClicked}>Click here to go back to the Login page.</span></p>
      </form>
    </div>
  );
}

export default ForgotPassword;
