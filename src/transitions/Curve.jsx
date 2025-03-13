import { useState, useEffect } from "react";
import { delay, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import "./Curve.css";

const anim = (variants) => ({
  initial: "initial",
  animate: "enter",
  exit: "exit",
  variants,
});

export default function Curve({ children }) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Get the name of the path we're moving to
  const location = useLocation();
  const locationDict = {
    "/": "SPA",
    "/about": "ABOUT",
    "/contact": "CONTACT",
    "/gallery": "GALLERY",
  };

  const text = {
    initial: {
      opacity: 1,
    },
    enter: {
      opacity: 0,
      top: -100,
      transition: {
        delay: 0.3,
        duration: 0.75,
        ease: [0.76, 0, 0.24, 1],
      },
      transitionEnd: {
        top: "47.5%",
      },
    },
    exit: {
      opacity: 1,
      top: "40%",
      transition: {
        duration: 0.75,
        delay: 0.3,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };
  return (
    <div className="curve-transition">
      <motion.div
        className="temp-bg"
        style={{ opacity: dimensions.width > 0 ? 0 : 1 }}
      />
      <motion.h1 className="curve-title" {...anim(text)}>
        {locationDict[location.pathname]}
      </motion.h1>
      {dimensions.width > 0 && <SVG {...dimensions} />}
      {children}
    </div>
  );
}

const SVG = ({ width, height }) => {
  //svg initial and target paths
  const initialPath = `
  M0 300 
  Q${width / 2} 0 ${width} 300 
  L${width} ${height + 300} 
  Q${width / 2} ${height + 600} 0 ${height + 300}
  L0 300`;

  const targetPath = `
  M0 300 
  Q${width / 2} 0 ${width} 300 
  L${width} ${height} 
  Q${width / 2} ${height} 0 ${height}
  L0 300`;

  //animate the svg path
  const curve = {
    initial: {
      d: initialPath,
    },
    enter: {
      d: targetPath,
      transition: {
        duration: 0.75,
        delay: 0.3,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    exit: {
      d: initialPath,
      transition: {
        duration: 0.75,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  //animate svg container
  const slide = {
    initial: { top: "-300px" },
    enter: {
      top: "-100vh",
      transition: {
        duration: 0.75,
        delay: 0.3,
        ease: [0.76, 0, 0.24, 1],
      },
      transitionEnd: {
        top: "100vh",
      },
    },
    exit: {
      top: "-300px",
      transition: {
        duration: 0.75,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  return (
    <motion.svg {...anim(slide)}>
      <motion.path {...anim(curve)}></motion.path>
    </motion.svg>
  );
};
