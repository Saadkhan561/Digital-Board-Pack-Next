import { useFetchAllUsers, useFetchDocByUser } from "@/hooks/query.hook";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import {
  useDocUploadMutation,
  useInsertDocumentMutation,
  useAccessListMutation,
} from "../hooks/mutation.hook";

// FOR TOAST
import useUserStore from "@/stores/useUserStore";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { X } from "lucide-react";

const NewDocument = () => {
  const router = useRouter();
  const [documentName, setDocName] = useState("");

  const [fileExtError, setFileExtError] = useState()

  const newDocument = (name) => {
    if (router.query[name]) {
      delete router.query[name];
    } else {
      router.query[name] = true;
    }
    router.push(router, undefined, { shallow: true });
  };

  const { data, isLoading } = useFetchAllUsers();


  const { refetch: refetchDoc } = useFetchDocByUser();

  const { currentUser } = useUserStore();
  const user_id = currentUser.user_id;
  const initialValues = {
    title: "",
    doc_name: null,
    userId: [user_id],
  };

  const documentSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    doc_name: Yup.mixed().required("A file is required"),
    userId: Yup.array().min(2, "At least one user is required"),
  });

  const { mutate: documentAccess, isLoading: isAccessLoading } =
    useAccessListMutation({
      onSuccess(data) {
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
        refetchDoc();
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
      }
    });

  const role = currentUser?.roles;
  const { mutate: insertFile, isLoading: isInsertLoading } =
    useInsertDocumentMutation({
      onSuccess(data) {
        const userId = watch("userId");
        if (role === "secretary") {
          userId.push(currentUser.user_id);
        }
    
        const docId = data.value;
        documentAccess({ docId, userId });
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

  const { mutate: uploadFile, isLoading: isUploadLoading } =
    useDocUploadMutation({
      onSuccess(data) {
        const doc_name = data.value;
        const title = watch("title");

        insertFile({ doc_name, title });
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
  } = useForm({
    values: initialValues,
    resolver: yupResolver(documentSchema),
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    if (data.doc_name[0].name.split('.')[1] === "pdf" || data.doc_name[0].name.split('.')[1] === "docx") {
      formData.append("file", data.doc_name[0]);
      const file = data.doc_name[0].name.split(".")[0];
      setFileExtError(null)
      uploadFile({ formData, docName: file });
    } else {
      setFileExtError("File extension should be pdf or docx")
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="bg-white shadow-2xl rounded-md w-[600px] mob_screen:w-[400px] new_document:w-[300px]">
        <div className="flex justify-between items-center bg-slate-900 text-white p-4">
          <div className="text-xl font-semibold mob_screen:text-lg">
            Add a new document
          </div>
          <X
            onClick={() => newDocument("open")}
            className="h-6 w-6 cursor-pointer rounded-full p-1 hover:bg-slate-700 duration-200"
          />
        </div>
        <form className=" p-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="label" htmlFor="title">
              Title
            </label>
            <input className="input_field" type="text" {...register("title")} />
            {errors.title && (
              <p className="text-red-500 text-xs">{errors.title.message}</p>
            )}
          </div>
          <div className="mt-4">
            <label className="label" htmlFor="file">
              Upload your document:
            </label>
            <input className="ms-2" type="file" {...register("doc_name")} />
            {errors.doc_name && (
              <p className="text-red-500 text-xs">{errors.doc_name.message}</p>
            )}
            {fileExtError !== null ? (<p className="text-red-500 text-xs">{fileExtError}</p>):null}
          </div>

          <div>
            <div className="p-2 mt-4">
              <div className="font-semibold text-xl">Add Permissions</div>
              <div className="h-[200px] overflow-y-auto mt-2">
                {isLoading ? (
                  <div>Loading...</div>
                ) : (
                  data?.map(
                    (user, index) =>
                      user.roles === "user" && (
                        <div
                          className="flex justify-between mt-4 border-b pr-2 pl-2 pb-2"
                          key={index}
                        >
                          <div className="flex gap-2 items-center">
                            <Image
                              src="/images/account.png"
                              alt=""
                              height={20}
                              width={20}
                            />
                            <p>{user.email}</p>
                          </div>
                          <input
                            className="cursor-pointer"
                            type="checkbox"
                            {...register("userId")}
                            value={user?.user_id}
                          />
                        </div>
                      )
                  )
                )}
              </div>
            </div>
            {errors.userId && (
              <p className="text-red-500 text-xs">{errors.userId.message}</p>
            )}
          </div>
          <div className="flex justify-end gap-2 items-center p-4 mr-4 mt-4">
            <div>
              {isUploadLoading || isInsertLoading || isAccessLoading ? (
                <div className="pt-2">
                  <Image
                    src="/images/loading.gif"
                    alt=""
                    height={15}
                    width={15}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
            <button
              className={isUploadLoading || isInsertLoading || isAccessLoading ? "mt-4 w-24 text-md font-semibold flex justify-center gap-3 items-center bg-slate-100 p-1 rounded-md hover:bg-slate-300 duration-200":"mt-4 w-24 text-md font-semibold flex justify-center gap-3 items-center bg-slate-200 p-1 rounded-md hover:bg-slate-300 duration-200"}
              type="submit"
              disabled={isUploadLoading || isInsertLoading || isAccessLoading}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewDocument;
