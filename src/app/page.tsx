"use client";
import { useState, Suspense } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import useMousePosition from "@/utils/useMousePosition";
import styles from "../styles/page.module.scss";
import SplineWrapper from "@/components/SplineWrapper";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);

  const { x, y } = useMousePosition();

  const { scrollYProgress } = useScroll()

  const size = isHovered ? 500 : 40;

  useMotionValueEvent(scrollYProgress, "change", (latest: any) => {
    console.log("Page scroll: ", latest)
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative">
      <div className="w-full h-full ">
        <motion.div className="fixed top-0 left-0 w-dvw h-dvh"
        initial={{x:"25%", y: "-10%"}}
        animate={{
          x:
          scrollYProgress.get() >= 0.1 && scrollYProgress.get() < 0.2
            ? `${(scrollYProgress.get() / 0.2) * -25}%`
            : scrollYProgress.get() >= 0.2 && scrollYProgress.get() < 0.4
            ? "0%"
            : scrollYProgress.get() >= 0.4 && scrollYProgress.get() < 0.6
            ? `${(1 - (scrollYProgress.get() - 0.4) / 0.4) * 25}%`
            : scrollYProgress.get() >= 0.6 && scrollYProgress.get() < 0.8
            ? `${(scrollYProgress.get() - 0.6) / 0.2 * -25}%`
            : scrollYProgress.get() >= 0.8 && scrollYProgress.get() < 0.95
            ? "-15%"
            : scrollYProgress.get() >= 0.95
            ? "25%"
            : "25%",
          y:
          scrollYProgress.get() >= 0.2 ? `0%` : "-10%"
        }}
        transition={{ type: "tween", ease: "backOut", duration: 1 }}
        >
          <SplineWrapper />
        </motion.div>

        <motion.div
          className={styles.mask}
          animate={{
            WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,

            WebkitMaskSize: `${size}px`,
          }}
          transition={{ type: "just", ease: "backOut", duration: 0 }}
        >
          <div className="h-dvh w-full flex items-center justify-center"></div>
          <div className="h-dvh w-full flex items-center justify-center">
            <p
              onMouseEnter={() => {
                setIsHovered(true);
              }}
              onMouseLeave={() => {
                setIsHovered(false);
              }}
              className="text-9xl font-bold text-center"
            >
              Potential waste by an <br /> Apple
            </p>
          </div>
          <div className="h-dvh w-full flex items-center justify-center">
            <p
              onMouseEnter={() => {
                setIsHovered(true);
              }}
              onMouseLeave={() => {
                setIsHovered(false);
              }}
              className="text-9xl font-bold text-center"
            >
              Potential waste by an <br /> Apple
            </p>
          </div>
          <div className="h-dvh w-full flex items-center justify-center">
            <p
              onMouseEnter={() => {
                setIsHovered(true);
              }}
              onMouseLeave={() => {
                setIsHovered(false);
              }}
              className="text-9xl font-bold text-center"
            >
              Potential waste by an <br /> Apple
            </p>
          </div>
          <div className="h-dvh w-full flex items-center justify-center">
            <p
              onMouseEnter={() => {
                setIsHovered(true);
              }}
              onMouseLeave={() => {
                setIsHovered(false);
              }}
              className="text-9xl font-bold text-center"
            >
              Potential waste by an <br /> Apple
            </p>
          </div>
        </motion.div>

        <div className="snap-start w-full h-dvh flex justify-start items-center bg-[#121405] z-10">
          <p className="text-9xl font-extrabold text-start drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] pl-36">
            REDUCE <br />
            FOOD WASTE <br />
            SAVE <br />
            CLIMATE.
          </p>
        </div>

        <div className="snap-start h-dvh w-full flex items-center justify-center">
          <p className="text-9xl font-extrabold text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            The Journey of an <br />
            Apple
          </p>
        </div>
        <div className="h-dvh w-full flex items-center justify-center snap-start">
          <p className="text-9xl font-extrabold text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            The Journey of an <br />
            Apple
          </p>
        </div>
        <div className="h-dvh w-full flex items-center justify-center snap-start">
          <p className="text-9xl font-extrabold text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            The Journey of an <br />
            Apple
          </p>
        </div>
        <div className="h-dvh w-full flex items-center justify-center snap-start">
          <p className="text-9xl font-extrabold text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            The Journey of an <br />
            Apple
          </p>
        </div>

      </div>
    </main>
  );
}
