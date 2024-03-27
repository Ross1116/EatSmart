"use client";
import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import useMousePosition from "@/utils/useMousePosition";
import styles from "./page.module.scss";
import SplineWrapper from "@/components/SplineWrapper";

export default function Home() {
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);
  const [isHovered4, setIsHovered4] = useState(false);

  const { x, y } = useMousePosition();

  const size1 = isHovered1 ? 600 : 40;
  const size2 = isHovered2 ? 600 : 40;
  const size3 = isHovered3 ? 600 : 40;
  const size4 = isHovered4 ? 600 : 40;

  return (
    <main className={styles.main}>
      <div className="w-full h-full flex justify-start items-center bg-[#121405]">
        <p className="text-9xl font-extrabold text-start drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] pl-36">
          REDUCE <br />
          FOOD WASTE <br />
          SAVE <br />
          CLIMATE.
        </p>
      </div>

      <div className="w-full h-full">
        <div className="fixed top-0 left-0 w-dvw h-dvh -z-10">
          <SplineWrapper />
        </div>

        <Suspense>
          <motion.div
            className={styles.mask}
            animate={{
              WebkitMaskPosition: `${x - size1 / 2}px ${y - size1 / 2}px`,

              WebkitMaskSize: `${size1}px`, 
            }}
            transition={{ type: "just", ease: "backOut", duration: 0 }}
          >
            <p
              onMouseEnter={() => {
                setIsHovered1(true);
              }}
              onMouseLeave={() => {
                setIsHovered1(false);
              }}
              className="text-9xl font-bold text-center absolute"
            >
              Potential waste by an Apple
            </p>
          </motion.div>
          <div className={styles.body}>
            <p className="text-9xl font-extrabold text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              The Journey of an <br /> <span>Apple</span>
            </p>
          </div>
        </Suspense>

        <Suspense>
          <motion.div
            className={styles.mask}
            animate={{
              WebkitMaskPosition: `${x - size2 / 2}px ${y - size2 / 2}px`,

              WebkitMaskSize: `${size2}px`,
            }}
            transition={{ type: "tween", ease: "backOut", duration: 0.4 }}
          >
            <p
              onMouseEnter={() => {
                setIsHovered2(true);
              }}
              onMouseLeave={() => {
                setIsHovered2(false);
              }}
              className="text-9xl font-bold text-center absolute"
            >
              Potential waste by an Apple
            </p>
          </motion.div>
          <div className={styles.body}>
            <p className="text-9xl font-extrabold text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              The Journey of an <br /> <span>Apple</span>
            </p>
          </div>
        </Suspense>

        <motion.div
          className={styles.mask}
          animate={{
            WebkitMaskPosition: `${x - size3 / 2}px ${y - size3 / 2}px`,

            WebkitMaskSize: `${size3}px`,
          }}
          transition={{ type: "tween", ease: "backOut", duration: 0.4 }}
        >
          <p
            onMouseEnter={() => {
              setIsHovered3(true);
            }}
            onMouseLeave={() => {
              setIsHovered3(false);
            }}
            className="text-9xl font-bold text-center absolute"
          >
            Potential waste by an Apple
          </p>
        </motion.div>
        <div className={styles.body}>
          <p className="text-9xl font-extrabold text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            The Journey of an <br /> <span>Apple</span>
          </p>
        </div>

        <motion.div
          className={styles.mask}
          animate={{
            WebkitMaskPosition: `${x - size4 / 2}px ${y - size4 / 2}px`,

            WebkitMaskSize: `${size4}px`,
          }}
          transition={{ type: "tween", ease: "backOut", duration: 0.4 }}
        >
          <p
            onMouseEnter={() => {
              setIsHovered4(true);
            }}
            onMouseLeave={() => {
              setIsHovered4(false);
            }}
            className="text-9xl font-bold text-center absolute"
          >
            Potential waste by an Apple
          </p>
        </motion.div>
        <div className={styles.body}>
          <p className="text-9xl font-extrabold text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            The Journey of an <br /> <span>Apple</span>
          </p>
        </div>
      </div>
    </main>
  );
}
