"use client";

import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import React, { Suspense } from "react";
import LazyLoader from "@/utils/lazyLoader";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

export default function SplineWrapper() {
  const apple = useRef();
  const camera = useRef();
  const tree = useRef();
  const truck = useRef();
  const crate = useRef();

  gsap.registerPlugin(ScrollTrigger);

  function onLoad(spline) {
    apple.current = spline.findObjectByName("Apple_Model");
    camera.current = spline.findObjectByName("Camera");
    tree.current = spline.findObjectByName("Tree");
    truck.current = spline.findObjectByName("Truck");
    crate.current = spline.findObjectByName("Crate");

    setTimeout(() => {
      animateApple();
    }, 4500);
  }

  function animateApple() {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#part2",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      })
      .to(apple.current.position, {
        x: apple.current.position.x + 60,
        y: apple.current.position.y - 20,
        z: apple.current.position.z + 40,
        duration: 1,
        ease: "none",
      })
      .to(
        tree.current.position,
        {
          x: tree.current.position.x + 30,
          y: tree.current.position.y - 5,
          z: tree.current.position.z + 20,
          duration: 1,
          ease: "none",
        },
        "<"
      );
  }

  return (
    <div>
      <Suspense fallback={<LazyLoader delay={300} className="h-full w-full" />}>
        <Spline
          scene="https://prod.spline.design/DwFAYXJyneWm2UEQ/scene.splinecode"
          // onLoad={onLoad}
        />
      </Suspense>
    </div>
  );
}
