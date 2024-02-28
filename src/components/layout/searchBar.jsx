import React from "react";

const Search = () => {
  return (
    <div className="flex items-center w-[500px] mob_screen:w-4/5 md:w-[300px] ml-4 p-2 border border-gray-300 rounded-3xl">
      <div className="w-full">
        <input
          className="focus:outline-none w-full"
          type="text"
          placeholder="Search here..."
        />
      </div>
      <button>
        <img src="/images/search.png" alt="" height={20} width={20} />
      </button>
    </div>
  );
};

export default Search;
