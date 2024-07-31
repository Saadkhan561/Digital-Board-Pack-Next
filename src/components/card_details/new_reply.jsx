import moment from "moment";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useDeleteReply, useUpdateReply } from "@/hooks/mutation.hook";
import { yupResolver } from "@hookform/resolvers/yup";
import useUserStore from "@/stores/useUserStore";
import Image from "next/image";

const Replies = ({
  replyData,
  commentator_id,

  docVersionStatus,
}) => {
  const [commentDiv, setCommentDiv] = useState(false);
  const [updateCommentDiv, setUpdateCommentDiv] = useState(false);

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
  }, []);

  const { mutate: updateReply, isPending: isUpdateReplyPending } =
    useUpdateReply({
      onSuccess(data) {
        reset();
        setCommentDiv(false);
        setUpdateCommentDiv(false);
      },
      onError(data) {},
    });

  const { mutate: deleteReply, isPending: isDeleteReplyPending } =
    useDeleteReply({
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
    updateReply({
      comment: data.comment,
      comment_id: replyData.comment_id,
      docVersionStatus: docVersionStatus,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const { currentUser } = useUserStore();

  return (
    <div className="flex justify-between gap-2 items-center">
      <div className="flex gap-5 p-2">
        <div className="border h-fit mt-2 rounded-full p-2">
          <Image src="/images/account.png" alt="" height={20} width={20} />
        </div>
        <div className="p-2 w-4/5 ml-2">
          <div className="flex gap-5 items-center">
            <p className="text-md font-semibold">{replyData.user_name}</p>
            <p className="text-gray-500 text-sm">
              {moment(replyData.created_at).format("DD MMM")}
            </p>
            <p className="text-gray-500 text-sm">
              {moment(replyData.created_at).format("HH:mm")}
            </p>
          </div>
          {updateCommentDiv ? (
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-5">
              <textarea
                id="autoResizableTextArea"
                className={
                  isUpdateReplyPending
                    ? "h-[40px] mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 transition duration-150 ease-in-out resize-none opacity-50"
                    : "h-[40px] mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 transition duration-150 ease-in-out resize-none"
                }
                {...register("comment")}
                style={{ overflowY: "hidden" }}
                placeholder="Your comment here..."
                disabled={isUpdateReplyPending}
                onKeyDown={handleKeyDown}
              />
              <button type="submit" className="w=1/10">
                <Image
                  className={
                    isUpdateReplyPending ? "opacity-50 duration-200" : ""
                  }
                  src="/images/send.png"
                  alt=""
                  height={25}
                  width={25}
                />
              </button>
            </form>
          ) : (
            <div className="menu_bar_div:text-xs">{replyData.comment}</div>
          )}
        </div>
      </div>
      {commentator_id === currentUser.user_id && (
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
                    deleteReply({
                      id: replyData?.comment_id,
                      docVersionStatus: docVersionStatus,
                    })
                  }
                  className="flex justify-between cursor-pointer hover:bg-slate-100 duration-200 p-1"
                >
                  <p className="text-red-500">Delete</p>
                  {isDeleteReplyPending ? (
                    <Image
                      src="/images/loading.gif"
                      alt=""
                      height={15}
                      width={15}
                    />
                  ) : (
                    <Image
                      src="/images/trash.png"
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
      )}
    </div>
  );
};

export default Replies;
