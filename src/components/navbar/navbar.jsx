// Navbar.js
import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import logo from "../../main images/logo.png";
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
