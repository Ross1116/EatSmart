import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-[#121405] to-transparent py-4 w-dvw z-20">
      <div className="container flex flex-col md:flex-row items-end justify-between">
        <div className="flex flex-col items-start justify-end text-sm">
          <h3 className="font-bold">EatSmart</h3>
          <p className="font-light">
            Your destination for everything food waste.
          </p>
        </div>
        <p className="mt-4 md:mt-0 text-sm">
          © 2024 EatSmart Inc. All rights reserved.
        </p>
      </div>
      <div className="pt-3 w-full container flex flex-col gap-3">
        <div className="h-[1px] w-full bg-background-950"></div>
        <div className="flex justify-between items-center">
          <div className="flex gap-4 pl-1 hover:cursor-pointer">
            <p className="underline hover:no-underline text-text-950 font-light text-xs">
              Website Privacy Notice
            </p>
            <p className="underline hover:no-underline text-text-950 font-light text-xs">
              Cookies
            </p>
            <p className="underline hover:no-underline text-text-950 font-light text-xs">
              Legal
            </p>
          </div>
          <div className="flex gap-4 pl-1 hover:cursor-pointer">
            <Link href="/" className="underline hover:no-underline text-text-950 font-light text-xs">
              Current Build
            </Link>
            <Link href="/iteration1" className="underline hover:no-underline text-text-950 font-light text-xs">
              Iteration 1 Build
            </Link>
            <Link href="/iteration2" className="underline hover:no-underline text-text-950 font-light text-xs">
              Iteration 2 Build
            </Link>
            <Link href="/iteration3" className="underline hover:no-underline text-text-950 font-light text-xs">
              Iteration 3 Build
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
