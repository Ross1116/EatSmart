"use client";

import React, { Suspense, useEffect, useState, useRef } from "react";
import Quiz from "@/components/Quiz/QuizWrapper";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Footer from "@/components/Footer";
import { TableauEmbed } from "@stoddabr/react-tableau-embed-live";
import arrow from "@/assets/arrow.svg";
import Image from "next/image";

const NavBar = React.lazy(() => import("@/components/NavBar"));
const SideMenuWrapper = React.lazy(() =>
  import("@/components/SideMenu/SideMenuWrapper")
);

export default function Infographics() {
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollY } = useScroll();

  const windowSize = useRef([
    typeof window !== "undefined" ? window.innerWidth : 0,
    typeof window !== "undefined" ? window.innerHeight : 0,
  ]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest >= windowSize.current[1] * 0.5) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

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

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;

      const locomotiveScroll = new LocomotiveScroll({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true,
      });
    })();
  }, []);

  return (
    <main
      data-scroll-container
      className="flex min-h-screen flex-col items-center justify-center relative overflow-x-hidden"
    >
      <div className="absolute bg-gradient-to-b from-background-50 to-transparent z-20 top-0 left-0 w-full h-28">
        <Suspense>
          <NavBar />
        </Suspense>
      </div>

      <motion.div
        className="fixed z-20 right-10 top-10"
        initial={{ opacity: 1, scale: 0 }}
        animate={isScrolled ? { opacity: 1, y: 0, scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Suspense>
          <SideMenuWrapper />
        </Suspense>
      </motion.div>

      <motion.div
        initial="initial"
        animate="animate"
        variants={stagger}
        className="flex flex-col items-center justify-center gap-16"
      >
          
        <div className="min-h-screen flex flex-col items-center justify-center gap-12 ">
        <motion.h1 variants={pageAnimation} className="font-bold text-7xl pt-32">
            Infographics
          </motion.h1>

          <motion.div variants={pageAnimation} className="px-36 overflow-visible overflow-y-auto">
            <TableauEmbed width="1300" height="800" toolbar="hidden" sourceUrl="https://public.tableau.com/views/redo_17126241737300/Dashboard1?:language=en-US&:sid=&:display_count=n&:origin=viz_share_link" />
            {/* <tableau-viz
            id="tableau-viz"
            src="https://prod-apsoutheast-a.online.tableau.com/t/m180222760039070301bf1/views/Iteration1/Dashboard1"
            width="1512"
            height="698"
            toolbar="bottom"
          ></tableau-viz> */}
          </motion.div>
        </div>

        <motion.div
        className="px-36 flex flex-col items-center justify-center"
        whileInView={{ scale: 1, y: 0 }}
        initial={{ scale:0.5, y: 100 }}
        transition={{ duration: 1, ease: "backOut" }}>
          <Quiz />
        </motion.div>
      </motion.div>
      <div>
        <Footer />
      </div>
    </main>
  );
}
