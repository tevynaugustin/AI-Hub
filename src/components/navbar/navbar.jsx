import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../main images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import './navbar.css';

// Navbar component
function Navbar() {
  // State variable to manage dropdown menu
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Function to toggle dropdown menu
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // JSX for the Navbar
  return (
    <div>
      <nav className="navbar">

        {/* Hamburger menu icon */}
        <div className="menu-icon" onClick={toggleDropdown}>
          <div className={`dropdown ${isDropdownOpen ? 'open' : ''}`}>

            {/* Dropdown content */}
            <div className="dropdown-content">
              <NavLink to="/myaccount" className="nav-link">
                My Account
              </NavLink>
            </div>
          </div>

          {/* Hamburger icon */}
          <FontAwesomeIcon icon={faBars} />
        </div>

        {/* Logo */}
        <img className="logo-home" src={logo} alt="" />

        {/* Navigation links */}
        <div className="navbar-container">
          <NavLink to="/imagegenerator" className="nav-link">
            Image Generator
          </NavLink>
          <NavLink to="/lumina" className="nav-link">
            Lumina
          </NavLink>
          <NavLink to="/ImageAnalyzer" className="nav-link">
            Vision
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
