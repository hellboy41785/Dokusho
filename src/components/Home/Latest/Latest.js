/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Book, Eye, CalendarRange } from "lucide-react";
import { useNovelUpStore } from "@/store/useStore";
import Link from "next/link";
const Latest = ({ data }) => {
  const [view, setView] = useState(false);
  const setSlug = useNovelUpStore((state) => state.setSlug);
  return (
    <Link href={`/${data.id}`} className="flex flex-col w-full gap-2 " onClick={()=>setSlug(data.id)}>
      <div className="relative w-full h-full cursor-pointer">
        <img
          className="object-cover rounded-md w-full min-h-[200px] max-h-[200px]"
          src={data.img}
          alt="latest"
        />
      </div>
      <div className="flex justify-between gap-1 p-1 text-sm">
        <h1 className="bg-[#4b4b4e] p-1 rounded-sm ">{data.rating}</h1>
        <h1 className="bg-[#4b4b4e] p-1 rounded-sm">{data.country}</h1>
      </div>

      <div className="p-1 flex flex-col bg-[#4b4b4e]  cursor-pointer  rounded-md gap-1">
        <h1 className="truncate">{data.title}</h1>
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1">
            <Book size={20} />
            <h1 className="">Ch :{data.chapter}</h1>
          </div>
          <div className="flex items-center gap-1">
            <h1 className="">{data.reader}</h1>
            <Eye size={20} />
          </div>
        </div>
        <div className="flex items-center justify-center gap-1">
          <CalendarRange size={20} />
          <h1 className="">{data.updated}</h1>
        </div>
      </div>
    </Link>
  );
};

export default Latest;
