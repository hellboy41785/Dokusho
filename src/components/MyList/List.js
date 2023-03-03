/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

const List = ({ bookMark }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5">
      {bookMark.map((book) => (
        <div className="flex flex-col w-full h-full gap-2 p-3" key={book.id}>
          <Link href={`/${book.slug}`}>
            <img
              className=" rounded-md object-cover w-full min-h-[300px] max-h-[300px] lg:min-h-[400px] lg:max-h-[400px]"
              src={book.img}
              alt="bookMark"
            />
          </Link>
          <div className="w-full h-full bg-[#2c3441] p-1 rounded-md flex flex-col gap-2 justify-between">
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="font-bold text-center lg:text-xl">{book.title}</h1>
              <h3 className="badge badge-primary">{book.type}</h3>
            </div>
            <div>
              {book.ch !== "0" && (
                <Link
                  className="flex btn btn-active btn-secondary"
                  href={`/read/${book.slug}/${book.chId}`}
                >
                  <h1>Reading : {book.ch}</h1>
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
