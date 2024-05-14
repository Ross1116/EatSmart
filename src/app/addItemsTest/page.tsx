"use client";
import React from "react";
import AddMultipleItems from "@/components/AddMultipleItems";

const handleSubmit = (values: any) => {
  console.log("Submitted items:", values);
  // You can perform further actions here, such as sending the data to the server
};
const Page: React.FC = () => {
  return (
    <div>
      <AddMultipleItems onSubmit={handleSubmit} />
    </div>
  );
};

export default Page;
