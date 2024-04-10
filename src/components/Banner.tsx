import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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

    const scrollRef = useRef(null);

    const { scrollYProgress } = useScroll({
      target: scrollRef,
      offset: ["start start", "0.5 start"],
    });
  
    const parallaxX1 = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
    const parallaxX2 = useTransform(scrollYProgress, [0, 1], ["0%", "-150%"]);

    return (
        <motion.div className="h-dvh leading-[140px] z-10 text-[135px] flex flex-col justify-between pb-[3vh]"
        variants={banner}
        initial="initial"
        animate="animate">
        <motion.h1 style={{ x: parallaxX1 }} className="text-left pt-[21vh]"
        variants={letterAnimation}>REDUCE</motion.h1> <br />
        <motion.h1 className="text-center whitespace-nowrap -ml-[5vw]"
        variants={letterAnimation}>
          FOOD WASTE,
        </motion.h1>
        <br />
        <motion.h1 style={{ x: parallaxX2 }} className="text-right whitespace-nowrap -mr-[2vw] mb-[2vh]"
        variants={letterAnimation}>SAVE CLIMATE!</motion.h1>
      </motion.div>
    );
};
