import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./myaccount.css";
import {
  updateProfile,
  updatePassword,
  getAuth,
  EmailAuthProvider,
  reauthenticateWithCredential,
  verifyBeforeUpdateEmail,
  deleteUser
} from "firebase/auth";
import logo from '../../main images/logo.png';
import Footer from '../footer/footer';


function Myaccount() {
  // State variables for form inputs, error handling, and loading status
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newDisplayName, setNewDisplayName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();

  // Firebase authentication instance and current user
  const auth = getAuth();
  const user = auth.currentUser;

  // Reauthenticate function
  const reauthenticate = async () => {
    try {
      if (user) {
        // Prompt the user to re-enter their password
        const password = prompt("Please enter your password for reauthentication:");
        const credential = EmailAuthProvider.credential(
            user.email,
          password
        );

        // Reauthenticate the user
        return await reauthenticateWithCredential(user, credential);
      }
    } catch (err) {
      console.error("Reauthentication Error:", err);
      throw err;
    }
  };

  // Update form fields when currentUser changes
  useEffect(() => {
    if (user) {
      setNewEmail(user.email || "");
      setNewPassword("");
      setNewDisplayName(user.displayName || "");
      setLoading(false);
    }
  }, [user]);

  // Handler for updating email
  const handleUpdateEmail = async (e) => {
    e.preventDefault();

    try {
      setError(""); // Clear previous errors
      setSuccess(""); // Clear previous success messages

      if (user) {

        await reauthenticate(user); // Use the reauthenticate function
        await verifyBeforeUpdateEmail(user, newEmail);

        setSuccess(`Verification email has been sent to ${newEmail}. Please click on the link to verify and change your email.`);
      }
    } catch (err) {
      console.error("Update Email Error:", err);

      switch (err.code) {
        case "auth/missing-password":
          setError("Please enter your current password before updating your Email");
          break;

        case "auth/invalid-credential":
          setError("Invalid Email or Password. Please try again.");
          break;

        case "auth/operation-not-allowed":
          setError("Please verify the new email before changing email.");
          break;

        default:
          setError("Failed to update email");
      }
    }
  };

  // Handler for updating password
  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    try {
      if (user) {
        // Prompt user to reauthenticate
        await reauthenticate(user);

        // Update password after successful reauthentication
        await updatePassword(user, newPassword);
      }
      setSuccess("Your Password has been updated successfully");
      setError("");
    } catch (err) {
      console.error("Update Password Error:", err);
      setError("Failed to update password");
    }
  };

  // Handler for updating display name
  const handleUpdateDisplayName = async (e) => {
    e.preventDefault();

    try {
      if (user) {
        // Reauthenticate the user before updating the display name
        await reauthenticate(user);

        // Update the display name
        await updateProfile(user, {
          displayName: newDisplayName,
        });

        setSuccess("Your Display Name has been updated successfully");
        setError("");
      } else {
        setError("User not authenticated");
      }
    } catch (err) {
      console.error("Error updating display name:", err);

      switch (err.code) {
        case "auth/requires-recent-login":
          setError("User needs to reauthenticate. Please log in again.");
          break;

        default:
          setError("Failed to update display name");
      }
    }
  };

  // Navigate back to Home page
  const backToHome = () => {
    navigate("/Home");
  };

  // Handler for user deletion
  const userDeletion = () => {
    deleteUser(user).then(() => {
        setSuccess("User Deleted!");
        setTimeout(() => {
            navigate("/Signup");
        }, 1500);
    }).catch((error) => {
        setError("User Deletion Error:", error);
    });
  };

  // JSX for the Myaccount component
  return (
    <>
    <img className="my-account-logo" src={logo} alt="" />
    <div className="my-account-container">
      <h2>Update Account Details</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {/* Form for updating display name */}
      <form className="update-form" onSubmit={handleUpdateDisplayName}>
        <label>Display Name:</label>
        <input
          type="text"
          value={newDisplayName}
          onChange={(e) => setNewDisplayName(e.target.value)}
        />
        <button type="submit">Update Display Name</button>
      </form>

      {/* Form for updating email */}
      <form className="update-form" onSubmit={handleUpdateEmail}>
        <label>Email:</label>
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        {/* <label>Current Password:</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => {
            setCurrentPassword(e.target.value);
          }}
        /> */}
        <button type="submit">Update Email</button>
      </form>

      {/* Form for updating password */}
      <form className="update-form" onSubmit={handleUpdatePassword}>
        <label>Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit">Update Password</button>
      </form>

      {/* Button to navigate back to Home page */}
      <button className="back-button" onClick={backToHome}>
        Back to Home Page
      </button>

      {/* Button for user deletion */}
      <button className="delete-user" onClick={userDeletion}>Delete User</button>
    </div>
    <Footer/>
    </>
  );
}

export default Myaccount;
