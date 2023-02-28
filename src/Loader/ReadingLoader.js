import React from "react";

const ReadingLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-6 p-4 py-1 animate-pulse">
      {Array.from({ length: 14 }).map((_, index) => (
        <div className="flex-1 w-full max-w-2xl py-1 space-y-6" key={index}>
          <div className="w-full h-2 rounded bg-slate-700"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="w-full h-2 col-span-2 rounded bg-slate-700"></div>
              <div className="w-full h-2 col-span-1 rounded bg-slate-700"></div>
            </div>
            <div className="w-full h-2 rounded bg-slate-700"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReadingLoader;
