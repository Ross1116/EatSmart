"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";
import LocomotiveScroll from "locomotive-scroll";
import Footer from "@/components/Footer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import NavBar from "@/components/NavBar";

export default function PantryItemPage() {
  const searchParams = useSearchParams();
  const pantryId = searchParams.get("pantryId");

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;

      const locomotiveScroll = new LocomotiveScroll({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true,
      });
    })();
  }, []);

  console.log(pantryId, "pantryId");
  return (
    <div className="flex flex-col gap-6">
      <NavBar />
      <div className="px-36">
        <h1 className="text-4xl mt-36 mb-8">PantryItem Page for {pantryId}</h1>
        <h4 className="mb-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{pantryId}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </h4>
        <div className="grid grid-cols-2 gap-6 mb-12">
          <div className="flex flex-col justify-start items-start gap-4">
            <Image
              src={
                "https://images.unsplash.com/photo-1621961458348-f013d219b50c?auto=format&fit=crop&w=1000&q=80"
              }
              height={900}
              width={900}
              alt="empty"
            />
            <div className="flex items-center justify-end gap-8 w-full">
              <button className="bg-blue-500 text-white px-6 py-2 rounded-md">
                Edit
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md">
                Delete
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-5xl">Item Name</h1>
            <div className="flex justify-between text-xl">
              <p>Category</p>
              <p>Expiry Date</p>
            </div>
            <div className="flex justify-between text-xl">
              <p>Date Added</p>
              <p>Quantity</p>
            </div>
            <div>
              <h3 className="list-heading">Storage Methods:</h3>
              <ul>
                <li>method 1</li>
                <li>method 2</li>
              </ul>
            </div>
            <div>
              <h3 className="list-heading">Decomposition Methods:</h3>
              <ul>
                <li>method 1</li>
                <li>method 2</li>
              </ul>
            </div>
          </div>
          <div className="h-96"></div>
        </div>

        <div>
          <h3 className="list-heading">Charity locations:</h3>
          <div className="bg-red-500 h-[80dvh] flex items-center justify-center">
            Iframe for the Map
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
