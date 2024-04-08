"use client";
import React, { Suspense } from "react";
import Quiz from "@/components/Quiz/QuizWrapper";

const NavBar = React.lazy(() => import("@/components/NavBar"));

export default function Infographics() {
  return (
    <div>
      <Suspense>
        <NavBar />
      </Suspense>

      <div className="w-dvw h-dvh flex flex-col items-center justify-center gap-16">
      <h1 className="mt-24 text-center text-8xl font-bold">Infographics</h1>
      <div className="flex items-center justify-center">
        <Quiz />
      </div>
      </div>

    </div>
  );
}
