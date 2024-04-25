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

export default function Cards() {
  return (
    <div>
      <Drawer>
        <DrawerTrigger>
          <Card className="bg-accent-50 hover:bg-background-50 group">
            <CardHeader>
              <div className="w-full h-full overflow-hidden mb-2 rounded-lg">
                <Image
                  src={diner.src}
                  alt="food"
                  width={500}
                  height={500}
                  className="group-hover:scale-125 overflow-hidden object-cover transition-transform"
                />
              </div>
              <div className="flex justify-between">
                <CardTitle>Food Name</CardTitle>
                <CardDescription className="text-rose-600 font-semibold">
                  Expiry Date
                </CardDescription>
              </div>
              <CardDescription className="text-left">
                Date Added
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
                src={diner.src}
                alt="food"
                width={500}
                height={500}
                className="group-hover:scale-150 overflow-hidden object-cover transition-transform rounded-lg "
              />
            </div>
            <div className="flex justify-between items-center">
              <DrawerTitle className="text-4xl font-bold">
                Food Name
              </DrawerTitle>
              <DrawerDescription className="text-xl text-rose-600 font-semibold">
                Expiry Date
              </DrawerDescription>
            </div>
            <DrawerDescription className="text-lg">
              Date Added
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

          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
