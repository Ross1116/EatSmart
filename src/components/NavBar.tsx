import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
      <div className="font-extrabold tracking-wider text-2xl">
        <Link href="/">EatSmart</Link>
      </div>
      <div>
        <ul className="top-0 left-0 text-lg flex gap-20 font-medium">
          <li>
            <Link
              className={
                usePathname() === "/" ? "underline underline-offset-8" : ""
              }
              href="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={
                usePathname() === "/infographics"
                  ? "underline underline-offset-8"
                  : ""
              }
              href="/infographics"
            >
              Infographics
            </Link>
          </li>
          <li>
            <Link
              className={
                usePathname() === "/dashboard"
                  ? "underline underline-offset-8"
                  : ""
              }
              href="/dashboard"
            >
              Dashboard (WIP)
            </Link>
          </li>
          <li>
            <button onClick={GoogleSignInButton}>Sign In</button>
          </li>
          {/* <li>
            <Link href="/contact">Let&apos;s Work Together (WIP)</Link>
          </li> */}
        </ul>
      </div>
    </motion.div>
  );
}
