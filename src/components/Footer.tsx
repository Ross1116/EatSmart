import Link from "next/link";
// import { Youtube, Twitter, Github } from "lucide-react";

export default function Footer() {
  return (
    <div className="bg-[#121405] to-transparent py-4 w-dvw z-20 rounded-t-3xl">
      <div className="container flex flex-col md:flex-row items-end justify-between">
        <div className="flex flex-col items-start justify-end text-sm">
          {/* <Link className=" hover:text-gray-300" href="#">
            <Youtube className="h-6 w-6" />
            <span className="sr-only">YouTube</span>
          </Link>
          <Link className=" hover:text-gray-300" href="#">
            <Github className="h-6 w-6" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link className=" hover:text-gray-300" href="#">
            <Twitter className="h-6 w-6" />
            <span className="sr-only">Twitter</span>
          </Link> */}
          <h3 className="font-bold">EatSmart</h3>
          <p className="font-light">Your destination for everything food waste.</p>
        </div>
        <p className="mt-4 md:mt-0 text-sm">© 2024 EatSmart Inc. All rights reserved.</p>
      </div>
      <div className="pt-3 w-full px-72 flex flex-col gap-3">
        <div className="h-[1px] w-full bg-background-950"></div>
        <div className="flex gap-4 pl-1 hover:cursor-pointer">
          <p className="underline hover:no-underline text-text-950 font-light text-xs">Website Privacy Notice</p>
          <p className="underline hover:no-underline text-text-950 font-light text-xs">Cookies</p>
          <p className="underline hover:no-underline text-text-950 font-light text-xs">Legal</p>
        </div>
      </div>
    </div>
  )
}