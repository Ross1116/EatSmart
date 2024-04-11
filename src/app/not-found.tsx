"use client";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { ArrowUpLeftFromCircle } from "lucide-react";
import { useRouter } from "next/navigation";

function NotFoundPage() {
  const router = useRouter();
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className="h-screen flex flex-col gap-12 justify-center items-center">
        <h1 className="text-7xl text-center font-extrabold w-1/2">
          This page is currently under construction please come back later
        </h1>
        <Button
          onClick={() => router.back()}
          className="bg-primary-500 rounded-3xl text-text-50 flex flex-row justify-center gap-2"
        >
          <ArrowUpLeftFromCircle />Go Back
        </Button>
      </div>
      <Footer />
    </div>
  );
}

export default NotFoundPage;
