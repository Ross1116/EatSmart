import React from "react";
import { motion } from "framer-motion";
import diner from "../assets/diner.jpg";
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
    //   ease: [0.6, 0.01, -0.05, 0.95],
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
        <motion.div variants={itemMain} layoutId="main-image-1"  className="">
          <Image
            src={diner.src}
            className="w-[600px]" alt={""}/>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Loader;