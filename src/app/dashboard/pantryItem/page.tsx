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
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import NavBar from "@/components/NavBar";
import PantryContext from "@/utils/PantryContext";
import { getDate } from "@/lib/date";
import GMap from "@/components/GMap";
import { useSession } from "next-auth/react";
import { deleteItem, updateItem } from "@/lib/callAPI";
import { useRouter } from "next/navigation";
import { getCategories } from "@/lib/callAPI";
import { CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandEmpty,
  CommandGroup,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";

export default function PantryItemPage() {
  const router = useRouter();

  const { pantryItemProps } = useContext(PantryContext);

  const { data: session, status } = useSession();

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedData, setEditedData] = useState(pantryItemProps);

  const [categories, setCategories] = useState([]);

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
    const options = {
      id_token: (session as any).id_token,
    };
    getCategories(options)
      .then((res) => {
        setCategories(
          res.data.map((item: any) => ({
            label: item.name,
            value: item.id,
            type: item.type,
          }))
        );
        console.log(
          "Categories",
          res.data.map((item: any) => ({
            label: item.name,
            value: item.id,
            type: item.type,
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
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
      item_id: editedData.id,
      body: {
        name: editedData.name,
        category_id: editedData.category_id,
        expiry_date: editedData.expiry_date,
        quantity: editedData.quantity,
      },
    };

    console.log("Edited Data", editedData);

    try {
      const response = await updateItem(options);
      console.log("Product updated successfully:", response);
      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleExpiryDateChange = (date: any) => {
    setEditedData((prevData) => ({
      ...prevData,
      expiry_date: date ? date.getTime() / 1000 : Date.now() / 1000,
    }));
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
        <div className="px-36 py-20">
          <h4 className="flex items-start justify-between my-7">
            <Breadcrumb className="w-full">
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
                  <BreadcrumbPage>{editedData.category_name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </h4>
          <div className="grid grid-cols-2 gap-10 mb-12">
            <div className="flex flex-col justify-start items-start gap-4">
              <Image
                src={pantryItemProps.image}
                height={900}
                width={900}
                alt={pantryItemProps.name}
              />
            </div>

            <div className="flex flex-col gap-4 justify-start relative">
              <div className="flex">
                <h1 className="text-7xl font-normal w-full">
                  {isEditMode ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between w-full text-7xl h-fit",
                            !editedData.category_id && "text-muted-foreground"
                          )}
                        >
                          {editedData.category_id
                            ? categories.find(
                                (category) =>
                                  category.value === editedData.category_id
                              )?.label
                            : "Select category"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-0">
                        <Command className="bg-accent-50">
                          <CommandInput
                            placeholder="Search Categories..."
                            className="h-9"
                          />
                          <CommandEmpty>No category found.</CommandEmpty>
                          <CommandGroup>
                            <ScrollArea className="h-56">
                              {categories.map((category) => (
                                <CommandItem
                                  value={category.label}
                                  key={category.value}
                                  onSelect={() => {
                                    const selectedCategory = categories.find(
                                      (cat) => cat.value === category.value
                                    );
                                    setEditedData((prevData) => ({
                                      ...prevData,
                                      category_id: category.value,
                                      category_name: category.label,
                                      category_type:
                                        selectedCategory?.type || "",
                                    }));
                                  }}
                                  className="hover:cursor-pointer hover:bg-background-800 hover:text-text-50"
                                >
                                  {category.label}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      category.value === editedData.category_id
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </ScrollArea>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  ) : (
                    editedData.category_name
                  )}
                  {/* {isEditMode ? (
                    <input
                      type="text"
                      name="name"
                      value={editedData.name}
                      onChange={handleInputChange}
                      className="w-full bg-secondary-50 p-2 rounded-2xl px-5"
                    />
                  ) : (
                    editedData.name
                  )} */}
                </h1>
              </div>
              <div className="flex justify-between text-xl">
                <p className="font-extralight text-2xl">
                  Category: {editedData.category_type}
                  {/* {isEditMode ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !editedData.category_id && "text-muted-foreground"
                          )}
                        >
                          {editedData.category_id
                            ? categories.find(
                                (category) =>
                                  category.value === editedData.category_id
                              )?.label
                            : "Select category"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-0">
                        <Command className="bg-accent-50">
                          <CommandInput
                            placeholder="Search Categories..."
                            className="h-9"
                          />
                          <CommandEmpty>No category found.</CommandEmpty>
                          <CommandGroup>
                            <ScrollArea className="h-56">
                              {categories.map((category) => (
                                <CommandItem
                                  value={category.label}
                                  key={category.value}
                                  onSelect={() => {
                                    setEditedData((prevData) => ({
                                      ...prevData,
                                      category_id: category.value,
                                    }));
                                  }}
                                  className="hover:cursor-pointer hover:bg-background-800 hover:text-text-50"
                                >
                                  {category.label}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      category.value === editedData.category_id
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </ScrollArea>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  ) : (
                    editedData.category_name
                  )} */}
                </p>
              </div>
              <div className="h-[1px] bg-background-900"></div>
              <div className="text-rose-500 font-bold text-lg grid grid-cols-2 mt-2">
                <span>Expiry Date: </span>
                {isEditMode ? (
                  <Popover modal={true}>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal w-1/2",
                          !editedData.expiry_date && "text-muted-foreground"
                        )}
                      >
                        {editedData.expiry_date ? (
                          format(new Date(editedData.expiry_date * 1000), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 bg-background-50 focus:bg-red-400"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={
                          editedData.expiry_date
                            ? new Date(editedData.expiry_date * 1000)
                            : null
                        }
                        onSelect={handleExpiryDateChange}
                        disabled={(date) => date < new Date("2024-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                ) : (
                  getDate(editedData.expiry_date)
                )}
              </div>
              <div className="grid grid-cols-2 text-lg">
                {/* <p>Added Date: {getDate(editedData.added_date)}</p> */}
                <span>Quantity: </span>
                {isEditMode ? (
                  <Input
                    type="number"
                    name="quantity"
                    value={editedData.quantity}
                    className="bg-secondary-50 px-3 rounded-2xl w-1/2"
                    onChange={handleInputChange}
                  />
                ) : (
                  editedData.quantity
                )}
              </div>
              <div className="mt-2">
                <h3 className="text-slate-400">Storage Methods:</h3>
                <ul className="flex flex-col justify-center gap-1 mt-1">
                  {pantryItemProps.category_pantry && (
                    <li className="grid grid-cols-2">
                      Pantry:{" "}
                      <span className="font-extrabold">
                        {pantryItemProps.category_pantry} days
                      </span>
                    </li>
                  )}
                  {pantryItemProps.category_refrigerate && (
                    <li className="grid grid-cols-2">
                      Refridgerate:{" "}
                      <span className="font-extrabold">
                        {pantryItemProps.category_refrigerate} days
                      </span>
                    </li>
                  )}
                  {pantryItemProps.category_freeze && (
                    <li className="grid grid-cols-2">
                      Freezer:{" "}
                      <span className="font-extrabold">
                        {pantryItemProps.category_freeze} days
                      </span>
                    </li>
                  )}
                </ul>
              </div>
              <div className="pb-14">
                <h3 className="text-slate-400 mt-2">Decomposition Methods:</h3>
                <ul>
                  <li>{pantryItemProps.category_decompose}</li>
                </ul>
              </div>
              <div className="flex items-center justify-end gap-8 w-full bottom-0 absolute">
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
          </div>

          <div>
            <h3 className="text-6xl my-3">Charity locations</h3>
            <h4 className="text-xl font-extralight mb-5">
              Want to donate excess food in your pantry? Find charities below
              that you can donate to!
            </h4>
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
