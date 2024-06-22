import { React, useId, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useDocUploadMutation,
  useInsertDocumentMutation,
  userAccessListMutation,
} from "../hooks/mutation.hook";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFetchAllDocumentQuery, useFetchAllUsers, useFetchDocByUser } from "@/hooks/query.hook";
import UserAccessList from "./user_access_list";
import { useRouter } from "next/router";

// FOR TOAST
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useUserStore from "@/stores/useUserStore";

const NewDocument = () => {
  const router = useRouter();
  const [documentName, setDocName] = useState('')

  const newDocument = (name) => {
    if (router.query[name]) {
      delete router.query[name];
    } else {
      router.query[name] = true;
    }
    router.push(router, undefined, { shallow: true });
  };

  const { data, isLoading } = useFetchAllUsers();
  const {data:doc, refetch } = useFetchDocByUser();
  
  const initialValues = {
    title: "",
    docName: null,
    userId: [],
  };

  const documentSchema = Yup.object({
    title: Yup.string().required("Title is required"),
  });

  const { mutate: documentAccess, isLoading: isAccessLoading } = userAccessListMutation({
    onSuccess(data) {
      console.log(data)
      refetch();

      toast.success("Document added successfully!",{
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      })
      reset();
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

  const {currentUser} = useUserStore()
  const role = currentUser.roles
  const { mutate: insertFile, isLoading: isInsertLoading } = useInsertDocumentMutation({
    onSuccess(data) {
      const userId = watch("userId");
      if (role === 'Secretary') {
        userId.push(currentUser.user_id)
      }
      const docId = data.value;
      console.log(useId)
      documentAccess({ docId, userId });
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

  const { mutate: uploadFile, isLoading: isUploadLoading } = useDocUploadMutation({
    onSuccess(data) {
      const docName = data;
      const title = watch("title");
      insertFile({ docName, title });
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
    watch,
  } = useForm({
    values: initialValues,
    resolver: yupResolver(documentSchema),
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    uploadFile({formData, docName: data.file[0].name.split('.')[0]});
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <ToastContainer />
      <div className="bg-white shadow-2xl rounded-md w-[600px] mob_screen:w-[400px] new_document:w-[300px] p-6">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-semibold mob_screen:text-lg">
            Add a new document
          </div>
          <div>
            <img
              onClick={() => newDocument("open")}
              className="cursor-pointer"
              src="
            /images/cross.png"
              alt=""
              height={20}
              width={20}
            />
          </div>
        </div>
        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="label" htmlFor="title">
              Title
            </label>
            <input className="input_field" type="text" {...register("title")} />
            {errors.title && (
              <p className="text-red-500 text-xs">{errors.title.message}</p>
            )}
          </div>
          <div>
            <label className="label" htmlFor="file">
              Upload your document:
            </label>
            <input type="file" {...register("file", "docName")} />
            {errors.file && (
              <p className="text-red-500 text-xs">{errors.file.message}</p>
            )}
          </div>

          <div>
            <div className="p-2">
              <div className="sticky top-0 shadow-md bg-white w-full mb-4">
                <input
                  className="w-full border border-slate-300 rounded-md p-1 mt-2 focus:outline-blue-400"
                  type="text"
                  id="search"
                  placeholder="Search here"
                />
              </div>
              <div className="h-[200px] overflow-y-auto">
                {isLoading ? (
                  <div>Loading...</div>
                ) : (
                  data?.map((user, index) => (
                    <div
                      className="flex justify-between mt-4 border-b pb-2"
                      key={index}
                    >
                      <div className="flex gap-2 items-center">
                        <img
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
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end p-4 mr-4 mt-4">
            <div>
              {(isUploadLoading || isInsertLoading || isAccessLoading)?(<div><img src="/images/loading.gif" alt="" height={15} width={15}/></div>):''}
            </div>
            <button
              className="mt-4 w-24 text-md font-semibold flex justify-center gap-3 items-center bg-slate-200 p-1 rounded-md hover:bg-slate-300 duration-200"
              type="submit"
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
