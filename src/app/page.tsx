"use client";
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { motion, AnimatePresence} from "framer-motion";
import useMousePosition from "@/utils/useMousePosition";
import SplineWrapper from "@/components/SplineWrapper";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowBigDown } from "lucide-react";
import styles from "../styles/page.module.scss";
import diner from "../assets/diner.jpg";
import NavBar from "../components/NavBar";
import Loader from "../components/Loader";
import Image from "next/image";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);

  const { x, y } = useMousePosition();

  const size = isHovered ? 500 : 40;

  const splineContainerRef = useRef(null);
  const timeline = useRef(null);

  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    timeline.current = gsap.timeline({
      scrollTrigger: {
        trigger: "#part1",
        start: "middle bottom",
        end: "bottom bottom",
        scrub: true,
      },
    });
    timeline.current
      .from(splineContainerRef.current, { opacity: 0 })
      .to(splineContainerRef.current, { opacity: 1, xPercent: 0 });

    timeline.current = gsap.timeline({
      scrollTrigger: {
        trigger: "#part2",
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
      },
    });
    timeline.current.to(splineContainerRef.current, { xPercent: 25 });

    timeline.current = gsap.timeline({
      scrollTrigger: {
        trigger: "#part3",
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
      },
    });
    timeline.current.to(splineContainerRef.current, { xPercent: -25 });
    timeline.current = gsap.timeline({
      scrollTrigger: {
        trigger: "#part4",
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
      },
    });
    timeline.current.to(splineContainerRef.current, {
      xPercent: 25,
      ease: "power2.inOut",
    });
  }, []);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;

      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);

  useEffect(() => {
    loading
      ? document.querySelector("body").classList.add("loading")
      : document.querySelector("body").classList.remove("loading");
  }, [loading]);

  return (
<main className="flex min-h-screen flex-col items-center justify-center relative overflow-x-hidden">
        {loading ? (
          <motion.div key='loader'>
            <Loader setLoading={setLoading} />
          </motion.div>
        ) : (
      <div className="w-full h-full ">
        <NavBar />

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

        <div className="w-dvw h-dvh flex flex-col justify-between bg-[#121405] text-[180px] font-extrabold px-36 leading-snug drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] relative text-text-50 dark:text-text-950">

          <div className="absolute text-base top-[24%] left-[62%] w-[19%] font-medium">
            Say goodbye to wasted resources and hello to informed decisions.
            Together, let&aposs transform food waste into a thing of the past.
          </div>

          <h1 className="text-left mt-[15vh]">REDUCE</h1> <br />
          <h1 className="text-center -ml-24 whitespace-nowrap">FOOD WASTE,</h1> <br />
          <h1 className="text-right z-10 whitespace-nowrap">SAVE CLIMATE!</h1>

          <motion.div className="absolute top-[90%] flex justify-center items-start mr-36" >
            <motion.div
                      layoutId='main-image-1'
                      transition={{
                        ease: "backOut",
                        duration: 1.4,
                      }}>
                        <Image
                    className="-mt-6 min-h-dvh bg-cover bg-[50%] bg-no-repeat rounded-3xl shadow-2xl"
                    src={diner.src} alt={""}            />
            <div className="absolute min-h-full inset-0 w-full overflow-hidden bg-background-50 bg-fixed opacity-75 -mt-6 rounded-3xl"></div>
            </motion.div>

            <div className="absolute bottom-1/4 left-1/2 size-6/12">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path
                  className="fill-background-100"
                  d="M53.4,-49.8C66.4,-40.4,72.2,-20.2,69.1,-3.1C66,14,53.9,27.9,40.9,43.1C27.9,58.3,14,74.7,-1.7,76.3C-17.3,78,-34.6,64.9,-43.4,49.7C-52.3,34.6,-52.7,17.3,-55.4,-2.7C-58.1,-22.7,-63.1,-45.4,-54.2,-54.8C-45.4,-64.2,-22.7,-60.4,-1.3,-59.1C20.2,-57.8,40.4,-59.2,53.4,-49.8Z"
                  transform="translate(100 100)"
                />
                <text
                  x="110"
                  y="100"
                  textAnchor="middle"
                  fontSize="16"
                  className="fill-text-950"
                >
                  Our Mission
                </text>
              </svg>
            </div>

            <div className="absolute text-xl font-normal text-right right-0 mr-36 w-1/3 mt-72">
              Explore our website, Learn simple tips and tricks to reduce your
              food waste and become a food waste warrior!
            </div>

            <div className="absolute text-2xl text-justify font-medium w-5/12 left-0 ml-36 mt-72">
              At EatSmart, we are dedicated to tackling the global issue of food
              waste. Through engaging education, practical strategies, and
              collaboration, we empower individuals, families, and businesses to
              reduce food waste across the entire food chain – from farm to
              table. We strive to create a more sustainable future where food is
              respected, resources are conserved, and hunger is alleviated.
            </div>
          </motion.div>
          <div className="absolute bottom-8 flex items-center justify-center">
            <svg
              width="294"
              height="294"
              viewBox="0 0 294 294"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="size-44 fill-text-100"
            >
              <path d="M 294 147 A 147 147 0 1 1 0 147 A 147 147 0 1 1 294 147" />
            </svg>

            <motion.svg
              viewBox="-40 -40 320 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="size-40 absolute"
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            >
              <path
                id="curve"
                d="M 240 120 A 120 120 0 1 1 0 120 A 120 120 0 1 1 240 120"
                fill="none"
              />
              <motion.text
                className="fill-text-950 font-outline-1"
                fontSize="40"
                textLength={`${Math.PI * 240 - 40}`}
              >
                <textPath href="#curve">SCROLL.DOWN.</textPath>
              </motion.text>
            </motion.svg>

            <ArrowBigDown className="absolute size-12 text-text-950" />
          </div>
        </div>

        <div className="snap-start h-dvh w-full flex items-center justify-center" id="part0"></div>
        <div
          className="snap-start h-dvh w-full flex items-center justify-center"
          id="part1"
        >
          <p className="text-9xl font-extrabold text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            The Journey of an <br />
            Apple
          </p>
        </div>

        <div
          className="h-dvh w-full flex items-center justify-center snap-start"
          id="part2"
        >
          <p className="text-9xl font-extrabold text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            The Journey of an <br />
            Apple
          </p>
        </div>

        <div
          className="h-dvh w-full flex items-center justify-center snap-start"
          id="part3"
        >
          <p className="text-9xl font-extrabold text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            The Journey of an <br />
            Apple
          </p>
        </div>

        <div
          className="h-dvh w-full flex items-center justify-center snap-start"
          id="part4"
        >
          <p className="text-9xl font-extrabold text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            The Journey of an <br />
            Apple
          </p>
        </div>
      </div>
    // </main>
     )}
     </main>
  );
}
