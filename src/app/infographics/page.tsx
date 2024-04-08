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
      },
    },
  };

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
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative overflow-x-hidden">

<div className="fixed bg-gradient-to-b from-background-50 to-transparent z-20 top-0 left-0 w-full h-28">
  <Suspense>
    <NavBar />
  </Suspense>
</div>


      <motion.div
        initial="initial"
        animate="animate"
        variants={stagger}
        className="flex flex-col items-center justify-center gap-16 mt-32"
      >
        <motion.h1 variants={pageAnimation} className="text-8xl font-bold">
          Infographics
        </motion.h1>
        <motion.div variants={pageAnimation}>
          <script
            type="module"
            src="https://prod-apsoutheast-a.online.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js"
          ></script>
          <tableau-viz
            id="tableau-viz"
            src="https://prod-apsoutheast-a.online.tableau.com/t/m180222760039070301bf1/views/Iteration1/Dashboard1"
            width="1512"
            height="698"
            toolbar="bottom"
          ></tableau-viz>
        </motion.div>
        <motion.div className="mb-32" variants={pageAnimation}>
          <Quiz />
        </motion.div>
      </motion.div>
    </main>
  );
}