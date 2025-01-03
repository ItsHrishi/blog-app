import { Skeleton } from "@radix-ui/themes";
import React from "react";

const PostLoading = () => {
  return (
    <div className="h-full grid grid-flow-col gap-2 sm:grid-cols-8 md:grid-cols-10 grid-cols-9 p-4">
      {/* Left Content Skeleton */}
      <div className="flex flex-col justify-between sm:col-span-6 md:col-span-8 col-span-6 md:mt-2">
        {/* Author Info Section Skeleton */}
        <div className="mb-2 flex items-center space-x-2">
          <Skeleton className="w-8 h-8 rounded-full " />
          <div className="flex flex-col sm:flex-row items-start text-xs sm:text-sm">
            <Skeleton className="w-24 h-4  mb-1 sm:mb-0" />
            <Skeleton className="hidden sm:block w-4 h-4  mx-1 sm:mx-2" />
            <Skeleton className="w-16 h-4 " />
          </div>
        </div>

        {/* Title Skeleton */}
        <Skeleton className="w-full h-6  mb-2" />

        {/* Content Skeleton */}
        <Skeleton className="w-full h-4  mb-2" />
        <Skeleton className="w-4/5 h-4 mb-2" />

        {/* Footer Section Skeleton */}
        <div className="flex items-center gap-3 text-xs sm:text-sm md:text-base">
          <Skeleton className="w-20 h-6  rounded-full" />
          <div className="flex items-center gap-1 text-gray-500">
            <Skeleton className="w-4 h-4  rounded-full" />
            <Skeleton className="w-16 h-4 " />
          </div>
        </div>
      </div>

      {/* Right Content Skeleton */}
      <div className="sm:col-span-2 md:col-span-2 col-span-3 flex justify-center items-center">
        <div className="w-full aspect-[3/2]  rounded-md max-h-[220px] sm:max-h-[200px] md:max-h-[180px]">
          <Skeleton className="w-full h-full " />
        </div>
      </div>
    </div>
  );
};

export default PostLoading;
