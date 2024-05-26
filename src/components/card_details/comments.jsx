import React, { Component, useState } from "react";
import NewComment from "./new_comment";
import Replies from "./new_reply";


const Comment = ({ data }) => {
  const [isReply, setReply] = useState(false);
  const [isViewReply, setViewReply] = useState(false);

  const reply = () => {
    return (
      <div>
        <NewComment />
      </div>
    );
  };
  const viewReply = () => {
    return (
      <div>
        <Replies />
        <Replies />
      </div>
    );
  };
  return (
    <div className="flex gap-5 p-2">
      <div className="border h-fit mt-2 rounded-full p-2">
        <img
          className="menu_bar_div:h-[10px] menu_bar_mob:w-[10px]"
          src="/images/account.png"
          alt=""
          height={20}
          width={20}
        />
      </div>
      <div className="p-2 w-4/5 ml-2">
        <div className="flex gap-5 items-center">
          <p className="text-md menu_bar_mob:text-sm font-semibold">
            Senior Manager
          </p>
          <p className="text-gray-500 text-sm menu_bar_mob:text-xs">1 Nov</p>
        </div>
        <div className="menu_bar_div:text-xs">{data.comment}</div>
        <div className="text-gray-400 text-md mt-2">
          <p className="flex gap-5 menu_bar_mob:text-xs">
            {" "}
            <a onClick={() => setViewReply(!isViewReply)} href="#">
              View Replies
            </a>
            |
            <a onClick={() => setReply(!isReply)} href="#">
              Reply
            </a>
          </p>
        </div>
        {isViewReply && viewReply()}
        {isReply && reply()}
      </div>
    </div>
  );
};

export default Comment;
