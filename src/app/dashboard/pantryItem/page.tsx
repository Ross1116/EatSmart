"use client";
import Image from "next/image";
import { useEffect, useContext } from "react";
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
import PantryContext from "@/utils/PantryContext";
import { getDate } from "@/lib/date";
import GMap from "@/components/GMap";

export default function PantryItemPage() {
  const { pantryItemProps } = useContext(PantryContext);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;

      const locomotiveScroll = new LocomotiveScroll({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true,
      });
    })();
  }, []);

  useEffect(() => {
    console.log(pantryItemProps);
  }, [pantryItemProps]);


  return (
    <div className="flex flex-col gap-6">
      <NavBar />
      {pantryItemProps && (
        <div className="px-36 py-28">
          <h4>
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
                  <BreadcrumbPage>{pantryItemProps.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </h4>
          <h1 className="text-7xl font-semibold mt-4 mb-8">
            {pantryItemProps.name}
          </h1>
          <div className="grid grid-cols-2 gap-6 mb-12">
            <div className="flex flex-col justify-start items-start gap-4">
              <Image
                src={pantryItemProps.image}
                height={900}
                width={900}
                alt={pantryItemProps.name}
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

            <div className="flex flex-col gap-6">
              <div className="flex justify-between text-xl">
                <p className="font-bold text-2xl">Category: {}</p>
                <p className="text-rose-600 font-medium">
                  Expiry Date: {getDate(pantryItemProps.expiry_date)}
                </p>
              </div>
              <div className="flex justify-between text-xl">
                <p>Added Date: {getDate(pantryItemProps.added_date)}</p>
                <p>Quantity: {pantryItemProps.quantity}</p>
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
          </div>

          <div>
            <h3 className="list-heading">Charity locations:</h3>
            <div className="h-[80dvh] flex items-center justify-center">
              <GMap />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
