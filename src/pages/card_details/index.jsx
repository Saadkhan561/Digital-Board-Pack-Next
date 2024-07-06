import { useState } from "react";
import { useForm } from "react-hook-form";

import Comment from "@/components/card_details/comments";
import NewComment from "@/components/card_details/new_comment";
import { withProtectedWrapper } from "@/components/Protected Routes/protected_login";
import {
  useDeleteDocument,
  useDocUploadMutation,
  useInsertUpdatedDocument,
} from "@/hooks/mutation.hook";
import { useFetchComments, useFetchDocumentById } from "@/hooks/query.hook";
import Layout from "@/layout/UserLayout";
import useUserStore from "@/stores/useUserStore";
import moment from "moment";
import Link from "next/link";
import { Bounce, toast } from "react-toastify";
import Image from "next/image";

const CardDetails = ({ id }) => {
  const [downloadPdf, setDownloadPdf] = useState(false);
  const [doc_version, setDocVersion] = useState(1);
  const [updateDoc, setUpdateDoc] = useState(false);
  const [docVersionDiv, setDocVersionDiv] = useState(false);
  const [doc, setDoc] = useState("");

  const { data: document } = useFetchDocumentById({ id });

  const { currentUser } = useUserStore();

  const { data: comments } = useFetchComments({
    docId: id,
    role: currentUser.roles,
  });

  const { mutate: deleteDoc } = useDeleteDocument({
    onSuccess(data) {
      toast.success(data + " " + "successfully!", {
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
    onError() {
      toast.error("Error occured", {
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

  const { mutate: insertUpdatedDoc } = useInsertUpdatedDocument({
    onSuccess() {
      toast.success("Document added successfully!", {
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
      reset();
      setUpdateDoc(false);
    },
    onError(data) {
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

  const { mutate: uploadFile } = useDocUploadMutation({
    onSuccess(data) {
      const title = watch("title");
      insertUpdatedDoc({ doc_name: data, title, doc_version, root_docId: id });
    },
    onError(error) {
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
    watch,
  } = useForm();

  let docName = document?.doc_name;
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    data && uploadFile({ formData, docName: docName });
  };

  return (
    <Layout>
      <div className="w-full relative">
        <div className="p-4 mr-4 ml-4">
          <div className="flex justify-between items-center border-b-2 border-b-gray-300 pb-4">
            <div className="flex items-center gap-5">
              <div>
                <Image
                  className="rounded-full mob_screen:h-[50px] mob_screen:w-[50px] h-[50px] w-[50px] menu_bar_mob:h-[30px] menu_bar_mob:w-[30px]"
                  src="/images/account.png"
                  alt=""
                />
              </div>
              <div>
                <p className="text-2xl mob_screen:text-lg menu_bar_mob:text-md font-bold text-blue-600">
                  {document?.title}
                </p>
                <div className="flex gap-2 text-gray-500 font-semibold">
                  <p className="text-md menu_bar_mob:text-xs mob_screen:text-sm">
                    {document?.username}
                  </p>
                  <p>|</p>
                  <p>{moment(document?.created_at).format("DD MMM YYYY")}</p>
                </div>
              </div>
            </div>
            <div className="relative flex items-center">
              <div className="relative p-1 text-sm rounded-lg border border-gray-400 cursor-pointer mr-2 hover:bg-slate-100 duration-200">
                <button
                  className="text-gray-500 font-semibold"
                  onClick={() => setUpdateDoc(!updateDoc)}
                >
                  Update document
                </button>
                <div
                  className={
                    updateDoc
                      ? "absolute z-10 top-10 bg-white border border-slate-100 shadow-2xl p-4 right-1"
                      : "hidden"
                  }
                >
                  <p className="font-semibold mb-4">
                    Upload the updated document
                  </p>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="file" {...register("file")} />
                    <button
                      className="border border-blue-500 text-sm cursor-pointer text-blue-500 p-1 rounded-lg mt-3"
                      type="submit"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
              <div onClick={() => setDownloadPdf(!downloadPdf)}>
                <Image
                  className="cursor-pointer hover:bg-slate-100 rounded-full p-1 duration-200 mob_screen:h-[20px] mob_screen:w-[20px] menu_bar_mob:h-[15px] menu_bar_mob:w-[15px]"
                  src="/images/dots.png"
                  alt=""
                  height={25}
                  width={25}
                />
              </div>
              <div
                className={
                  downloadPdf
                    ? "absolute z-10 top-10 right-2 w-[120px] border bg-white border-slate-100 shadow-2xl"
                    : "hidden"
                }
              >
                <ul className="flex flex-col items-center text-sm p-1">
                  <li className="hover:bg-slate-100 text-gray-500 duration-200 p-2 cursor-pointer w-full font-semibold">
                    <Link href={`/api/download-pdf/${document?.doc_name}`}>
                      Download
                    </Link>
                  </li>
                  {/* <li className="hover:bg-slate-100 duration-200 p-2 cursor-pointer w-full font-semibold text-red-500">
                    Delete
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
          {/* DOCUMENT DIV */}
          <div className="items-center flex justify-between p-4 pb-4 border-b-2 border-b-gray-300">
            <div>
              <Image
                className="mob_screen:h-[70px] mob_screen:w-[70px] menu_bar_mob:h-[50px] menu_bar_mob:w-[50px]"
                src="/images/word.png"
                alt=""
                height={100}
                width={100}
              />
            </div>
            <div className="flex p-2 items-center">
              <div className="p-1 cursor-pointer text-sm rounded-lg border border-gray-400 mr-4 hover:bg-slate-100 duration-200">
                <button>
                  <a
                    href={
                      document?.docVersions.length === 0
                        ? `/pdf/${doc}/${document?.doc_name}`
                        : `/pdf/${doc}/${document?.docVersions[0].doc_name}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 font-semibold"
                  >
                    Open PDF
                  </a>
                </button>
              </div>
              <div
                onClick={() => setDocVersionDiv(!docVersionDiv)}
                className={
                  document?.docVersions.length === 0
                    ? "hidden"
                    : "relative p-1 cursor-pointer text-sm rounded-lg border border-gray-400 mr-4 hover:bg-slate-100 duration-200 text-gray-500 font-semibold"
                }
              >
                <button className="flex gap-2 items-center">
                  <p>View all versions</p>
                  <Image
                    src="/images/down-arrow.png"
                    alt=""
                    height={15}
                    width={15}
                  />
                </button>
                <div
                  className={
                    docVersionDiv
                      ? "absolute top-10 p-1 border border-slate-100 bg-white shadow-2xl w-[140px]"
                      : "hidden"
                  }
                >
                  {document?.docVersions
                    .map((data, index) => (
                      <div
                        className="p-1 flex justify-between cursor-pointer"
                        key={index}
                      >
                        <a
                          href={`/pdf/${doc}/${document?.doc_name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:bg-slate-100 duration-200"
                        >
                          Version - {document.doc_version}
                        </a>
                        <Image
                          onClick={() =>
                            deleteDoc({
                              folder: doc,
                              docName: document.doc_name,
                            })
                          }
                          className="cursor-pointer hover:bg-slate-100 duration-200 p-1 h-6 w-6"
                          src="/images/trash.png"
                          alt=""
                        />
                      </div>
                    ))
                    .reverse()}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            {comments
              ?.map((comment, index) => {
                return (
                  <Comment
                    username={comment.username}
                    data={comment}
                    key={index}
                    comment={comment.comment_id}
                    roles={comment.roles}
                    commentator_id={comment.commentator_id}
                  />
                );
              })
              .reverse()}
            <NewComment />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  return { props: { id: context.query.id } };
};

export default withProtectedWrapper(CardDetails);
