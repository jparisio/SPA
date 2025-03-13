import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Variants for letter animations
const letterVariants = {
  initial: { y: "100%" },
  animate: (index) => ({
    y: 0,
    transition: {
      duration: 1,
      delay: index * 0.02,
      ease: [0.76, 0, 0.24, 1],
    },
  }),
  exit: (index) => ({
    y: "100%",
    transition: {
      duration: 1,
      delay: index * 0.02,
      ease: [0.76, 0, 0.24, 1],
    },
  }),
};

// Animated Link Component
export default function AnimatedLink({ to, text, onMouseEnter }) {
  return (
    <Link to={to} className="nav-link" onMouseEnter={onMouseEnter}>
      {text.split("").map((letter, index) => (
        <motion.span
          key={index}
          style={{ display: "inline-block" }}
          variants={letterVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          custom={index}
        >
          {letter}
        </motion.span>
      ))}
    </Link>
  );
}
