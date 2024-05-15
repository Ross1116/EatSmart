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
  category_id,
  category_name,
  category_refrigerate,
  category_freeze,
  category_pantry,
  category_decompose,
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
  category_id: number;
  category_name: string;
  category_refrigerate: number | null;
  category_freeze: number | null;
  category_pantry: number;
  category_decompose: string;
  category_type: string;
  handleActiveClick?: (id: any) => void;
}) {
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
  } else {
    expiryMessage = `Expiring in ${dayDiff + 1} days`;
  }

  return (
    <div className={className} onClick={handleClick}>
      <Card className="bg-accent-50 hover:bg-background-50 group min-h-[54.5vh]">
        <CardHeader>
          <div className="h-[300px] w-full overflow-hidden mb-2 rounded-lg flex items-center justify-center">
            {image != null ? (
              <Image
                src={image}
                alt="food"
                height={0}
                width={500}
                className="h-full w-full group-hover:scale-105 overflow-hidden object-cover transition-transform ease-out"
              />
            ) : (
              <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <CardTitle>
              {category_id === 0 ? (
                <span>
                  {category_name} - {name}
                </span>
              ) : (
                category_name
              )}
            </CardTitle>
            <CardDescription className="text-rose-600 font-semibold">
              {expiryMessage}
            </CardDescription>
          </div>
          <CardDescription className="flex justify-between">
            <span>{getDate(added_date)}</span>
            <span>
              {quantity === 1 && `${quantity} item`}
              {quantity > 1 && `${quantity} items`}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="text-left">
          <p className="font-semibold -mt-3">Storage Methods:</p>
          <ul className="list-disc ml-3 flex flex-col gap-1 mt-1">
            {category_pantry && (
              <li>
                <div className="grid grid-cols-2">
                  <span>Pantry: </span>
                  <span>{category_pantry} days</span>
                </div>
              </li>
            )}
            {category_refrigerate && (
              <li>
                <div className="grid grid-cols-2">
                  <span>Refridgerate: </span>
                  <span>{category_refrigerate} days</span>
                </div>
              </li>
            )}
            {category_freeze && (
              <li>
                <div className="grid grid-cols-2">
                  <span>Freezer: </span>
                  <span>{category_freeze} days</span>
                </div>
              </li>
            )}
            {!category_freeze && !category_refrigerate && !category_pantry && (
              <li>
                <span>No information available for this item</span>
              </li>
            )}
          </ul>
        </CardContent>
        {/* <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
      </Card>
    </div>
  );
}
