import React from 'react'

const MyListLoader = () => {
  return (
    <div className="py-1 animate-pulse flex justify-center items-center  w-full h-full flex-col gap-6 p-4 mt-4">
      <div className='bg-slate-700 rounded w-full h-16'></div>
    <div className=" w-full grid grid-cols-2 gap-4 lg:grid-cols-5">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          className=" bg-slate-700 rounded col-span-1 w-full h-[300px] lg:h-[400px]"
          key={index}
        ></div>
      ))}
    </div>
  </div>
  )
}

export default MyListLoader
