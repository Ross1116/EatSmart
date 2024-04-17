import React from "react";
import Link from "next/link";
import { animate, motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

export default function NavBar() {
  const GoogleSignInButton = () => {
    signIn("google");
  };

  const router = useRouter();

  return (
    <motion.div
      className="absolute justify-between px-36 top-0 left-0 text-lg z-50 flex items w-dvw mt-12 items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <div className="font-extrabold tracking-wider text-2xl hover:tracking-widest hover:font-black">
        <Link href="/">EatSmart</Link>
      </div>
      <div>
        <ul className="top-0 left-0 text-lg flex gap-20 font-medium">
          <li className="group relative flex flex-col">
            <Link
              className={
                usePathname() === "/iteration1" ? "underline underline-offset-8" : ""
              }
              href="/iteration1"
            >
              Home
              <div className="absolute w-2 h-2 top-8 left-5 bg-text-950 rounded-full scale-0 group-hover:scale-100 transition-transform ease-in"></div>
            </Link>
          </li>
          <li className="group relative flex flex-col">
            <Link
              className={
                usePathname() === "/iteration1/infographics"
                  ? "underline underline-offset-8"
                  : ""
              }
              href="/iteration1/infographics"
            >
              Infographics
              <div className="absolute w-2 h-2 top-8 left-12 bg-text-950 rounded-full scale-0 group-hover:scale-100 transition-transform ease-in"></div>
            </Link>
          </li>
          <li className="group relative flex flex-col">
            <Link
              className={
                usePathname() === "/iteration1/dashboard"
                  ? "underline underline-offset-8"
                  : ""
              }
              href="/iteration1/dashboard"
            >
              Dashboard (WIP)
              <div className="absolute w-2 h-2 top-8 left-16 bg-text-950 rounded-full scale-0 group-hover:scale-100 transition-transform ease-in"></div>
            </Link>
          </li>
          <li className="group relative flex flex-col">
            <button onClick={GoogleSignInButton}>
              <div className="absolute w-2 h-2 top-8 left-6 bg-text-950 rounded-full scale-0 group-hover:scale-100 transition-transform ease-in"></div>
              Sign In
            </button>
          </li>

          {/* <li>
            <Link href="/contact">Let&apos;s Work Together (WIP)</Link>
          </li> */}
        </ul>
      </div>
    </motion.div>
  );
}
