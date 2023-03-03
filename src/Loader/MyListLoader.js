import React from 'react'

const MyListLoader = () => {
  return (
    <div className="py-1 animate-pulse flex justify-center items-center  w-full h-full flex-col gap-6 p-4 mt-4">
    
    <div className=" w-full grid grid-cols-2 gap-4 lg:grid-cols-4">
      {Array.from({ length: 14 }).map((_, index) => (
        <div
          className=" bg-slate-700 rounded col-span-1 w-full h-[300px]"
          key={index}
        ></div>
      ))}
    </div>
  </div>
  )
}

export default MyListLoader
