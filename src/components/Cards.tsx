import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import diner from "../assets/diner-1.webp";
import { Button } from "@/components/ui/button";

function getDate(epoch: any) {
  const dateObj = new Date(epoch * 1000);
  const month = dateObj.getUTCMonth() + 1; // months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  // Using padded values, so that 2023/1/7 becomes 2023/01/07
  const pMonth = month.toString().padStart(2, "0");
  const pDay = day.toString().padStart(2, "0");
  const newPaddedDate = `${year}/${pMonth}/${pDay}`;

  return newPaddedDate;
}

export default function Cards({
  name,
  expiry_date,
  quantity,
  added_date,
  image,
}: {
  name: string;
  expiry_date: any;
  quantity: number;
  added_date: any;
  image: any;
}) {
  return (
    <div>
      <Drawer>
        <DrawerTrigger>
          <Card className="bg-accent-50 hover:bg-background-50 group">
            <CardHeader>
              <div className="h-[300px] overflow-hidden mb-2 rounded-lg">
                <Image
                  src={image}
                  alt="food"
                  width={500}
                  height={500}
                  objectFit="cover"
                  className="group-hover:scale-105 overflow-hidden object-fill transition-transform ease-out"
                />
              </div>
              <div className="flex justify-between">
                <CardTitle>{name}</CardTitle>
                <CardDescription className="text-rose-600 font-semibold">
                  {getDate(expiry_date)}
                </CardDescription>
              </div>
              <CardDescription className="text-left">
                {getDate(added_date)}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-left">
              <p className="font-semibold -mt-3">Storage Methods:</p>
              <ul className="list-disc ml-3">
                <li>Refridgerate upto 10 days</li>
              </ul>
            </CardContent>
            {/* <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
          </Card>
        </DrawerTrigger>
        <DrawerContent className="group h-3/4 bg-[#121405] px-96 hover:bg-background-50 flex flex-col justify-between">
          <DrawerHeader>
            <div className="flex w-full h-full overflow-hidden mb-2 rounded-lg justify-center items-center mt-1">
              <Image
                src={image}
                alt="food"
                width={300}
                height={300}
                className="group-hover:scale-150 overflow-hidden object-cover transition-transform rounded-lg "
              />
            </div>
            <div className="flex justify-between items-center">
              <DrawerTitle className="text-4xl font-bold">{name}</DrawerTitle>
              <DrawerDescription className="text-xl text-rose-600 font-semibold">
                {getDate(expiry_date)}
              </DrawerDescription>
            </div>
            <DrawerDescription className="text-lg">
              {getDate(added_date)}
            </DrawerDescription>
          </DrawerHeader>
          <div className="text-lg">
            <p className="font-semibold mt-2 ml-3">Storage Methods:</p>
            <ul className="font-light list-disc ml-6">
              <li>Refridgerate upto 10 days</li>
            </ul>
            <p className="font-semibold mt-4 ml-3">Where to Donate?</p>
            <ul className="font-light list-disc ml-6">
              <li>Explore Nearby Locations</li>
            </ul>
            <p className="font-semibold mt-4 ml-3">Want to decompose</p>
            <ul className="font-light list-disc ml-6">
              <li>Methods to decompose</li>
            </ul>
          </div>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
