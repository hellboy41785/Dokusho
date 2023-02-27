import React from "react";

const ReadingLoader = () => {
  return (
    <div class="py-1 animate-pulse flex justify-center items-center  w-full h-full flex-col gap-6 p-4">
      {Array.from({ length: 14 }).map((_, index) => (
        <div class="flex-1 space-y-6 py-1 w-full max-w-2xl" key={index}>
          <div class="h-2 bg-slate-700 rounded w-full"></div>
          <div class="space-y-3">
            <div class="grid grid-cols-3 gap-4">
              <div class="h-2 bg-slate-700 rounded col-span-2 w-full"></div>
              <div class="h-2 bg-slate-700 rounded col-span-1 w-full"></div>
            </div>
            <div class="h-2 bg-slate-700 rounded w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReadingLoader;
