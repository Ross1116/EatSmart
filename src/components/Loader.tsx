import React from "react";
import { motion } from "framer-motion";
import diner from "../assets/diner-1.webp";
import Image from "next/image";


const container = {
  show: {
    transition: {
      staggerChildren: 0.35,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 200 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.6,
    },
  },
  exit: {
    opacity: 0,
    y: -100,
    transition: {
      ease: "easeInOut",
      duration: 1.2,
    },
  },
};

const itemMain = {
  hidden: { opacity: 0, y: 200 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeInOut",
      duration: 1.6,
    },
  },
};

const Loader = ({ setLoading }: { setLoading: any }) => {
  return (
    <motion.div className="loader flex justify-center items-center h-dvh">
      <motion.div
        variants={container}
        onAnimationComplete={() => setLoading(false)}
        initial="hidden"
        animate="show"
        exit="exit"
        className="loader-inner"
      >
        <motion.div variants={itemMain} layoutId="main-image-1">
          <Image
            src={diner.src}
            className="w-[600px] rounded-xl" alt={""}
            width={400}
            height={400}/>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Loader;