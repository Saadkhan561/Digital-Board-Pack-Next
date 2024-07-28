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
import Image from "next/image";
import { useFetchComments } from "@/hooks/query.hook";

const Comment = ({
  data: commentData,
  user_name,
  roles,
  commentator_id,
  // refetchComments,
  docVersionStatus,
  doc_name,
  docId,
  // parentDocId,
  docStatus,
}) => {
  const [isReply, setReply] = useState(false);
  const [isViewReply, setViewReply] = useState(false);
  const [commentDiv, setCommentDiv] = useState(false);
  const [updateCommentDiv, setUpdateCommentDiv] = useState(false);

  const updateReplyFunc = () => {
    setReply(!isReply);
    setViewReply(true);
  };

  const { refetch: refetchComments } = useFetchComments();

  const initialValues = {
    comment: "",
  };

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
  }, [commentDiv]);

  const router = useRouter();
  const id = router.query.id;
  const { mutate: deleteComment, isPending: isDeleteCommentPending } =
    useDeleteComment(
      { id },
      {
        onSuccess(data) {
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
          refetchComments();
        },
        onError(error) {
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
      setUpdateCommentDiv(false);
      refetchComments();
    },
    onError(data) {},
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
      docVersionStatus: docVersionStatus,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const setReplyFunc = () => {
    setViewReply(!isViewReply);
    setReply(!isReply);
  };

  const { currentUser } = useUserStore();

  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 w-4/5">
          <div className="border h-fit mt-2 rounded-full p-2">
            <Image
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
                    {user_name}
                  </p>
                  <p className="text-gray-500 text-sm menu_bar_mob:text-xs">
                    {moment(commentData?.created_at).format("DD MMM")}
                  </p>
                  <p className="text-gray-500 text-sm menu_bar_mob:text-xs">
                    {moment(commentData?.created_at).format("HH:mm")}
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
                      onKeyDown={handleKeyDown}
                    />
                    <button type="submit" className="w=1/10">
                      <Image
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
                  <Image
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
                          onClick={() =>
                            deleteComment({
                              id: commentData.comment_id,
                              docVersionStatus: docVersionStatus,
                            })

                          }
                          className="flex justify-between cursor-pointer hover:bg-slate-100 duration-200 p-1"
                        >
                          <p className="text-red-500">Delete</p>
                          {isDeleteCommentPending ? (
                            <Image
                              src="/images/trash.png"
                              alt=""
                              height={15}
                              width={15}
                            />
                          ) : (
                            <Image
                              src="/images/loading.gif"
                              alt=""
                              height={15}
                              width={15}
                            />
                          )}
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
                  {(roles === "user" || currentUser?.roles === "secretary") && (
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
            {isViewReply && (
              <div>
                {commentData.replies.map((reply) => (
                  <Replies
                    key={reply.comment_id}
                    replyData={reply}
                    refetchComments={refetchComments}
                    commentator_id={reply.commentator_id}
                    docVersionStatus={docVersionStatus}
                  />
                ))}
              </div>
            )}
            {isReply && (
              <div>
                <AddReply
                  doc_name={doc_name && doc_name}
                  docVersionStatus={docVersionStatus}
                  comment_id={commentData.comment_id}
                  updateReplyFunc={updateReplyFunc}
                  docId={docId}
                  docStatus={docStatus}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
