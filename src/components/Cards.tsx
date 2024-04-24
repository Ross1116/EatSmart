import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import diner from "../assets/diner-1.webp";

export default function Cards() {
  return (
    <div>
      <Card className="bg-secondary-50 hover:bg-background-50 group">
        <CardHeader>
          <div className="w-full h-full overflow-hidden">
            <Image
              src={diner.src}
              alt="food"
              width={500}
              height={500}
              className="mb-2 group-hover:scale-125 overflow-hidden object-cover transition-transform"
            />
          </div>
          <div className="flex justify-between">
            <CardTitle>Food Name</CardTitle>
            <CardDescription className="text-rose-600">
              Expiry Date
            </CardDescription>
          </div>
          <CardDescription>Date Added</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-semibold">Storage Methods:</p>
          <ul>
            <li>- Refridgerate upto 10 days</li>
          </ul>
        </CardContent>
        {/* <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
      </Card>
    </div>
  );
}
