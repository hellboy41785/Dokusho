/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
const List = ({ bookMark }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5">
      {bookMark.map((book) => (
        <Link
          href={`/${book.id}`}
          className="p-3 flex flex-col gap-2 w-full h-full"
          key={book.id}
        >
          <img
            className=" rounded-md object-cover w-full min-h-[300px] max-h-[300px] lg:min-h-[400px] lg:max-h-[400px]"
            src={book.img}
            alt="bookMark"
          />
          <div className="w-full h-full bg-[#2c3441] p-1 rounded-md flex flex-col gap-2 justify-between">
            <div className="flex flex-col justify-center items-center h-full">
              <h1 className="font-bold lg:text-xl text-center">{book.title}</h1>
              <h3 className="badge badge-primary">{book.type}</h3>
            </div>
            <div>
              {book.ch !== 0 && (
                <Link
                  className="btn btn-active btn-secondary flex"
                  href={`/read/${book.id}/${book.ch.chid}`}
                >
                  Reading : {book.ch.chap}
                </Link>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default List;
