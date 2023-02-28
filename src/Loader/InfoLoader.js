import React from "react";

const InfoLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-6 p-4  animate-pulse">
      <div className="flex flex-col w-full gap-4 lg:flex-row " >
        <div className="h-[500px] bg-slate-700 rounded lg:w-2/5"></div>
        <div className=" h-[500px] w-full bg-slate-700 "></div>
      </div>
      <div className="w-full h-[300px] bg-slate-700 "></div>
    </div>
  );
};

export default InfoLoader;
