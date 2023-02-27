import React from "react";
import { useState } from "react";
import SearchResult from "./SearchResult";

const Search = () => {
  const [search, setSearch] = useState(null);
  return (
    <div className="fixed z-10 flex flex-col w-full gap-3 p-1 top-3 justify-center items-center">
      <input
        type="text"
        placeholder="Search here and press enter"
        className="lg:max-w-2xl w-full input input-bordered input-secondary"
        onChange={(e) => {
          const searchText = e.target.value.trim();
          const lastChar = searchText.charAt(searchText.length - 1);
          if (searchText.length > 0 && lastChar === " ") {
            setSearch(searchText.trim());
          } else {
            setSearch(null);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const searchText = e.target.value.trim();
            setSearch(searchText);
          }
        }}
      />
      {search !== null && (
        <SearchResult search={search} setSearch={setSearch} />
      )}
    </div>
  );
};

export default Search;
