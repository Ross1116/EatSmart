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
import { ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import {
  getProducts,
  addProduct,
  deleteProducts,
  scanFood,
  scanReceipt,
} from "@/lib/callAPI";
import { groupProducts, categorizeProduct } from "@/lib/groupBy";
import PantryContext, { PantryItemProps } from "@/utils/PantryContext";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { CircleHelp } from "lucide-react";

const driverObj = driver({
  showProgress: true,
  steps: [
    {
      popover: {
        title: "Pantry Tracker Tour",
        description:
          "Welcome to our unique pantry tracker. Let's walk you through it.",
        side: "left",
        align: "start",
      },
    },
    {
      element: "#AddButton",
      popover: {
        title: "Add a new item",
        description:
          "Click here to add an item to the pantry management system and track your items.",
        side: "bottom",
        align: "start",
      },
    },
    {
      element: "#DeleteMode",
      popover: {
        title: "Delete entered items",
        description:
          "Click here to enter delete mode. In delete mode, you can select multiple items by clicking on the cards and click on confirm delete button to delete those items.",
        side: "bottom",
        align: "start",
      },
    },
    {
      element: "#SearchId",
      popover: {
        title: "Search any available item",
        description: "Type here to search for any item already in the pantry",
        side: "bottom",
        align: "start",
      },
    },
    {
      element: "#SortId",
      popover: {
        title: "Sort entered items",
        description:
          "Click here to enter sort items in your inventory. By default items are arranged by added date but you can sort by the expiry data and the name of the item as well!",
        side: "bottom",
        align: "start",
      },
    },
    {
      element: "#CardId",
      popover: {
        title: "Pantry Items",
        description:
          "These are the items in your pantry. Click on any item to view more details about it. Each of the items are grouped by their expiry date.",
        side: "top",
        align: "start",
      },
    },
  ],
});

const NavBar = React.lazy(() => import("@/components/NavBar"));
const SideMenuWrapper = React.lazy(
  () => import("@/components/SideMenu/SideMenuWrapper")
);
const Cards = React.lazy(() => import("@/components/Cards"));
const Footer = React.lazy(() => import("@/components/Footer"));
const AddItems = React.lazy(() => import("@/components/AddItems"));
const ScanImage = React.lazy(() => import("@/components/ScanImage"));
const AddMultipleItems = React.lazy(
  () => import("@/components/AddMultipleItems")
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

export default function Dashboard() {
  const { data: session, status } = useSession();

  const [products, setProducts] = useState({
    loading: true,
    error: false,
    data: {},
  });

  const [deleteMode, setDeleteMode] = useState(false);
  const [activeCardIds, setActiveCardIds] = useState([]);

  const [activeAddButton, setActiveAddButton] = useState(0);

  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollY } = useScroll();

  const [filter, setFilter] = useState({
    sort: "date_entered",
  });

  const { updatePantryItemProps } = useContext(PantryContext);

  const [open, setOpen] = React.useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [scannedFoodItems, setScannedFoodItems] = useState([]);

  const sortOptions = [
    { name: "Date Entered", value: "date_entered" },
    { name: "Expiry Date", value: "expiry_date" },
    { name: "Name", value: "category_name" },
  ] as const;

  const expiryItems = [
    { label: "Expiring in 3 days or less", key: "3" },
    { label: "Expiring in 6 days or less", key: "6" },
    { label: "Expiring in more than a week", key: "week" },
    {
      label: "Already Expired",
      key: "expired",
      className: "text-rose-400 font-bold",
    },
  ];

  const windowSize = useRef([
    typeof window !== "undefined" ? window.innerWidth : 0,
    typeof window !== "undefined" ? window.innerHeight : 0,
  ]);

  useEffect(() => {
    const isFirstVisit = localStorage.getItem("isFirstDashboardVisit");
    if (isFirstVisit === null && status === "authenticated") {
      localStorage.setItem("isFirstDashboardVisit", "false");
      driverObj.drive();
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      fetchProducts((session as any).id_token);
    }
  }, [session, status]);

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

  const handleLinkClick = (ele: PantryItemProps) => {
    updatePantryItemProps(ele);
  };

  const handleManualSubmit = (values: any) => {
    const options = {
      id_token: (session as any).id_token,
      body: [
        {
          name: values.name,
          quantity: values.quantity,
          category_id: values.category_id,
          expiry_date: values.expiryDate,
          image: values.image,
        },
      ],
    };

    addProduct(options)
      .then((response) => {
        console.log("Product added successfully:", response);
        setProducts((state) => {
          const result = { ...state };

          response.data.forEach((product: any) => {
            const [productExpiryCategory, dayDiff] = categorizeProduct(
              product.expiry_date
            );
            product.dayDiff = dayDiff;

            //@ts-ignore
            result.data[productExpiryCategory] =
              //@ts-ignore
              result.data[productExpiryCategory] == null
                ? [product]
                : //@ts-ignore
                state.data[productExpiryCategory] //@ts-ignore
                    .findIndex((ele: { id: any }) => ele.id === product.id) ===
                  -1
                ? [
                    //@ts-ignore
                    ...//@ts-ignore
                    state.data[productExpiryCategory],
                    product,
                  ]
                : //@ts-ignore
                  state.data[productExpiryCategory];
          });

          console.log("inside add product PROMISE", result.data);
          return result;
        });
        setOpen(false);
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  const handleReceiptSubmit = (values: any) => {
    const options = {
      id_token: (session as any).id_token,
      body: {
        image: values.image,
      },
    };

    console.log("options", options);

    scanReceipt(options)
      .then((response) => {
        if (response.error === false) {
          const initialItems = Object.entries(response.data).map(
            ([name, quantity]) => ({
              name,
              quantity,
              expiryDate: new Date().getTime() / 1000,
              category_id: 0,
            })
          );
          setScannedFoodItems(initialItems);
          setActiveAddButton(3);
          console.log("Scanned food items:", initialItems);
          console.log("responsedata", response.data);
        } else {
          console.error("Error scanning food:", response.error);
        }
      })
      .catch((error) => {
        console.error("Error scanning food:", error);
      });
  };

  function addDays(date: Date, days: number): number {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.getTime() / 1000;
  }

  const handleFoodSubmit = (values: any) => {
    const options = {
      id_token: (session as any).id_token,
      body: {
        image: values.image,
      },
    };

    console.log("options", options);

    scanFood(options)
      .then((response) => {
        if (response.error === false) {
          const initialItems = Object.entries(
            response.data as {
              [key: string]: {
                quantity: number;
                category_id: number;
                suggestions: any;
              };
            }
          ).map(([name, item]) => ({
            name,
            quantity: item.quantity,
            expiryDate: item.suggestions
              ? addDays(
                  new Date(),
                  //@ts-ignore
                  Math.min( ...Object.values(item.suggestions).filter(Number.isInteger))
                )
              : new Date().getTime() / 1000,
            image: null,
            category_id: item.category_id,
          }));
          setScannedFoodItems(initialItems);
          setActiveAddButton(3);
        } else {
          console.error("Error scanning food:", response.error);
        }
      })
      .catch((error) => {
        console.error("Error scanning food:", error);
      });
  };

  const handleMultipleSubmit = (values: any) => {
    const options = {
      id_token: (session as any).id_token,
      body: values.map((item: any) => ({
        name: item.name,
        quantity: item.quantity,
        category_id: item.category_id,
        expiry_date: item.expiryDate,
        image: item.image,
      })),
    };

    addProduct(options)
      .then((response) => {
        console.log("Products added successfully:", response);

        setProducts((state) => {
          const result = { ...state };

          response.data.forEach((product: any) => {
            const [productExpiryCategory, dayDiff] = categorizeProduct(
              product.expiry_date
            );

            product.dayDiff = dayDiff;

            //@ts-ignore
            result.data[productExpiryCategory] =
              //@ts-ignore
              result.data[productExpiryCategory] == null
                ? [product]
                : //@ts-ignore
                state.data[productExpiryCategory] //@ts-ignore
                    .findIndex((ele: { id: any }) => ele.id === product.id) ===
                  -1
                ? [
                    //@ts-ignore
                    ...state.data[productExpiryCategory],
                    product,
                  ]
                : //@ts-ignore
                  state.data[productExpiryCategory];
          });

          console.log("inside add product PROMISE", result.data);
          return result;
        });
        setOpen(false);
      })
      .catch((error) => {
        console.error("Error adding products:", error);
      });
  };

  const handleDeleteMode = () => {
    setDeleteMode((deleteMode) => !deleteMode);
    console.log(deleteMode);
  };

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

  const filterProducts = (
    products: { data: PantryItemProps[] } | null,
    searchQuery: string
  ): { [key: string]: PantryItemProps[] } => {
    if (!products && !products.data) {
      // Handle the case when products or products.data is null
      return {};
    }
    if (!searchQuery) {
      return Object.entries(products).reduce((acc, [key, value]) => {
        acc[key] = sortProducts(value, filter.sort);
        return acc;
      }, {} as { [key: string]: PantryItemProps[] });
    }

    const filteredProducts: { [key: string]: PantryItemProps[] } = {};

    for (const group in products) {
      filteredProducts[group] = sortProducts(
        (products as any)[group].filter((product: { category_name: string }) =>
          product.category_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        ),
        filter.sort
      );
    }

    return filteredProducts;
  };

  const sortProducts = (
    products: PantryItemProps[],
    sortOption: string
  ): PantryItemProps[] => {
    switch (sortOption) {
      case "date_entered":
        return products.sort(
          (a, b) =>
            new Date(b.added_date).getTime() - new Date(a.added_date).getTime()
        );
      case "expiry_date":
        return products.sort(
          (a, b) =>
            new Date(a.expiry_date).getTime() -
            new Date(b.expiry_date).getTime()
        );
      case "category_name":
        return products.sort((a, b) =>
          a.category_name.localeCompare(b.category_name)
        );
      default:
        return products;
    }
  };

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

      {status === "loading" ? (
        <div className="flex items-center justify-center h-screen">
          <div className="text-2xl font-bold">Loading...</div>
        </div>
      ) : status === "authenticated" && session ? (
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
            <div className="text-5xl font-bold flex items-center gap-2">
              <Button
                onClick={() => {
                  const isFirstVisit = localStorage.getItem(
                    "isFirstDashboardVisit"
                  );
                  if (isFirstVisit === "false") {
                    driverObj.drive();
                  }
                }}
              >
                <CircleHelp />
              </Button>
              Pantry Tracker
            </div>
          </div>

          <div className="flex items-center justify-between w-full gap-6">
            <div className="flex items-center w-full gap-6">
              <div className="flex items-center justify-center w-full max-w-2xl">
                <div
                  className="flex w-full max-w-2xl items-center space-x-2"
                  id="SearchId"
                >
                  <Input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {/* <Button type="submit" variant="outline">
                    Search <Search className="ml-1 h-5 w-5" />
                  </Button> */}
                </div>
              </div>

              <div className="flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="group inline-flex justify-center items-center gap-1 hover:text-background-900"
                    id="SortId"
                  >
                    Sort By
                    <ChevronDown className="h-5 w-5 flex-shrink-0 group-hover:text-background-900" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-background-50 flex flex-col mt-1 ml-28">
                    {sortOptions.map((option) => (
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
              </div>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger id="AddButton">
                <Button className="bg-primary-400 text-text-100">
                  Add Items
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-background-50 pt-20 flex flex-col items-center justify-center max-h-[90dvh] max-w-[90vw] w-fit">
                <DialogHeader className="flex items-center justify-center gap-4">
                  <DialogTitle className="text-3xl -pt-2">
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
                      Scan Produce
                    </Button>
                  </div>
                </DialogHeader>
                {activeAddButton === 0 ? (
                  <div className="w-full">
                    <AddItems onSubmit={handleManualSubmit} />
                  </div>
                ) : activeAddButton === 1 ? (
                  <div className=" w-full">
                    <ScanImage
                      onSubmit={handleReceiptSubmit}
                      mode={activeAddButton}
                    />
                  </div>
                ) : activeAddButton === 2 ? (
                  <div className="w-full">
                    <ScanImage
                      onSubmit={handleFoodSubmit}
                      mode={activeAddButton}
                    />
                  </div>
                ) : (
                  <AddMultipleItems
                    onSubmit={handleMultipleSubmit}
                    initialItems={scannedFoodItems}
                  />
                )}
              </DialogContent>
            </Dialog>
            <Button
              id="DeleteMode"
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
            id="CardId"
          >
            {expiryItems.map(({ label, key, className }, index) => (
              <AccordionItem key={key} value={`item-${index + 1}`}>
                <AccordionTrigger className={className}>
                  {label}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-3 gap-8">
                    {filterProducts((products as any).data, searchQuery)[key] !=
                    null
                      ? filterProducts((products as any).data, searchQuery)[
                          key
                        ].map(
                          (ele: {
                            id: string;
                            name: string;
                            expiry_date: number;
                            added_date: number;
                            quantity: number;
                            image: string;
                            category_id: number;
                            category_name: string;
                            category_refrigerate: number | null;
                            category_freeze: number | null;
                            category_pantry: number;
                            category_decompose: string;
                            category_type: string;
                            dayDiff: number;
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
                                    dayDiff={ele.dayDiff}
                                    category_id={ele.category_id}
                                    category_name={ele.category_name}
                                    category_refrigerate={
                                      ele.category_refrigerate
                                    }
                                    category_freeze={ele.category_freeze}
                                    category_pantry={ele.category_pantry}
                                    category_decompose={ele.category_decompose}
                                    category_type={ele.category_type}
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
                                    dayDiff={ele.dayDiff}
                                    category_id={ele.category_id}
                                    category_name={ele.category_name}
                                    category_refrigerate={
                                      ele.category_refrigerate
                                    }
                                    category_freeze={ele.category_freeze}
                                    category_pantry={ele.category_pantry}
                                    category_decompose={ele.category_decompose}
                                    category_type={ele.category_type}
                                    className={
                                      expiryItems[3].key === key
                                        ? "grayscale"
                                        : ""
                                    }
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
            ))}
          </Accordion>
        </>
      ) : (
        <div className="flex flex-col gap-2 items-center justify-center relative h-screen ">
          <div className="text-6xl font-bold text-center leading-tight">
            Please Login to Manage <br />
            Your Pantry
          </div>
          <div className="w-1/3 text-center text-lg font-extralight mb-4">
            Make a difference in your life by keeping track of your food expiry
            and learn how to best store them.
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
