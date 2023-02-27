import React from "react";

const Creator = ({ type, data }) => {
  return (
    <div className="p-2 rounded dropdown dropdown-hover bg-primary-focus">
      <label
        tabIndex={0}
        className="flex items-center justify-center w-full h-full "
      >
        {type}
      </label>
      <div className="flex justify-center">
        <ul
          tabIndex={0}
          className="w-full p-2 shadow dropdown-content menu bg-base-100 rounded-box"
        >
          {data.map((el) => (
            <li key={el.id}>
              <a>{el.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Creator;
