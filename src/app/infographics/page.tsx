"use client";

import React, { Suspense, useEffect, useState, useRef } from "react";
import Quiz from "@/components/Quiz/QuizWrapper";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Footer from "@/components/Footer";
// @ts-ignore
import { TableauEmbed } from "@stoddabr/react-tableau-embed-live";
import straight_arrow from "@/assets/straight_arrow.svg";
import arrow from "@/assets/arrow.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";


const NavBar = React.lazy(() => import("@/components/NavBar"));
const SideMenuWrapper = React.lazy(
  () => import("@/components/SideMenu/SideMenuWrapper")
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
    <main className="flex min-h-screen flex-col items-center justify-center relative overflow-x-hidden">
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
        <div className="min-h-screen flex flex-col items-center justify-center gap-12 relative">
          <motion.h1
            variants={pageAnimation}
            className="font-bold text-7xl pt-32 text-center leading-none"
          >
            Food Waste Trends
            <br />
          </motion.h1>
          <motion.div variants={pageAnimation} className="relative w-full h-0">
            <div className="absolute top-0 right-0 flex justify-center items-start w-1/3 opacity-75">
              <p className="text-2xl font-bold text-start">
                scroll here to see the quiz
              </p>
              <Image
                className="dark:invert rotate-x-180 -mt-2"
                src={arrow}
                width={100}
                height={60}
                alt="arrow"
              />
            </div>

            <div className="absolute top-0 left-0 flex justify-center items-start w-1/3 opacity-75">
              <Image
                className="dark:invert rotate-180"
                src={arrow}
                width={100}
                height={60}
                alt="arrow"
              />
              <p className="text-2xl font-bold text-start ">
                scroll here to see the quiz
              </p>
            </div>
          </motion.div>

          <motion.div variants={pageAnimation} className="mx-36">
            <TableauEmbed
              width="1204"
              height="972"
              {...{ "hide-tabs": true }}
              toolbar="hidden"
              sourceUrl="https://public.tableau.com/views/redo_17133355945150/Dashboard1?:language=en-GB&publish=yes&:sid=&:display_count=n&:origin=viz_share_link"
            />
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
          className="relative px-36 flex flex-col items-center justify-center min-h-screen pb-12"
          whileInView={{ scale: 1, y: 0 }}
          initial={{ scale: 0.5, y: 100 }}
          transition={{ duration: 1, ease: "backOut" }}
        >
          <Quiz />
          <div className="absolute bottom-1/3 left-3/4 flex justify-center items-start w-1/3 opacity-75">
            <Image
              className="dark:invert rotate-y-180"
              src={straight_arrow}
              width={100}
              height={60}
              alt="arrow"
            />
            <p className="text-2xl font-bold text-center">
              Click on the card to reveal answers
            </p>
          </div>
        </motion.div>
      </motion.div>

      <div className="flex flex-col items-center jsutify-center my-2 mb-8 gap-4">
        <h4 className="text-2xl">Want to be able to manage your pantry and save food?</h4>
        <Button className="bg-primary-500 rounded-full text-text-50">
          <Link className="flex items-center gap-2" href="/dashboard">
            Learn More <ExternalLink />
          </Link>
        </Button>
      </div>

      <div>
        <Footer />
      </div>
    </main>
  );
}
