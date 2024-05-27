import React, { Component, useState } from "react";
import NewComment from "./new_comment";
import Replies from "./new_reply";
import moment from "moment";
import { useDeleteComment } from "@/hooks/mutation.hook";
import { useRouter } from "next/router";

const Comment = ({ data }) => {
  // const [isReply, setReply] = useState(false);
  // const [isViewReply, setViewReply] = useState(false);

  const router = useRouter()
  const id = router.query.id
  const {mutate: deleteComment} = useDeleteComment({id},{
    onSuccess(data) {
      console.log(data)
    },
    onError(error) {
      console.log(error)
    }
  })

  // const reply = () => {
  //   return (
  //     <div>
  //       <NewComment />
  //     </div>
  //   );
  // };
  // const viewReply = () => {
  //   return (
  //     <div>
  //       <Replies />
  //       <Replies />
  //     </div>
  //   );
  // };
  return (
    <div className="flex justify-between gap-2 items-center">
      <div className="flex gap-2">
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
            <p className="text-gray-500 text-sm menu_bar_mob:text-xs">
              {moment(data?.createdAt).format("DD MMM")}
            </p>
          </div>
          <div className="menu_bar_div:text-xs">{data.comment}</div>
          {/* <div className="text-gray-400 text-md mt-2">
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
        </div> */}
          {/* {isViewReply && viewReply()}
        {isReply && reply()} */}
        </div>
      </div>
      <div onClick={() => deleteComment(data.comment_id)} className="hover:bg-slate-100 duration-200 rounded-full p-1 cursor-pointer">
        <img src="/images/dots.png" alt="" height={15} width={15} />
      </div>
    </div>
  );
};

export default Comment;
