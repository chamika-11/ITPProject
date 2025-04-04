import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="my-navbar">
      <div className="my-navbar-container">
        <div className="navbar-logo">
          <div className="school-name">
            <h1>Clinical Management System</h1>
          </div>
        </div>

        <button className="mobile-menu-btn" onClick={toggleMenu}>
          <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
        </button>

        <div className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
          <Link to="/Prescription" className="nav-link">
            Create Prescription
          </Link>
          <Link to="/PrescriptionView" className="nav-link">
            Patients Prescription
          </Link>
          <Link to="/search" className="nav-link">
            Search Prescription
          </Link>
          <Link to="/GiminiApi" className="nav-link">
            AI
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
