"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CircleHelp } from "lucide-react";
import ScanReceiptHover from "./ScanReceiptHover";
import ScanFoodHover from "./ScanFoodHover";

const formSchema = z
  .object({
    image: z.any(),
  })
  .refine((data) => data.image instanceof File, {
    message: "Image is required.",
    path: ["image"],
  });

const ScanImage = ({
  onSubmit,
  mode,
}: {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  mode: any;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: null,
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
  };

  return (
    <main className="flex flex-col items-center justify-between p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-md w-full flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="flex items-center justify-between">
                    Image *
                    <HoverCard>
                      <HoverCardTrigger>
                        <CircleHelp className="h-4" />
                      </HoverCardTrigger>
                      <HoverCardContent className="ml-[-37.5vw] mt-[-50vh]">
                        {mode === 1 ? <ScanReceiptHover /> : <ScanFoodHover />}
                      </HoverCardContent>
                    </HoverCard>
                  </FormLabel>
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

export default ScanImage;
