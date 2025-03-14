import Curve from "../../transitions/Curve";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./Gallery.css";

export default function Gallery() {
  const images = [
    "./gallery.jpg",
    "./contact.jpg",
    "./home.jpg",
    "./about.jpg",
    "./services.jpg",
    "./gallery.jpg",
    "./contact.jpg",
    "./home.jpg",
  ];

  // Track the window scroll progress (0 to 1)
  const { scrollYProgress } = useScroll();

  const x = useTransform(scrollYProgress, [0, 1], ["35%", "-35%"]);
  const imgX = useTransform(scrollYProgress, [0, 1], [-200, 0]);

  return (
    <Curve>
      <motion.div className="gallery-container">
        <motion.div className="scroll-container" style={{ x }}>
          {images.map((item, index) => (
            <Image key={index} index={index} src={item} imgX={imgX} />
          ))}
        </motion.div>
      </motion.div>
    </Curve>
  );
}

const Image = ({ src, alt = "gallery-img", index, imgX }) => {
  return (
    <motion.div
      className="gallery-image-container"
      initial={{ y: 400 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.9,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.015 * index + 0.2,
      }}
    >
      <motion.img src={src} alt={alt} style={{ x: imgX }} />
    </motion.div>
  );
};
