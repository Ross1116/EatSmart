"use client";
import { useState, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import useMousePosition from "@/utils/useMousePosition";
import styles from "../styles/page.module.scss";
import SplineWrapper from "@/components/SplineWrapper";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);

  const { x, y } = useMousePosition();

  const size = isHovered ? 500 : 40;

  const splineContainerRef = useRef(null);
  const timeline = useRef(null);
 
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

  timeline.current = gsap.timeline({
    scrollTrigger: {
      trigger: "#part1",
      start: "middle bottom",
      end: "bottom bottom",
      markers: true,
      scrub: true,
    }
  });
  timeline.current
  .from(splineContainerRef.current, { opacity: 0})
  .to(splineContainerRef.current, { opacity: 1, xPercent: 0});

  timeline.current = gsap.timeline({
    scrollTrigger: {
      trigger: "#part2",
      start: "top bottom",
      end: "bottom bottom",
      markers: true,
      scrub: true,
    }
  });
  timeline.current
  .to(splineContainerRef.current, { xPercent: 25});

  timeline.current = gsap.timeline({
    scrollTrigger: {
      trigger: "#part3",
      start: "top bottom",
      end: "bottom bottom",
      markers: true,
      scrub: true,
    }
  });
  timeline.current
  .to(splineContainerRef.current, { xPercent: -25});
  timeline.current = gsap.timeline({
    scrollTrigger: {
      trigger: "#part4",
      start: "top bottom",
      end: "bottom bottom",
      markers: false,
      scrub: true,
    }
  });
  timeline.current
  .to(splineContainerRef.current, { xPercent: 25, ease: "power2.inOut"});
  }, []);
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative">
      <div className="w-full h-full ">
        <div 
        className="fixed top-0 left-0 w-dvw h-dvh"
        ref={splineContainerRef}
        >
          <SplineWrapper />
        </div>

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

        <div className="snap-start h-dvh w-full flex items-center justify-center" id="part1">
          <p className="text-9xl font-extrabold text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            The Journey of an <br />
            Apple
          </p>
        </div>
        <div className="h-dvh w-full flex items-center justify-center snap-start" id="part2">
          <p className="text-9xl font-extrabold text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            The Journey of an <br />
            Apple
          </p>
        </div>
        <div className="h-dvh w-full flex items-center justify-center snap-start" id="part3">
          <p className="text-9xl font-extrabold text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            The Journey of an <br />
            Apple
          </p>
        </div>
        <div className="h-dvh w-full flex items-center justify-center snap-start" id="part4">
          <p className="text-9xl font-extrabold text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            The Journey of an <br />
            Apple
          </p>
        </div>

      </div>
    </main>
  );
}
