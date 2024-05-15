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
import { useFieldArray } from "react-hook-form";

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
  initialItems = [],
}: {
  onSubmit: (values: z.infer<typeof formSchema>[]) => void;
  initialItems?: z.infer<typeof formSchema>[];
}) => {
  const [items, setItems] =
    useState<z.infer<typeof formSchema>[]>(initialItems);

  const form = useForm<{ items: z.infer<typeof formSchema>[] }>({
    resolver: zodResolver(z.object({ items: z.array(formSchema) })),
    defaultValues: {
      items: initialItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        expiryDate: item.expiryDate,
        image: item.image,
        category_id: item.category_id,
      })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  useEffect(() => {
    setItems(initialItems);
    console.log("initialItems", initialItems);
  }, []);

  const handleAddItem = () => {
    append({
      name: "",
      quantity: 1,
      expiryDate: 0,
      image: null,
      category_id: 0,
    });
  };

  const handleDeleteItem = (index: number) => {
    remove(index);
  };

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data.items);
  });

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
      <ScrollArea className="h-[50vh]">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-4 mt-2 mb-1">
            <Form {...form}>
              <form
                onSubmit={handleSubmit}
                className="w-full flex gap-4 items-end"
              >
                <FormField
                  control={form.control}
                  name={`items.${index}.category_id`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="mb-1 mt-1 flex flex-col gap-2">
                        Item Name *
                        <span>
                          {initialItems[index].name !== "" && (
                            <span className="font-thin italic">
                              (Scanned food - {initialItems[index].name})
                            </span>
                          )}
                        </span>
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "justify-between w-[22rem]",
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
                                        `items.${index}.category_id`,
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
                  name={`items.${index}.quantity`}
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
                  name={`items.${index}.expiryDate`}
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
                                "pl-3 text-left font-normal w-44",
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
                  name={`items.${index}.image`}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                          <Input
                            className="min-w-24"
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
                <Button
                  className="bg-rose-600 text-text-50 mt-4"
                  onClick={() => handleDeleteItem(index)}
                >
                  Delete
                </Button>
              </form>
            </Form>
          </div>
        ))}
      </ScrollArea>
      <div className="flex flex-col items-center justify-center gap-2 w-full">
        <Button
          className="bg-secondary-400 text-text-50 mt-4"
          onClick={handleAddItem}
        >
          Add Row
        </Button>
        <Button
          type="submit"
          className="bg-primary-400 text-text-50 mt-4 w-1/2"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </main>
  );
};

export default AddMultipleItems;
