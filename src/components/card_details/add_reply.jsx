import React from "react";
import { useEffect } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useInsertReply } from "@/hooks/mutation.hook";
import { useRouter } from "next/router";
import { useFetchComments } from "@/hooks/query.hook";

const AddReply = ({comment_id}) => {
  const router = useRouter();
//   const docId = router.query.id;
//   const { refetch } = useFetchComments({ docId: docId }, { enabled: false });

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

  const { mutate: reply } = useInsertReply({
    onSuccess(data) {
    //   refetch();
      reset()
      console.log(data);
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
    // console.log(data);
    data["root_cmntId"] = comment_id;
    // console.log(data)
    reply(data);
  };

  return (
    <div>
      <div className="flex items-center gap-5 p-2">
        <div className="border rounded-full p-2 cursor-pointer w-1/10">
          <img src="/images/account.png" alt="" height={25} width={25} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-5 w-4/5">
          <textarea
            id="autoResizableTextArea"
            className="h-[40px] mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 transition duration-150 ease-in-out resize-none"
            {...register("comment")}
            style={{ overflowY: "hidden" }}
            placeholder="Your comment here..."
          />
          <button type="submit" className="w=1/10">
            <img src="/images/send.png" alt="" height={25} width={25} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReply;