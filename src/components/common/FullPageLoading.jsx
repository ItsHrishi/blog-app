import { Spinner } from "@radix-ui/themes";
import React from "react";

const FullPageLoading = () => {
  return (
    <div className="flex flex-grow items-center justify-center  h-screen">
      <Spinner size="3" />
    </div>
  );
};

export default FullPageLoading;
