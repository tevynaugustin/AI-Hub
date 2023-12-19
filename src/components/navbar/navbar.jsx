// Navbar.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import './navbar.css';

function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="menu-icon" onClick={toggleDropdown}>
            <FontAwesomeIcon icon={faBars} />
          </div>
          <NavLink to="/imagegenerator" className="nav-link">
            Image Generator
          </NavLink>
          <NavLink to="/reviews" className="nav-link">
            Reviews
          </NavLink>
          <NavLink to="/science" className="nav-link">
            Science
          </NavLink>
          <NavLink to="/entertainment" className="nav-link">
            Entertainment
          </NavLink>
          <div className={`dropdown ${isDropdownOpen ? 'open' : ''}`}>
            <div className="dropdown-content">
              <NavLink to="/myaccount" className="nav-link">
                My Account
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
