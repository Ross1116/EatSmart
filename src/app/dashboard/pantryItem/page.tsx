import { Suspense } from "react";
import PantryItemPage from "@/components/PantryItem";

function SearchBarFallback() {
  return <div className="flex items-center justify-center text-5xl font-semibold">Loading ...</div>;
}

export default function Page() {
  return (
    <>
      <Suspense fallback={<SearchBarFallback />}>
        <PantryItemPage />
      </Suspense>
    </>
  );
}
