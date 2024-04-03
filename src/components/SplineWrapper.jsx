import React, { Suspense,  useRef} from "react";
import LazyLoader from "@/utils/lazyLoader";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

export default function SplineWrapper() {


  return (
    <Suspense fallback={<LazyLoader delay={300}  />}>
        <Spline scene="https://prod.spline.design/DwFAYXJyneWm2UEQ/scene.splinecode" />   
    </Suspense>
  );
}
