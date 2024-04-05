import React, { Suspense,  useRef} from "react";
import LazyLoader from "@/utils/lazyLoader";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

export default function SplineWrapper() {


  return (
    <Suspense fallback={<LazyLoader delay={300}  />}>
        <Spline scene="https://prod.spline.design/DwFAYXJyneWm2UEQ/scene.splinecode" />   
    </Suspense>
  );
}
