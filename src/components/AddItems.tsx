"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getCategories } from "@/lib/callAPI";

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "Item name must be at least 2 characters.",
    }),
    quantity: z.coerce.number().default(1),
    expiryDate: z.number({
      required_error: "Expiry date is required.",
    }),
    image: z.any(),
    category_id: z.number({
      required_error: "Please select a category.",
    }),
  })
  .refine((data) => data.image instanceof File, {
    message: "Image is required.",
    path: ["image"],
  });

const AddItems = ({
  onSubmit,
}: {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      quantity: 1,
      expiryDate: 0,
      image: null,
      category_id: 0,
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
  };

  const { data: session, status } = useSession();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (status === "authenticated") {
      const options = {
        id_token: (session as any).id_token,
      };
      getCategories(options)
        .then((res) => {
          setCategories(
            res.data.map((item: any) => ({ label: item.name, value: item.id }))
          );
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    }
  }, [session, status]);

  return (
    <main className="flex flex-col items-center justify-between p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-md w-full flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Item name</FormLabel>
                  <FormControl>
                    <Input placeholder="Item name" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="category_id"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Item Category</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? categories.find(
                              (category) => category.value === field.value
                            )?.label
                          : "Select category"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
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
                                form.setValue("category_id", category.value);
                              }}
                              className="hover:cursor-pointer hover:bg-background-800 hover:text-text-50"
                            >
                              {category.label}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  category.value === field.value
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input placeholder="1" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-1">
                <FormLabel>Expiry Date</FormLabel>
                <Popover modal={true}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(new Date(field.value * 1000), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 bg-background-50 focus:bg-red-400"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={
                        field.value ? new Date(field.value * 1000) : null
                      }
                      onSelect={(date) => {
                        if (date) {
                          field.onChange(date.getTime() / 1000);
                        } else {
                          field.onChange(Date.now() / 1000);
                        }
                      }}
                      disabled={(date) => date < new Date("2024-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        const file = event.target.files?.[0] || null;
                        field.onChange(file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type="submit" className="bg-primary-400 text-text-50 mt-4">
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default AddItems;
