import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { signIn, useSession, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

export default function NavBar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const CognitoSignInButton = () => {
    signIn("cognito");
  };

  const CognitoSignOutButton = () => {
    console.log("sign out", process.env.NEXT_PUBLIC_COGNITO_LOGOUT);
    signOut({ redirect: false }).then(() =>
      router.push(process.env.NEXT_PUBLIC_COGNITO_LOGOUT));
    // signOut({ redirect: false }).then(() => router.push(`${process.env.COGNITO_LOGOUT}`));
  };

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
                usePathname() === "/" ? "underline underline-offset-8" : ""
              }
              href="/"
            >
              Home
              <div className="absolute w-2 h-2 top-8 left-5 bg-text-950 rounded-full scale-0 group-hover:scale-100 transition-transform ease-in"></div>
            </Link>
          </li>
          <li className="group relative flex flex-col">
            <Link
              className={
                usePathname() === "/infographics"
                  ? "underline underline-offset-8"
                  : ""
              }
              href="/infographics"
            >
              Infographics
              <div className="absolute w-2 h-2 top-8 left-12 bg-text-950 rounded-full scale-0 group-hover:scale-100 transition-transform ease-in"></div>
            </Link>
          </li>
          <li className="group relative flex flex-col">
            <Link
              className={
                usePathname() === "/dashboard"
                  ? "underline underline-offset-8"
                  : ""
              }
              href="/dashboard"
            >
              Dashboard
              <div className="absolute w-2 h-2 top-8 left-16 bg-text-950 rounded-full scale-0 group-hover:scale-100 transition-transform ease-in"></div>
            </Link>
          </li>
          <li className="group relative flex flex-col">
            {status === "authenticated" ? (
              <button onClick={CognitoSignOutButton}>
                <div className="absolute w-2 h-2 top-8 left-6 bg-text-950 rounded-full scale-0 group-hover:scale-100 transition-transform ease-in"></div>
                Sign Out
              </button>
            ) : (
              <button onClick={CognitoSignInButton}>
                <div className="absolute w-2 h-2 top-8 left-6 bg-text-950 rounded-full scale-0 group-hover:scale-100 transition-transform ease-in"></div>
                Sign In
              </button>
            )}
          </li>

          {/* <li>
            <Link href="/contact">Let&apos;s Work Together (WIP)</Link>
          </li> */}
        </ul>
      </div>
    </motion.div>
  );
}
