"use client";
import React, {
  useState,
  useRef,
  useEffect,
  Suspense,
  useContext,
} from "react";
import { useScroll, useMotionValueEvent, motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, signIn } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Cards from "@/components/Cards";
import Footer from "@/components/Footer";
import AddItems from "@/components/AddItems";
import ScanImage from "@/components/ScanImage";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { getProducts, addProduct, deleteProducts } from "@/lib/callAPI";
import { groupProducts, categorizeProduct } from "@/lib/groupBy";
import PantryContext, { PantryItemProps } from "@/utils/PantryContext";

const NavBar = React.lazy(() => import("@/components/NavBar"));
const SideMenuWrapper = React.lazy(
  () => import("@/components/SideMenu/SideMenuWrapper")
);

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function deleteFromProductsByID(products: any, ids: any) {
  const result: { [key: string]: any[] } = {};

  for (const group in products)
    result[group] = products[group].filter(
      (ele: { id: any }) => !ids.includes(ele.id)
    );

  return result;
}

const SORT_OPTIONS = [
  { name: "Default", value: "none" },
  { name: "Sort by Expiry Date", value: "expiry_date" },
  { name: "Sort by Date Entered", value: "date_entered" },
  { name: "Sort by Name", value: "name" },
] as const;

export default function Dashboard() {
  const { data: session, status } = useSession();

  const [deleteMode, setDeleteMode] = useState(false);
  const [activeCardIds, setActiveCardIds] = useState([]);

  const [activeAddButton, setActiveAddButton] = useState(0);

  const handleAddActiveButton = (index: any) => {
    setActiveAddButton(index);
  };

  const handleActiveClick = (cardId: any) => {
    setActiveCardIds((prevActiveCardIds) => {
      if (prevActiveCardIds.includes(cardId)) {
        return prevActiveCardIds.filter((id) => id !== cardId);
      } else {
        return [...prevActiveCardIds, cardId];
      }
    });
  };

  const [products, setProducts] = useState({
    loading: true,
    error: false,
    data: {},
  });

  const { pantryItemProps, updatePantryItemProps } = useContext(PantryContext);

  const handleLinkClick = (ele: PantryItemProps) => {
    updatePantryItemProps(ele);
    // console.log(pantryItemProps);
  };

  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollY } = useScroll();

  const [filter, setFilter] = useState({
    sort: "none",
  });

  const [open, setOpen] = React.useState(false);

  const handleManualSubmit = (values: any) => {
    const options = {
      id_token: (session as any).id_token,
      body: {
        name: values.name,
        quantity: values.quantity,
        category_id: 1,
        expiry_date: values.expiryDate,
        image: values.image,
      },
    };

    addProduct(options)
      .then((response) => {
        console.log("Product added successfully:", response);
        setProducts((state) => {
          const product = response.data;
          const productExpiryCategory = categorizeProduct(product.expiry_date);
          const result = { ...state };

          //@ts-ignore
          result.data[productExpiryCategory] =
            //@ts-ignore
            result.data[productExpiryCategory] == null
              ? [product]
              : //@ts-ignore
              state.data[productExpiryCategory] //@ts-ignore
                  .findIndex((ele: { id: any }) => ele.id === product.id) === -1
              ? [
                  //@ts-ignore
                  ...//@ts-ignore
                  state.data[productExpiryCategory],
                  product,
                ]
              : //@ts-ignore
                state.data[productExpiryCategory];
          console.log("inside add product PROMISE", result.data);
          return result;
        });
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });

    setOpen(false);
  };

  const handleReceiptSubmit = (values: any) => {
    const options = {
      id_token: (session as any).id_token,
      body: {
        name: values.name,
        quantity: values.quantity,
        category_id: 1,
        expiry_date: values.expiryDate,
        image: values.image,
      },
    };

    addProduct(options)
      .then((response) => {
        console.log("Product added successfully:", response);
        setProducts((state) => {
          const product = response.data;
          const productExpiryCategory = categorizeProduct(product.expiry_date);
          const result = { ...state };

          //@ts-ignore
          result.data[productExpiryCategory] =
            //@ts-ignore
            result.data[productExpiryCategory] == null
              ? [product]
              : //@ts-ignore
              state.data[productExpiryCategory] //@ts-ignore
                  .findIndex((ele: { id: any }) => ele.id === product.id) === -1
              ? [
                  //@ts-ignore
                  ...//@ts-ignore
                  state.data[productExpiryCategory],
                  product,
                ]
              : //@ts-ignore
                state.data[productExpiryCategory];
          console.log("inside add product PROMISE", result.data);
          return result;
        });
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });

    setOpen(false);
  };

  const handleFoodSubmit = (values: any) => {
    const options = {
      id_token: (session as any).id_token,
      body: {
        image: values.image,
      },
    };

    addProduct(options)
      .then((response) => {
        console.log("Product added successfully:", response);
        setProducts((state) => {
          const product = response.data;
          const productExpiryCategory = categorizeProduct(product.expiry_date);
          const result = { ...state };

          //@ts-ignore
          result.data[productExpiryCategory] =
            //@ts-ignore
            result.data[productExpiryCategory] == null
              ? [product]
              : //@ts-ignore
              state.data[productExpiryCategory] //@ts-ignore
                  .findIndex((ele: { id: any }) => ele.id === product.id) === -1
              ? [
                  //@ts-ignore
                  ...//@ts-ignore
                  state.data[productExpiryCategory],
                  product,
                ]
              : //@ts-ignore
                state.data[productExpiryCategory];
          console.log("inside add product PROMISE", result.data);
          return result;
        });
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });

    setOpen(false);
  };

  useEffect(() => {
    console.log(products);
  }, [products]);

  const handleDeleteMode = () => {
    setDeleteMode((deleteMode) => !deleteMode);
    console.log(deleteMode);
  };

  const windowSize = useRef([
    typeof window !== "undefined" ? window.innerWidth : 0,
    typeof window !== "undefined" ? window.innerHeight : 0,
  ]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest >= windowSize.current[1] * 0.5) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;

      const locomotiveScroll = new LocomotiveScroll({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true,
      });
    })();
  }, []);

  const handleDeleteCall = (event: any) => {
    console.log(event);
    const productIds = activeCardIds.filter((item) => typeof item === "string");

    console.log(productIds);

    if (activeCardIds.length > 0) {
      const options = {
        id_token: (session as any).id_token,
        body: {
          productIds: productIds,
        },
      };

      deleteProducts(options)
        .then((response) => {
          console.log("Product deleted successfully:", response);
          setProducts((state) => {
            return {
              ...state,
              data: deleteFromProductsByID(state.data, activeCardIds),
            };
          });
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
        })
        .finally(() => {
          setDeleteMode(false);
          setActiveCardIds([]);
        });
    } else {
      console.log("No products selected for deletion.");
      setDeleteMode(false);
      setActiveCardIds([]);
    }
  };

  const fetchProducts = async (idToken: any) => {
    try {
      const response = await getProducts({ id_token: idToken });
      console.log(response);

      const groupedProducts = groupProducts(response.data);

      console.log(groupedProducts);
      setProducts({
        loading: false,
        error: response.error,
        data: response.error ? response.data : groupedProducts,
      });
    } catch (error) {
      console.error("Error fetching and grouping products:", error);
      setProducts({
        loading: false,
        error: true,
        data: null,
      });
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchProducts((session as any).id_token);
    }
  }, [session, status]);

  return (
    <main className="px-36 flex flex-col gap-8 justify-center">
      <div className="absolute top-0 left-0">
        <NavBar />
      </div>

      <motion.div
        className="fixed z-20 right-10 top-10"
        initial={{ opacity: 1, scale: 0 }}
        animate={isScrolled ? { opacity: 1, y: 0, scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Suspense>
          <SideMenuWrapper />
        </Suspense>
      </motion.div>

      {status === "authenticated" ? (
        <>
          <div className="flex pt-40 items-center justify-between relative">
            <div className="flex flex-row items-center justify-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>Avatar</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-bold text-2xl">Welcome Back</div>
                {status === "authenticated" ? (
                  <div className="text-xl">{session.user.name}</div>
                ) : (
                  <div className="text-xl">User Email</div>
                )}
              </div>
            </div>
            <div className="text-5xl font-bold">Pantry Tracker</div>
          </div>

          <div className="flex items-center justify-between w-full gap-6">
            <div className="flex items-center w-full gap-6">
              <div className="flex items-center justify-center w-full max-w-4xl">
                <div className="flex w-full max-w-4xl items-center space-x-2">
                  <Input type="text" placeholder="Search..." />
                  <Button type="submit" variant="outline">
                    Search <Search className="ml-1 h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger className="group inline-flex justify-center items-center gap-1 hover:text-background-900">
                    Sort
                    <ChevronDown className="h-5 w-5 flex-shrink-0 group-hover:text-background-900" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-background-50 flex flex-col mt-1 ml-28">
                    {SORT_OPTIONS.map((option) => (
                      <Button
                        key={option.name}
                        onClick={() => {
                          setFilter((prev) => ({
                            ...prev,
                            sort: option.value,
                          }));
                        }}
                        className={cn(
                          "text-left w-full block px-4 py-2 text-sm",
                          {
                            "bg-background-900 text-text-50":
                              filter.sort === option.value,
                            "text-background-950": filter.sort !== option.value,
                          }
                        )}
                      >
                        {option.name}
                      </Button>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button className="-m-2 ml-4 p-2 inline-flex justify-center items-center gap-1 text-base font-normal group hover:text-background-900">
                  Filter
                  <Filter className="h-5 w-5 flex-shrink-0 group-hover:text-background-900" />
                </Button>
              </div>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger>
                <Button className="bg-primary-400 text-text-100">
                  Add Items
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-background-50 pt-20 flex flex-col items-center justify-center max-h-[90dvh]">
                <DialogHeader className="flex items-center justify-center gap-4">
                  <DialogTitle>
                    Add Items
                  </DialogTitle>
                  <div className="relative rounded-md overflow-hidden bg-accent-100 bg-opacity-65 w-full flex justify-around">
                    <div
                      className="absolute h-full bg-secondary-600 transition-transform ease-in-out duration-300 z-10"
                      style={{
                        transform: `translateX(${
                          activeAddButton * 100 - 100
                        }%)`,
                        width: "33.33%",
                      }}
                    />
                    <Button
                      onClick={() => handleAddActiveButton(0)}
                      className={
                        activeAddButton === 0
                          ? "z-20 w-32 text-text-50"
                          : "z-20 w-32"
                      }
                    >
                      Add Manually
                    </Button>
                    <Button
                      onClick={() => handleAddActiveButton(1)}
                      className={
                        activeAddButton === 1
                          ? "z-20 w-32 text-text-50"
                          : "z-20 w-32"
                      }
                    >
                      Scan Receipt
                    </Button>
                    <Button
                      onClick={() => handleAddActiveButton(2)}
                      className={
                        activeAddButton === 2
                          ? "z-20 w-32 text-text-50"
                          : "z-20 w-32"
                      }
                    >
                      Scan Food
                    </Button>
                  </div>
                </DialogHeader>
                {activeAddButton === 0 ? (
                  <div className="w-full">
                    <AddItems onSubmit={handleManualSubmit} />
                  </div>
                ) : activeAddButton === 1 ? (
                  <div className=" w-full">
                    <ScanImage onSubmit={handleReceiptSubmit} />
                  </div>
                ) : (
                  <div className="w-full">
                    <ScanImage onSubmit={handleFoodSubmit} />
                  </div>
                )}
              </DialogContent>
            </Dialog>
            <Button
              className={`${
                deleteMode
                  ? "bg-red-500 text-text-900"
                  : "bg-secondary-400 text-text-100"
              }`}
              onClick={deleteMode ? handleDeleteCall : handleDeleteMode}
            >
              {deleteMode ? <p>Confirm Delete</p> : <p>Delete Items</p>}
            </Button>
          </div>

          <Accordion
            type="single"
            defaultValue="item-1"
            collapsible
            className="w-full"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>Expiring in 3 days</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-4 gap-4">
                  {(products as any).data?.["3"] != null
                    ? (products as any).data["3"].map(
                        (ele: {
                          id: React.Key;
                          name: any;
                          expiry_date: any;
                          added_date: any;
                          image: any;
                          quantity: any;
                        }) => (
                          <div key={ele.id} id={`${ele.id}`}>
                            {deleteMode ? (
                              <div onClick={handleActiveClick}>
                                <Cards
                                  id={ele.id}
                                  name={ele.name}
                                  expiry_date={ele.expiry_date}
                                  added_date={ele.added_date}
                                  image={ele.image}
                                  quantity={ele.quantity}
                                  className={`${
                                    activeCardIds.includes(ele.id)
                                      ? "border-blue-500 border-4"
                                      : ""
                                  }`}
                                  handleActiveClick={handleActiveClick}
                                  active={activeCardIds.includes(ele.id)}
                                />
                              </div>
                            ) : (
                              <Link
                                href={{
                                  pathname: "/dashboard/pantryItem",
                                  query: `pantryId=${ele.id}`,
                                }}
                                onClick={() => handleLinkClick(ele)}
                                // as={`/dashboard/pantryItem/${ele.id}`}
                              >
                                <Cards
                                  id={ele.id}
                                  name={ele.name}
                                  expiry_date={ele.expiry_date}
                                  added_date={ele.added_date}
                                  image={ele.image}
                                  quantity={ele.quantity}
                                />
                              </Link>
                            )}
                          </div>
                        )
                      )
                    : "Nothing to show here"}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Expiring in 6 days</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-3 gap-4">
                  {(products as any).data?.["6"] != null
                    ? (products as any).data["6"].map(
                        (ele: {
                          id: React.Key;
                          name: any;
                          expiry_date: any;
                          added_date: any;
                          image: any;
                          quantity: any;
                        }) => (
                          <div key={ele.id} id={`${ele.id}`}>
                            {deleteMode ? (
                              <div onClick={handleActiveClick}>
                                <Cards
                                  id={ele.id}
                                  name={ele.name}
                                  expiry_date={ele.expiry_date}
                                  added_date={ele.added_date}
                                  image={ele.image}
                                  quantity={ele.quantity}
                                  className={`${
                                    activeCardIds.includes(ele.id)
                                      ? "border-blue-500 border-4"
                                      : ""
                                  }`}
                                  handleActiveClick={handleActiveClick}
                                  active={activeCardIds.includes(ele.id)}
                                />
                              </div>
                            ) : (
                              <Link
                                href={{
                                  pathname: "/dashboard/pantryItem",
                                  query: `pantryId=${ele.id}`,
                                }}
                                onClick={() => handleLinkClick(ele)}
                                // as={`/dashboard/pantryItem/${ele.id}`}
                              >
                                <Cards
                                  id={ele.id}
                                  name={ele.name}
                                  expiry_date={ele.expiry_date}
                                  added_date={ele.added_date}
                                  image={ele.image}
                                  quantity={ele.quantity}
                                />
                              </Link>
                            )}
                          </div>
                        )
                      )
                    : "Nothing to show here"}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Expiring in more than a week</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-3 gap-4">
                  {(products as any).data?.["week"] != null
                    ? (products as any).data["week"].map(
                        (ele: {
                          id: React.Key;
                          name: any;
                          expiry_date: any;
                          added_date: any;
                          image: any;
                          quantity: any;
                        }) => (
                          <div key={ele.id} id={`${ele.id}`}>
                            {deleteMode ? (
                              <div onClick={handleActiveClick}>
                                <Cards
                                  id={ele.id}
                                  name={ele.name}
                                  expiry_date={ele.expiry_date}
                                  added_date={ele.added_date}
                                  image={ele.image}
                                  quantity={ele.quantity}
                                  className={`${
                                    activeCardIds.includes(ele.id)
                                      ? "border-blue-500 border-4"
                                      : ""
                                  }`}
                                  handleActiveClick={handleActiveClick}
                                  active={activeCardIds.includes(ele.id)}
                                />
                              </div>
                            ) : (
                              <Link
                                href={{
                                  pathname: "/dashboard/pantryItem",
                                  query: `pantryId=${ele.id}`,
                                }}
                                onClick={() => handleLinkClick(ele)}
                                // as={`/dashboard/pantryItem/${ele.id}`}
                              >
                                <Cards
                                  id={ele.id}
                                  name={ele.name}
                                  expiry_date={ele.expiry_date}
                                  added_date={ele.added_date}
                                  image={ele.image}
                                  quantity={ele.quantity}
                                />
                              </Link>
                            )}
                          </div>
                        )
                      )
                    : "Nothing to show here"}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-rose-400 font-bold">
                Already Expired
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-3 gap-4">
                  {(products as any).data?.["expired"] != null
                    ? (products as any).data["expired"].map(
                        (ele: {
                          id: React.Key;
                          name: any;
                          expiry_date: any;
                          added_date: any;
                          image: any;
                          quantity: any;
                        }) => (
                          <div key={ele.id} id={`${ele.id}`}>
                            {deleteMode ? (
                              <div onClick={handleActiveClick}>
                                <Cards
                                  id={ele.id}
                                  name={ele.name}
                                  expiry_date={ele.expiry_date}
                                  added_date={ele.added_date}
                                  image={ele.image}
                                  quantity={ele.quantity}
                                  className={`${
                                    activeCardIds.includes(ele.id)
                                      ? "border-blue-500 border-4"
                                      : "grayscale"
                                  }`}
                                  handleActiveClick={handleActiveClick}
                                  active={activeCardIds.includes(ele.id)}
                                />
                              </div>
                            ) : (
                              <Link
                                href={{
                                  pathname: "/dashboard/pantryItem",
                                  query: `pantryId=${ele.id}`,
                                }}
                                onClick={() => handleLinkClick(ele)}
                                // as={`/dashboard/pantryItem/${ele.id}`}
                              >
                                <Cards
                                  id={ele.id}
                                  name={ele.name}
                                  expiry_date={ele.expiry_date}
                                  added_date={ele.added_date}
                                  image={ele.image}
                                  quantity={ele.quantity}
                                  className="grayscale"
                                />
                              </Link>
                            )}
                          </div>
                        )
                      )
                    : "Nothing to show here"}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </>
      ) : (
        <div className="flex flex-col gap-8 items-center justify-center relative h-screen ">
          <div className="text-6xl font-bold text-center leading-tight">
            Please Login to Manage <br />
            Your Pantry
          </div>
          <div className="flex gap-8">
            <Button
              onClick={() => {
                signIn("cognito");
              }}
              className="bg-primary-500 rounded-3xl text-text-50 flex flex-row justify-center gap-2 font-semibold hover:text-text-950 hover:bg-background-50 hover:ring-2 hover:ring-background-950"
            >
              <div className="absolute w-2 h-2 top-8 left-6 bg-text-950 rounded-full scale-0 group-hover:scale-100 transition-transform ease-in"></div>
              Sign In
            </Button>
            <Button className="bg-secondary-800 rounded-3xl text-text-50 flex flex-row justify-center gap-2 font-semibold hover:text-text-950 hover:bg-background-50 hover:ring-2 hover:ring-background-950">
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </div>
      )}

      <div className="-ml-36">
        <Footer />
      </div>
    </main>
  );
}
