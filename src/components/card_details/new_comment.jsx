import React from "react";
import { useState, useEffect } from "react";

const NewComment = () => {
  const [text, setText] = useState("");

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    const textarea = document.getElementById("autoResizableTextArea");

    const handleScroll = () => {
      if (textarea) {
        const newHeight = textarea.scrollHeight + textarea.scrollTop;
        textarea.style.height = `${newHeight}px`;
      }
    };

    if (textarea) {
      textarea.addEventListener("input", handleScroll);
    }

    return () => {
      if (textarea) {
        textarea.removeEventListener("input", handleScroll);
      }
    };
  }, []);

  return (
    <div className="flex items-center gap-5 p-2">
      <div className="border rounded-full p-2 cursor-pointer w-1/10">
        <img src="/images/account.png" alt="" height={25} width={25} />
      </div>
      <form action="#" className="flex gap-5 w-4/5">
        <textarea
          id="autoResizableTextArea"
          className="h-[40px] mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 transition duration-150 ease-in-out resize-none"
          value={text}
          onChange={handleInputChange}
          style={{ overflowY: "hidden" }}
          placeholder="Your comment here..."
        />
        <button type="submit" className="w=1/10">
          <img src="/images/send.png" alt="" height={25} width={25} />
        </button>
      </form>
    </div>
  );
};

export default NewComment;
