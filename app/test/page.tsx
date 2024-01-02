import { LocalTime } from "@/lib/utils";
import React from "react";

const YourComponent = () => {
  console.log(LocalTime());
  console.log(new Date().toISOString());
  return <div>Hello</div>;
};

export default YourComponent;
