import React from "react";
import { useState } from "react";

const Tags = ({ type, data }) => {
  return (
    <>
      <div className="w-full p-2 rounded dropdown dropdown-hover bg-primary-focus">
        <label
          tabIndex={0}
          className="flex items-center justify-center w-full h-full "
        >
          {type}
        </label>
        <div className="flex justify-center">
          <ul
            tabIndex={0}
            className="grid overflow-y-scroll scrollbar w-full grid-cols-3 p-2 shadow dropdown-content menu bg-base-100 rounded-box max-h-[250px]"
          >
            {data.map((el) => (
              <li className="flex items-center justify-center text-sm text-center" key={el.id}>
                <a >{el.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Tags;
