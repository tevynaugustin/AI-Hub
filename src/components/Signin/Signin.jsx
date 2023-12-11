import React, { useState } from "react";
import "./Signin.css";
import '../../firebase'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {NavLink, useNavigate } from "react-router-dom";

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

        if (error.code === "auth/invalid-credential") {
          setErrorMessage("Whoops! Credentials are wrong, please try again! :)")
        } else {
          setErrorMessage("An error occurred :/")
        }

        if (error.code === "auth/too-many-requests") {
          setErrorMessage("Oops! Too many failed attempts :( You can reset your password here or try later.");
        } else {
          setErrorMessage("An error occurred :/.. Please try again")
        }
      }).finally(() => {
        setLoading(false);
      })
  
  };

  return (
    <div className="sign-in-body">
    <div className="sign-in-container">
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

        <p></p>
        <p>Or <NavLink to={'/Signup'}>Sign up</NavLink></p>
        
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {loading && <p className="loading"></p>}
        
      </form>
    </div>
    </div>
  );
}

export default Signin;
