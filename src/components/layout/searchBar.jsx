import { useSearchDoc } from "@/hooks/mutation.hook";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Search = ({ value, setValue }) => {
  return (
    <div className="flex items-center w-[500px] mob_screen:w-4/5 md:w-[300px] ml-4 p-2 border border-gray-300 rounded-3xl">
      <div className="w-full">
        <input
          className="focus:outline-none w-full"
          type="text"
          placeholder="Search here..."
          value={value}
          onChange={(e) => setValue?.(e.target.value, "search")}
        />
      </div>

      <Image src="/images/search.png" alt="" height={20} width={20} />
    </div>
  );
};

export default Search;
