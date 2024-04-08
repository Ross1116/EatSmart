"use client";
import React, { Suspense } from "react";
import Quiz from "@/components/Quiz/QuizWrapper";
import { motion } from "framer-motion";

const NavBar = React.lazy(() => import("@/components/NavBar"));

export default function Infographics() {

  const stagger = {
    animate: {
        transition: {
            staggerChildren: 0.1,
            // delayChildren: 0.1,
        },
    }
}

const pageAnimation = {
  initial: {
      y: 200,
      scale: 0.8,
      opacity: 0,
  },
  animate: {
      y: 0,
      scale: 1,
      opacity: 1,
      transition: {
          duration: 1.4,
          ease: "backOut",
      },
  },
}

  return (
    <div>
      <Suspense>
        <NavBar />
      </Suspense>

      <motion.div
      initial="initial"
      animate="animate"
      variants={stagger}
       className="w-dvw h-dvh flex flex-col items-center justify-center gap-16">
      <motion.h1
      variants={pageAnimation}
       className="mt-24 text-center text-8xl font-bold">Infographics</motion.h1>
       <motion.div variants={pageAnimation}>
          <Quiz />
        </motion.div>
      </motion.div>

    </div>
  );
}
