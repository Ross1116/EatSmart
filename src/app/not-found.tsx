"use client";

import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { ArrowUpLeftFromCircle } from "lucide-react";
// import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

function NotFoundPage() {
  // const router = useRouter();

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const pageAnimation = {
    initial: {
      y: 200,
      scale: 0.8,
      opacity: 0,
    },
    animate: {
      y: 0,
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.4,
        ease: "backOut",
      },
    },
  };

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <motion.div
        initial="initial"
        animate="animate"
        variants={stagger}
        className="h-screen flex flex-col gap-12 justify-center items-center"
      >
        <motion.h1
          variants={pageAnimation}
          className="text-7xl text-center font-extrabold w-1/2"
        >
          Whoops!
        </motion.h1>
        <motion.p
          variants={pageAnimation}
          className="text-xl text-center font-semibold w-[35%]"
        >
          The page you are looking for does not exist or is under construction.
          Please go back to the previous page.
        </motion.p>
        <motion.div variants={pageAnimation}>
          <Link href="/">
            <Button
              // onClick={() => router.back()}
              className="bg-primary-500 rounded-3xl text-text-50 flex flex-row justify-center gap-2 font-semibold hover:text-text-950 hover:bg-background-50 hover:ring-2 hover:ring-background-950"
            >
              <ArrowUpLeftFromCircle />
              Home
            </Button>
          </Link>
        </motion.div>
      </motion.div>
      <Footer />
    </div>
  );
}

export default NotFoundPage;
