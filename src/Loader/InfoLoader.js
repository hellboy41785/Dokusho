import React from "react";

const InfoLoader = () => {
  return (
    <div class=" animate-pulse flex justify-center items-center  w-full h-full flex-col gap-6 p-4">
      <div class="flex flex-col lg:flex-row gap-4 w-full " >
        <div class="h-[500px] bg-slate-700 rounded lg:w-2/5"></div>
        <div class=" h-[500px] w-full bg-slate-700 "></div>
      </div>
      <div className="w-full h-[300px] bg-slate-700 "></div>
    </div>
  );
};

export default InfoLoader;
