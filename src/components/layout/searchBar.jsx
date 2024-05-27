import { useSearchDoc } from "@/hooks/mutation.hook";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Search = () => {
  const [text, setText] = useState('')

  const handleChange =(e) => {
    setText(e.target.value)
  }

  const router = useRouter()
  const handleSearch =() => {
    router.push({pathname: '/', query: {search: text}})
  }

  return (
    <div className="flex items-center w-[500px] mob_screen:w-4/5 md:w-[300px] ml-4 p-2 border border-gray-300 rounded-3xl">
      <div className="w-full">
        <input
          className="focus:outline-none w-full"
          type="text"
          placeholder="Search here..."
          value={text}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleSearch}>
        <img src="/images/search.png" alt="" height={20} width={20} />
      </button>
    </div>
  );
};

export default Search;
