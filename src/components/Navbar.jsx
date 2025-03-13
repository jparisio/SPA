import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "./Navbar.css";
import AnimatedLink from "./AnimatedLink.jsx";

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
  const [image, setImage] = useState("./home.jpg");
  const [isAnimating, setIsAnimating] = useState(true);
  const [queue, setQueue] = useState(null);
  // Ref to ensure onAnimationComplete only unlocks once per update
  const animationCompleteCalledRef = useRef(false);

  const imageMap = {
    HOME: "./home.jpg",
    ABOUT: "./about.jpg",
    CONTACT: "./contact.jpg",
    GALLERY: "./gallery.jpg",
    SERVICES: "./services.jpg",
    CAREERS: "./careers.jpg",
  };

  const updateImage = (newImage) => {
    // Only update if we're not mid-animation and the new image is different
    if (!isAnimating && image !== newImage) {
      setIsAnimating(true); // Lock updates
      animationCompleteCalledRef.current = false; // Reset the flag for the new image
      setImage(newImage);
    } else if (image !== newImage) {
      setQueue(newImage);
    }
  };

  useEffect(() => {
    if (queue != image && !isAnimating && queue != null) {
      updateImage(queue);
      setQueue(null);
    }
  }, [queue, isAnimating]);

  // This handler may be called twice (for the exiting and entering image).
  // We only want to unlock once.
  const handleAnimationComplete = () => {
    if (!animationCompleteCalledRef.current) {
      animationCompleteCalledRef.current = true;
      setIsAnimating(false);
    }
  };

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
        <div className="dropdown-links">
          <AnimatedLink
            to="/"
            text="HOME"
            onMouseEnter={() => updateImage(imageMap.HOME)}
          />
          <AnimatedLink
            to="/about"
            text="ABOUT"
            onMouseEnter={() => updateImage(imageMap.ABOUT)}
          />
          <AnimatedLink
            to="/contact"
            text="CONTACT"
            onMouseEnter={() => updateImage(imageMap.CONTACT)}
          />
        </div>
        <div className="dropdown-links">
          <AnimatedLink
            to="/gallery"
            text="GALLERY"
            onMouseEnter={() => updateImage(imageMap.GALLERY)}
            reverse={true}
          />
          <AnimatedLink
            to="/about"
            text="SERVICES"
            onMouseEnter={() => updateImage(imageMap.SERVICES)}
            reverse={true}
          />
          <AnimatedLink
            to="/contact"
            text="CAREERS"
            onMouseEnter={() => updateImage(imageMap.CAREERS)}
            reverse={true}
          />
        </div>
        <div className="menu-img">
          <AnimatePresence mode="sync">
            <motion.img
              key={image} // key forces remount so the animation re-triggers
              src={image}
              initial={{ y: "-100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="image"
              onAnimationComplete={handleAnimationComplete}
            />
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
