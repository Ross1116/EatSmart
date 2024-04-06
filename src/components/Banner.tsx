import React from 'react';
import { motion } from 'framer-motion';

const banner = {
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    }
}

const letterAnimation = {
    initial: {
        y: 200,
        scale: 0.8,
    },
    animate: {
        y: 0,
        scale: 1,
        transition: {
            duration: 1,
            ease: "backOut",
        },
    },
}

export default function Banner() {

    return (
        <motion.div className="h-dvh leading-[140px] z-10 mt-[21vh]"
        variants={banner}
        initial="initial"
        animate="animate">
        <motion.h1 className="text-left"
        variants={letterAnimation}>REDUCE</motion.h1> <br />
        <motion.h1 className="text-center -ml-24 whitespace-nowrap"
        variants={letterAnimation}>
          FOOD WASTE,
        </motion.h1>
        <br />
        <motion.h1 className="text-right whitespace-nowrap"
        variants={letterAnimation}>SAVE CLIMATE!</motion.h1>
      </motion.div>
    );
};
