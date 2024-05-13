import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { getDate } from "@/lib/date";
import { useEffect } from "react";

export default function Cards({
  id,
  name,
  expiry_date,
  quantity,
  added_date,
  image,
  className,
  active,
  dayDiff,
  handleActiveClick,
}: {
  id: any;
  name: string;
  expiry_date: any;
  quantity: number;
  added_date: any;
  image: any;
  className?: string;
  active?: boolean;
  dayDiff?: number;
  handleActiveClick?: (id: any) => void;
}) 
{
  const handleClick = () => {
    if (handleActiveClick) {
      handleActiveClick(id);
    }
  };

  let expiryMessage;

  if (dayDiff + 1 === 1) {
    expiryMessage = `Expiring in ${dayDiff + 1} day`;
  } else if (dayDiff + 1 === 0) {
    expiryMessage = "Expiring today";
  } else if (dayDiff + 1 <= -1) {
    expiryMessage = `Expired ${Math.abs(dayDiff + 1)} day ago`;
  } else if (dayDiff + 1 <= -2) {
    expiryMessage = `Expired ${Math.abs(dayDiff + 1)} days ago`;
  }else {
    expiryMessage = `Expiring in ${dayDiff + 1} days`;
  }

  return (
    <div className={className} onClick={handleClick}>
      <Card className="bg-accent-50 hover:bg-background-50 group">
        <CardHeader>
          <div className="h-[300px] w-full overflow-hidden mb-2 rounded-lg flex items-center justify-center">
            <Image
              src={image}
              alt="food"
              height={0}
              width={500}
              className="h-full w-full group-hover:scale-105 overflow-hidden object-cover transition-transform ease-out"
            />
          </div>
          <div className="flex justify-between">
            <CardTitle>{name}</CardTitle>
            <CardDescription className="text-rose-600 font-semibold">
              {expiryMessage}
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
    </div>
  );
}
