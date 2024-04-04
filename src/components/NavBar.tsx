import React from "react";
import Link from "next/link";

const NavBar: React.FC = () => {
  return (
    <div className="fixed justify-between px-36 top-0 left-0 text-lg z-50 flex items w-dvw mt-12 items-center">
      <div className="font-extrabold tracking-wider text-2xl"><Link href="#">EatSmart</Link></div>
      <div>
        <ul className="top-0 left-0 text-lg flex gap-20 font-medium">
          <li>
            <Link href="#">Home</Link>
          </li>
          <li>
            <Link href="/infographics">Infographics</Link>
          </li>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li><Link href="#">Sign Up</Link></li>
        </ul>
      </div>

      <div className="underline underline-offset-8 font-medium">
      <Link href="/contact">Let's Work Together</Link>
      </div>
    </div>
  );
};

export default NavBar;
