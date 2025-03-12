import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "./Navbar.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="navbar">
      {/* Brand / Logo */}
      <div className="navbar-brand">
        <Link to="/" className="nav-link">
          SPA
        </Link>
      </div>

      {/* Menu Toggle Button */}
      <div className="navbar-menu" onClick={toggleMenu}>
        MENU
      </div>

      <motion.div
        className="navbar-links"
        initial={{ opacity: 1 }}
        style={{ pointerEvents: isMenuOpen ? "none" : "auto" }}
        animate={{
          opacity: isMenuOpen ? 0 : 1,
          transition: { duration: 0.75 },
        }}
      >
        <Link to="/about" className="nav-link">
          About
        </Link>
        <Link to="/contact" className="nav-link">
          Contact
        </Link>
      </motion.div>

      {/* Animated Dropdown */}
      <AnimatePresence mode="wait">
        {isMenuOpen && <DropDown />}
      </AnimatePresence>
    </div>
  );
}

const DropDown = () => {
  return (
    <motion.div
      key="dropdown"
      className="dropdown"
      initial={{ height: 0 }}
      animate={{ height: "auto" }}
      exit={{ height: 0 }}
      transition={{
        duration: 0.75,
        ease: [0.76, 0, 0.24, 1],
      }}
      style={{ overflow: "hidden" }}
    >
      <div className="dropdown-content">
        <Link to="/" className="nav-link">
          HOME
        </Link>
        <Link to="/about" className="nav-link">
          ABOUT
        </Link>
        <Link to="/contact" className="nav-link">
          CONTACT
        </Link>
      </div>
    </motion.div>
  );
};
