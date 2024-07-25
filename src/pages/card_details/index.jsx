import { useEffect, useState } from "react";
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
import { Download, Pencil, Trash2, X } from "lucide-react";
import { useRouter } from "next/router";
import VersionModal from "@/components/versionModal/version_modal";

const CardDetails = ({ id }) => {
  const [doc_version, setDocVersion] = useState(1);
  const [updateDoc, setUpdateDoc] = useState(false);
  const [docVersionDiv, setDocVersionDiv] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [docVersionId, setDocVersionId] = useState();
  const [docVersionStatus, setDocVersionStatus] = useState();
  const [docVersionData, setDocVersionData] = useState();
  // console.log(docVersionData)

  const {
    data: document,
    refetch: refetchDoc,
    isError: fetchDocumentError,
  } = useFetchDocumentById({ id });
 

  useEffect(() => {
    let version = document && document.docVersions.length;
    setDocVersion(version + 1);
    if (document?.docVersions.length !== 0) {
      setDocVersionId(document?.docVersions[0].doc_id);
      setDocVersionStatus("version");
    } else {
      setDocVersionId(document?.doc_id);
      setDocVersionStatus("parent");
    }
  }, [document]);

  const router = useRouter();
  // refetchDoc();

  const { currentUser } = useUserStore();

  const { data: comments, refetch: refetchComments } = useFetchComments({
    docId: docVersionId,
    role: currentUser?.roles,
    docVersionStatus,
  });


  const { mutate: deleteDoc } = useDeleteDocument({
    onSuccess(data) {
      
      toast.success("Document deleted successfully!", {
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
      refetchDoc();
      if (data === "root") {
        router.push("/");
      }
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

  const { mutate: insertUpdatedDoc, isPending: isDocUpdatePending } =
    useInsertUpdatedDocument({
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
        refetchDoc();
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

  const docName =
    currentUser?.roles === "secretary" || document?.docVersions.length === 0
      ? document?.doc_name
      : document?.docVersions[0].doc_name;
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    uploadFile({ formData, docName: docName });
  };

  const doc = document?.doc_name?.split(".")[0];

  const docWarning = (name) => {
    if (router.query[name]) {
      delete router.query[name];
    } else {
      router.query[name] = true;
    }
    router.push(router, undefined, { shallow: true });
  };

  const versionModalHandler = (data) => {
    setModalState((prev) => !prev);
    setDocVersionData(data);
  };

  const accessList = (name) => {
    if (router.query[name]) {
      delete router.query[name];
    } else {
      router.query[name] = true;
    }
    router.push(router, undefined, { shallow: true });
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
                  height={50}
                  width={50}
                />
              </div>
              <div>
                <p className="text-2xl mob_screen:text-lg menu_bar_mob:text-md font-bold text-blue-600">
                  {document?.title}
                </p>
                <div className="flex gap-2 text-gray-500 font-semibold">
                  <p className="text-md menu_bar_mob:text-xs mob_screen:text-sm">
                    {document?.user_name}
                  </p>
                  <p>|</p>
                  <p>
                    {currentUser.roles === "secretary" ||
                    document?.docVersions.length === 0
                      ? moment(document?.created_at).format("DD MMM YYYY")
                      : moment(document?.docVersions[0].created_at).format(
                          "DD MMM YYYY"
                        )}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative flex items-center gap-2">
              <div
                onClick={() => accessList("access")}
                className="p-1 rounded-lg text-center text-sm font-semibold border border-gray-400 text-gray-500 cursor-pointer hover:bg-slate-100 duration-200"
              >
                Access List
              </div>
              {currentUser?.roles === "secretary" && (
                <div className="relative p-1 text-sm rounded-lg border border-gray-400 cursor-pointer hover:bg-slate-100 duration-200">
                  <button
                    className="text-gray-500 font-semibold"
                    onClick={() => setUpdateDoc(!updateDoc)}
                  >
                    <Pencil className="h-4 w-4 cursor-pointer" />
                  </button>
                  <div
                    className={
                      updateDoc
                        ? "absolute z-10 top-10 bg-white border border-slate-100 shadow-2xl p-4 right-1"
                        : "hidden"
                    }
                  >
                    <div className="flex justify-between items-center mb-4">
                      <p className="font-semibold">
                        Upload the updated document
                      </p>
                      <X
                        onClick={() => setUpdateDoc(!updateDoc)}
                        className="h-4 w-4"
                      />
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <input type="file" {...register("file")} />
                      <div className="flex gap-2 items-center">
                        <button
                          className={
                            isDocUpdatePending
                              ? "border border-blue-500 text-sm cursor-pointer text-blue-500 p-1 rounded-lg mt-3 opacity-50"
                              : "border border-blue-500 text-sm cursor-pointer text-blue-500 p-1 rounded-lg mt-3"
                          }
                          type="submit"
                          disabled={isDocUpdatePending}
                        >
                          Submit
                        </button>
                        {isDocUpdatePending && (
                          <Image
                            src="/images/loading.gif"
                            alt=""
                            height={15}
                            width={15}
                          />
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              )}
              <div className="flex gap-2">
                <button className="text-gray-500 border border-gray-500 rounded-lg p-1 hover:bg-slate-100 duration-200">
                  <Download className="h-4 w-4 cursor-pointer" />
                </button>
                {currentUser?.roles === "secretary" && (
                  <button className="relative text-gray-500 border border-gray-500 rounded-lg p-1 hover:bg-slate-100 duration-200">
                    <Trash2
                      className="h-4 w-4 cursor-pointer"
                      onClick={() => {
                        document?.docVersions.length === 0
                          ? docWarning("warning")
                          : deleteDoc({
                              folder: doc,
                              docName: document?.doc_name,
                              docId: document?.docVersions[0].doc_id,
                            });
                      }}
                    />
                    {router.query.warning && (
                      <div className="absolute top-10 right-1 w-[200px] border shadow-2xl bg-white p-2 z-10">
                        <div className="flex justify-end">
                          <X
                            onClick={() => docWarning("warning")}
                            className="h-4 w-4"
                          />
                        </div>
                        <p className="text-sm font-semibold p-1">
                          If you delete this document all of its versions will
                          also be deleted
                        </p>
                        <div
                          className="text-sm bg-red-500 p-1 text-white cursor-pointer"
                          onClick={() => {
                            document?.docVersions.length === 0
                              ? deleteDoc({
                                  folder: doc,
                                  docName: document?.doc_name,
                                  rootId: document?.doc_id,
                                })
                              : deleteDoc({
                                  folder: doc,
                                  docName: document?.docVersions[0].doc_name,
                                  docId: document?.docVersions[0].doc_id,
                                });
                          }}
                        >
                          Delete anyway
                        </div>
                      </div>
                    )}
                  </button>
                )}
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
              {currentUser?.roles === "secretary" && (
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
                    <div className="p-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div
                          onClick={() =>
                            versionModalHandler(document && document)
                          }
                        >
                          Original Document
                        </div>
                        <Trash2 className="h-4 w-4" />
                      </div>
                    </div>
                    <VersionModal
                      versionData={docVersionData}
                      modalState={modalState}
                      setModalState={setModalState}
                      docVersionStatus={
                        docVersionData?.docVersions.length
                          ? "parent"
                          : "version"
                      }
                    />
                    {document?.docVersions
                      .map((data, index) => (
                        <div
                          className="p-1 flex justify-between cursor-pointer"
                          key={index}
                        >
                          <div onClick={() => versionModalHandler(data)}>
                            Version - {data.doc_version}
                          </div>

                          <Image
                            onClick={() =>
                              deleteDoc({
                                folder: doc,
                                docName: data.doc_name,
                                docId: data.doc_id,
                              })
                            }
                            className="cursor-pointer hover:bg-slate-100 duration-200 p-1 h-6 w-6"
                            src="/images/trash.png"
                            alt=""
                            height={6}
                            width={6}
                          />
                        </div>
                      ))
                      .reverse()}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-5">
            {comments
              ?.map((comment, index) => {
                return (
                  <Comment
                    user_name={comment.user_name}
                    data={comment}
                    key={index}
                    docId={document?.doc_id}
                    comment={comment.comment_id}
                    roles={comment.roles}
                    commentator_id={comment.commentator_id}
                    refetchComments={refetchComments}
                    docVersionStatus={docVersionStatus}
                    doc_name={document?.title}
                  />
                );
              })
              .reverse()}
          </div>
          <NewComment
            parentDocId={document?.doc_id}
            docId={docVersionId}
            docVersionStatus={docVersionStatus}
            refetchComments={refetchComments}
            doc_name={document?.title}
          />
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  if (context?.query?.id) {
    return { props: { id: context.query.id } };
  }
  return { props: {} };
};

export default withProtectedWrapper(CardDetails);
