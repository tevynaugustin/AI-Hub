import React from "react";
import { NavLink } from "react-router-dom";
import './navbar.css'

function Navbar() {
  return <div>
    <nav className="navbar">
  <div className="navbar-container">
    <NavLink to="/tech" className="nav-link">
      Tech
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
  </div>
</nav>
  </div>;
}

export default Navbar;
