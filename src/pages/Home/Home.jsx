import { motion } from "framer-motion";
import Curve from "../../transitions/Curve.jsx";
import "./Home.css";
export default function Home() {
  return (
    <>
      <Curve>
        <div className="home-container">
          <motion.h1
            initial={{ y: 200 }}
            animate={{
              y: 0,
              transition: {
                delay: 0.3,
                duration: 0.75,
                ease: [0.76, 0, 0.24, 1],
              },
            }}
          >
            HOME
          </motion.h1>
        </div>
      </Curve>
    </>
  );
}
