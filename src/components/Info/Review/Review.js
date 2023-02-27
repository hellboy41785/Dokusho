/* eslint-disable @next/next/no-img-element */
import React from "react";

const Review = ({ reviews }) => {
  return (
    <div className=" space-y-4">
      <h1 className="btn btn-secondary flex ">Review</h1>
      <section className="flex flex-col gap-4">
        {reviews.length === 0 ? (
          <div className=" flex justify-center mt-4 p-10">
            <h1 className=" text-3xl">No review</h1>
          </div>
        ) : (
          reviews.map((el) => (
            <div key={el.id}>
              <div className="z-10 flex items-end gap-3">
                <div className=" avatar">
                  <div className="w-24 rounded-full">
                    <img src={el.img} alt="user" />
                  </div>
                </div>
                <h1>{el.user}</h1> /<h1>{el.date}</h1>
              </div>
              <p className="text-lg border-t border-b ">
                {el.comment.replace(/<<less/g, "").replace(/more>>/g, "")}
              </p>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default Review;
