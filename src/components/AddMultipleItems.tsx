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

const formSchema = z.object({
  name: z.string(),
  quantity: z.coerce.number().default(1),
  expiryDate: z.number({
    required_error: "Expiry date is required.",
  }),
  image: z.any(),
  category_id: z.number({
    required_error: "Please select a category.",
  }),
});

const AddMultipleItems = ({
  onSubmit,
}: {
  onSubmit: (values: z.infer<typeof formSchema>[]) => void;
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
  const [items, setItems] = useState<z.infer<typeof formSchema>[]>([
    {
      name: "",
      quantity: 1,
      expiryDate: 0,
      image: null,
      category_id: 0,
    },
  ]);

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        name: "",
        quantity: 1,
        expiryDate: 0,
        image: null,
        category_id: 0,
      },
    ]);
  };

  const handleDeleteItem = (index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleSubmit = () => {
    onSubmit(items);
    console.log(items);
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
    }
  }, [session, status]);

  return (
    <main className="flex flex-col items-center justify-between p-4">
      {items.map((item, index) => (
        <div key={index} className="flex gap-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-full flex gap-4 items-end"
            >
              <FormField
                control={form.control}
                name="category_id"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="mb-1 mt-1">
                      Item Name <span>*</span>
                    </FormLabel>
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
                              : "Select Food"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="p-0">
                        <Command className="bg-accent-50">
                          <CommandInput
                            placeholder="Search Foods..."
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
                                    form.setValue(
                                      "category_id",
                                      category.value
                                    );
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
                      <FormLabel>
                        Quantity <span>*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="1"
                          type="number"
                          className="h-10"
                          {...field}
                        />
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
                    <FormLabel className="mb-1">
                      Expiry Date <span>*</span>
                    </FormLabel>
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
              <Button className="bg-rose-600 text-text-50 mt-4" onClick={() => handleDeleteItem(index)}>Delete</Button>
            </form>
          </Form>
        </div>
      ))}
      <div className="flex items-center justify-center gap-4">
        <Button className="bg-secondary-400 text-text-50 mt-4" onClick={handleAddItem}>Add Item</Button>
        <Button type="submit" className="bg-primary-400 text-text-50 mt-4" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </main>
  );
};

export default AddMultipleItems;
