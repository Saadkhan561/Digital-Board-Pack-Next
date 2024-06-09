import React, { Component, useState, useEffect } from "react";
import NewComment from "./new_comment";
import Replies from "./new_reply";
import moment from "moment";
import { useDeleteComment, useUpdateComment } from "@/hooks/mutation.hook";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// FOR TOAST
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddReply from "./add_reply";
import useUserStore from "@/stores/useUserStore";

const Comment = ({
  data: commentData,
  refetchComment,
  username,
  roles,
  commentator_id,
}) => {
  const [isReply, setReply] = useState(false);
  const [isViewReply, setViewReply] = useState(false);
  const [commentDiv, setCommentDiv] = useState(false);
  const [updateCommentDiv, setUpdateCommentDiv] = useState(false);

  const initialValues = {
    comment: "",
  };

  // console.log(showReplies)

  const commentSchema = Yup.object({
    comment: Yup.string().required("Comment is required"),
  });

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
    
    if (!commentDiv){
      setUpdateCommentDiv(false)
    }
  }, [commentDiv]);

  const router = useRouter();
  const id = router.query.id;
  const { mutate: deleteComment } = useDeleteComment(
    { id },
    {
      onSuccess(data) {
        console.log(data);
        toast.success("Comment " + data, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      },
      onError(error) {
        console.log(error);
        toast.error(error, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      },
    }
  );

  const { mutate: updateComment } = useUpdateComment({
    onSuccess(data) {
      console.log(data);
      setUpdateCommentDiv(false);
      refetchComment();
    },
    onError(data) {
      console.log(data);
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    values: initialValues,
    resolver: yupResolver(commentSchema),
  });

  const onSubmit = (data) => {
    updateComment({
      comment: data.comment,
      comment_id: commentData.comment_id,
    });
  };

  const reply = () => {
    return (
      <div>
        <AddReply
          comment_id={commentData.comment_id}
          refetchComment={refetchComment}
        />
      </div>
    );
  };

  const setReplyFunc = () => {
    setViewReply(!isViewReply);
    setReply(!isReply);
  };

  const viewReply = () => {
    return (
      <div>
        {commentData.replies.map((reply) => (
          <Replies
            key={reply.reply_id}
            replyData={reply}
            refetchComment={refetchComment}
            commentator_id={reply.commentator_id}
          />
        ))}
      </div>
    );
  };

  const { currentUser } = useUserStore();

  return (
    <div>
      <ToastContainer />
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 w-4/5">
          <div className="border h-fit mt-2 rounded-full p-2">
            <img
              className="menu_bar_div:h-[10px] menu_bar_mob:w-[10px]"
              src="/images/account.png"
              alt=""
              height={20}
              width={20}
            />
          </div>
          <div className="p-2 w-full ml-2">
            <div className="flex justify-between">
              <div>
                <div className="flex gap-5 items-center">
                  <p className="text-md menu_bar_mob:text-sm font-semibold">
                    {username}
                  </p>
                  <p className="text-gray-500 text-sm menu_bar_mob:text-xs">
                    {moment(commentData?.createdAt).format("DD MMM")}
                  </p>
                </div>
                {updateCommentDiv && commentDiv ? (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex gap-5"
                  >
                    <textarea
                      id="autoResizableTextArea"
                      className="h-[40px] mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 transition duration-150 ease-in-out resize-none"
                      {...register("comment")}
                      style={{ overflowY: "hidden" }}
                      placeholder="Your comment here..."
                    />
                    <button type="submit" className="w=1/10">
                      <img
                        src="/images/send.png"
                        alt=""
                        height={25}
                        width={25}
                      />
                    </button>
                  </form>
                ) : (
                  <div className="menu_bar_div:text-xs">
                    {commentData.comment}
                  </div>
                )}
              </div>
              {commentator_id === currentUser.user_id ? (
                <div className="relative">
                  <img
                    onClick={() => setCommentDiv(!commentDiv)}
                    src="/images/dots.png"
                    alt=""
                    height={25}
                    width={25}
                    className="cursor-pointer p-1 hover:bg-slate-100 duration-200"
                  />
                  {commentDiv && (
                    <div className="absolute top-5 right-1 w-[150px] bg-white shadow-2xl p-1">
                      <div className="text-sm font-semibold">
                        <div
                          onClick={() => setUpdateCommentDiv(!updateCommentDiv)}
                          className="cursor-pointer hover:bg-slate-100 duration-200 p-1"
                        >
                          Edit comment
                        </div>
                        <div
                          onClick={() => deleteComment(commentData.comment_id)}
                          className="flex justify-between cursor-pointer hover:bg-slate-100 duration-200 p-1"
                        >
                          <p className="text-red-500">Delete</p>
                          <img
                            src="/images/trash.png"
                            alt=""
                            height={15}
                            width={15}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
            <div className="text-gray-400 text-md mt-2">
              <p className="flex gap-5 menu_bar_mob:text-xs">
                <div className="flex gap-2">
                  <a onClick={() => setViewReply(!isViewReply)} href="#">
                    View Replies
                  </a>
                  {(roles === "User" || currentUser.roles === "Secretary") && (
                    <div className="flex gap-2">
                      <p>|</p>
                      <a onClick={() => setReplyFunc()} href="#">
                        Reply
                      </a>
                    </div>
                  )}
                </div>
              </p>
            </div>
            {isViewReply && viewReply()}
            {isReply && reply()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
