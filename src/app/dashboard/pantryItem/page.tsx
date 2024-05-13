"use client";
import Image from "next/image";
import { useEffect, useContext, useState } from "react";
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
import { useSession } from "next-auth/react";
import { deleteItem, updateItem } from "@/lib/callAPI";
import { useRouter } from "next/navigation";

export default function PantryItemPage() {
  const router = useRouter();

  const { pantryItemProps } = useContext(PantryContext);

  const { data: session, status } = useSession();

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedData, setEditedData] = useState(pantryItemProps);

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
  }, []);

  const handleDelete = async (productId: any) => {
    const options = {
      id_token: (session as any).id_token,
      body: {
        id: pantryItemProps.id,
      },
    };

    try {
      const response = await deleteItem(options);
      console.log("Product deleted successfully:", response);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdate = async (productId: any) => {
    const options = {
      id_token: (session as any).id_token,
      body: editedData,
    };

    console.log("Edited Data", editedData)

    try {
      const response = await updateItem(options);
      console.log("Product updated successfully:", response);
      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

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
          <div className="flex">
            <h1 className="text-7xl font-semibold mt-4 mb-8">
              {isEditMode ? (
                <input
                  type="text"
                  name="name"
                  value={editedData.name}
                  onChange={handleInputChange}
                />
              ) : (
                editedData.name
              )}
            </h1>
            <div className="flex items-center justify-end gap-8 w-full">
              <button
                className="bg-primary-400 text-text-100 px-6 py-2 rounded-md"
                onClick={() => {
                  if (isEditMode) {
                    handleUpdate(pantryItemProps.id);
                  } else {
                    setIsEditMode(true);
                    setEditedData(pantryItemProps);
                  }
                }}
              >
                {isEditMode ? "Confirm Edits" : "Edit"}
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => handleDelete(pantryItemProps.id)}
              >
                Delete
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-12">
            <div className="flex flex-col justify-start items-start gap-4 ">
              <Image
                src={pantryItemProps.image}
                height={900}
                width={900}
                alt={pantryItemProps.name}
              />
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex justify-between text-xl">
                <p className="font-bold text-2xl">
                  Category:{" "}
                  {isEditMode ? (
                    <input
                      type="text"
                      name="category_name"
                      value={editedData.category_name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    editedData.category_name
                  )}
                </p>
                <p className="text-rose-600 font-medium">
                  Expiry Date:{" "}
                  {isEditMode ? (
                    <input
                      type="text"
                      name="expiry_date"
                      value={editedData.expiry_date}
                      onChange={handleInputChange}
                    />
                  ) : (
                    getDate(editedData.expiry_date)
                  )}
                </p>
              </div>
              <div className="flex justify-between text-xl">
                <p>
                  Added Date:{" "}
                  {isEditMode ? (
                    <input
                      type="text"
                      name="added_date"
                      value={editedData.added_date}
                      onChange={handleInputChange}
                    />
                  ) : (
                    getDate(editedData.added_date)
                  )}
                </p>
                <p>
                  Quantity:{" "}
                  {isEditMode ? (
                    <input
                      type="text"
                      name="quantity"
                      value={editedData.quantity}
                      onChange={handleInputChange}
                    />
                  ) : (
                    editedData.quantity
                  )}
                </p>
              </div>
              <div>
                <h3 className="list-heading">Storage Methods:</h3>
                <ul>
                  {pantryItemProps.category_pantry && (
                    <li>
                      This item is storable in pantry for{" "}
                      {pantryItemProps.category_pantry} days
                    </li>
                  )}
                  {pantryItemProps.category_refrigerate && (
                    <li>
                      This item is storable in refridgerator for{" "}
                      {pantryItemProps.category_refrigerate} days
                    </li>
                  )}
                  {pantryItemProps.category_freeze && (
                    <li>
                      This item is storable in freezer for{" "}
                      {pantryItemProps.category_freeze} days
                    </li>
                  )}
                </ul>
              </div>
              <div>
                <h3 className="list-heading">Decomposition Methods:</h3>
                <ul>
                  <li>{pantryItemProps.category_decompose}</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-semibold mb-2">Charity locations:</h3>
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
