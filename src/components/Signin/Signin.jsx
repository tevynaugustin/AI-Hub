import React, { useState } from "react";
import "./Signin.css";
import '../../firebase'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {NavLink, useNavigate } from "react-router-dom";
import logo from '../../main images/logo.png'

function Signin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate()

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log({ email, password });

    setLoading(true);

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate('/Home')
      })
      .catch((error) => {
        console.log(error);

        switch(error.code) {
          case "auth/invalid-credential":
            setErrorMessage("Whoops! Credentials are wrong, please try again! :)");
            break;
          case "auth/too-many-requests":
            setErrorMessage("Oops! Too many failed attempts :( You can reset your password here or try later.");
            break;
          }
      }).finally(() => {
        setLoading(false);
      })
  
  };

  const handleForgotPassword = async () => {
    navigate('/ForgotPassword');
  }

  return (
    <div className="sign-in-body">
      <img className="logo" src={logo} alt="" />
    <div className="sign-in-container">
      <div className="sign-in-header">
      <h2 className="sign-in-title">Log in</h2>
      </div>
      <form onSubmit={handleSignIn}>
        <label htmlFor="email">Enter your email</label>
        <input
        required
          type="email"
          id="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <label htmlFor="password">Enter your password</label>
        <input
        required
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button type="submit">Log In</button>

        <p className="sign-up-link">Or <NavLink to={'/Signup'}>Sign up</NavLink></p>
        <p className="forgotten-password" onClick={handleForgotPassword}>Forgot Password?</p>
        
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {loading && <p className="loading"></p>}
        
      </form>
    </div>
    </div>
  );
}

export default Signin;
