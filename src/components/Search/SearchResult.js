/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useSearchQuery } from "@/query/useNovelupQuery";
import Loader from "@/Loader/Loader";
import Link from "next/link";
import { useNovelUpStore } from "@/store/useStore";
import SearchLoader from "@/Loader/SearchLoader";

const SearchResult = ({ search, setSearch }) => {
  const setSearchToggle = useNovelUpStore((state) => state.setSearchToggle);
  const { data, isLoading, isError } = useSearchQuery({ value: search });
  if (isLoading) return <SearchLoader />;

  const handleSubmit = () => {
    setSearch(null);
    setSearchToggle();
  };
  return (
    <div className="flex flex-col gap-2 rounded p-2 overflow-y-scroll scrollbar bg-black max-h-[400px] w-full lg:max-w-2xl">
      {data.length === 0 ? (
        <div className="flex justify-center ">
          <h1 className="text-2xl p-4">No Result</h1>
        </div>
      ) : (
        data.map((el) => (
          <Link
            href={`/${el.id}`}
            className="flex items-center gap-2"
            key={el.id}
            onClick={() => handleSubmit()}
          >
            <img
              className="object-cover max-w-[40px]"
              src={el.img}
              alt="search"
            />
            <h1>{el.title}</h1>
          </Link>
        ))
      )}
    </div>
  );
};

export default SearchResult;
