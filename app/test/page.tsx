import React from "react";
import Badge from "@/components/BadgeComponent";

const YourComponent = () => {
  // Assuming you have a status variable in your component state or props
  const status = "pending";

  return (
    <div>
      <h1>Your Component</h1>
      <Badge status={status} />
    </div>
  );
};

export default YourComponent;
