import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Share from "@/components/share_doc_popup";
import Comment from "@/components/card_details/comments";
import NewComment from "@/components/card_details/new_comment";
import Layout from "@/layout/UserLayout";
import { useRouter } from "next/router";
import { useFetchComments, useFetchDocumentById } from "@/hooks/query.hook";
import moment from "moment";
import Link from "next/link";
import { withProtectedWrapper } from "@/components/Protected Routes/protected_login";
import { useDocUploadMutation } from "@/hooks/mutation.hook";

const CardDetails = () => {
  const [isShare, setShare] = useState(false);
  const [downloadPdf, setDownloadPdf] = useState(false);

  const renderShareDiv = () => {
    if (isShare) {
      return (
        <div className="">
          <Share />
        </div>
      );
    }
  };

  // HOOK TO REDIRECT WITH DOCUMENT'S ID
  const router = useRouter();

  const id = router.query.id;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useFetchDocumentById({ id }, { enabled: Boolean(id) });
  const { data: comments, refetch } = useFetchComments(
    { docId: id },
    { enabled: id ? true : false }
  );

  // console.log(comments);

  const { mutate: uploadFile } = useDocUploadMutation({
    onSuccess(data) {
      console.log(data)
      const docName = data;
      const title = watch("title");
      // insertFile({ docName, title });
    },
    onError(error) {
      console.log(error)
      toast.error("Failed to Upload Document", {
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
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm();

  const onSubmit = (data) => {
    console.log(data.file[0])
    const formData = new FormData();
    formData.append("file", data.file[0]);
    uploadFile(formData);
  }

  return (
    <Layout>
      <div className="w-full relative">
        <div className="p-4 mr-4 ml-4">
          <div className="flex justify-between items-center border-b-2 border-b-gray-300 pb-4">
            <div className="flex items-center gap-5">
              <div>
                <img
                  className="rounded-full mob_screen:h-[50px] mob_screen:w-[50px] h-[50px] w-[50px] menu_bar_mob:h-[30px] menu_bar_mob:w-[30px]"
                  src="/images/account.png"
                  alt=""
                />
              </div>
              <div>
                <p className="text-2xl mob_screen:text-lg menu_bar_mob:text-md font-bold text-blue-600">
                  {data?.value.title}
                </p>
                <p className="text-md menu_bar_mob:text-xs mob_screen:text-sm text-gray-500 font-semibold">
                  {data?.value.username} -
                  {moment(data?.createdAt).format("DD MMM YYYY")}
                </p>
              </div>
            </div>
            <div className="relative flex items-center">
              <div className="relative p-1 text-sm rounded-lg border border-blue-500 cursor-pointer mr-2 hover:bg-slate-100 duration-200">
                <button className="text-blue-500">Update document</button>
                <div className="absolute top-10 bg-white border border-slate-100 shadow-lg p-4 right-1">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="file" {...register('file')}/>
                    <button className="border border-blue-500 text-sm cursor-pointer text-blue-500 p-1 rounded-lg mt-3" type="submit">Submit</button>
                  </form>
                </div>
              </div>
              <div onClick={() => setDownloadPdf(!downloadPdf)}>
                <img
                  className="cursor-pointer mob_screen:h-[20px] mob_screen:w-[20px] menu_bar_mob:h-[15px] menu_bar_mob:w-[15px]"
                  src="/images/dots.png"
                  alt=""
                  height={25}
                  width={25}
                />
              </div>
              <div
                className={
                  downloadPdf
                    ? "absolute top-10 right-2 w-[120px] border bg-white rounded-lg border-slate-300 shadow-2xl"
                    : "hidden"
                }
              >
                <ul className="flex flex-col items-center">
                  <li className="hover:bg-slate-200 p-4 cursor-pointer w-full font-semibold">
                    <Link href={`/api/download-pdf/${data?.value.doc_name}`}>
                      Download
                    </Link>
                  </li>
                  <li className="hover:bg-slate-200 p-4 cursor-pointer w-full font-semibold text-red-500">
                    Delete
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* DOCUMENT DIV */}
          <div className="items-center flex justify-between p-4 pb-4 border-b-2 border-b-gray-300">
            <div>
              <img
                className="mob_screen:h-[70px] mob_screen:w-[70px] menu_bar_mob:h-[50px] menu_bar_mob:w-[50px]"
                src="/images/word.png"
                alt=""
                height={100}
                width={100}
              />
            </div>
            <div className="flex p-2 items-center">
              <div className="p-1 text-sm rounded-lg text-blue-500 border border-blue-500 cursor-pointer mr-4 hover:bg-slate-100 duration-200">
                <button>
                  <a
                    href={`/pdf/${data?.value.doc_name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open PDF
                  </a>
                </button>
              </div>
              <div>
                <img
                  onClick={() => setShare(!isShare)}
                  className="cursor-pointer mob_screen:h-[20px] mob_screen:w-[20px] menu_bar_mob:h-[15px] menu_bar_mob:w-[15px]"
                  src="/images/share.png"
                  alt=""
                  height={25}
                  width={25}
                />
                {renderShareDiv()}
              </div>
            </div>
          </div>
          {/* COMMENT DIV */}
          <div className="mt-5">
            {comments?.reverse()?.map((comment, index) => {
              return <Comment data={comment} key={index} />;
            })}

            <NewComment />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withProtectedWrapper(CardDetails);
