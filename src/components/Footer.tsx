import Link from "next/link";
import { Youtube, Twitter, Github } from "lucide-react";

export default function Footer() {
  return (
    <div className="bg-gradient-to-t from-background-50 to-transparent py-8 w-dvw z-20">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link className=" hover:text-gray-300" href="#">
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
          </Link>
        </div>
        <p className="mt-4 md:mt-0 text-sm text-gray-300">© 2024 EatSmart Inc. All rights reserved.</p>
      </div>
    </div>
  )
}