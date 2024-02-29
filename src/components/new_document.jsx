import { React, useState, useEffect, useRef } from "react";
import { useController, useForm } from "react-hook-form";
import {
  useDocUploadMutation,
  useInsertDocumentMutation,
  userAccessListMutation,
} from "../hooks/mutation.hook";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDocumentOnlyId, useFetchAllUsers } from "@/hooks/query.hook";
import UserAccessList from "./user_access_list";

const NewDocument = ({ prevNewDocument, updateNewDocument }) => {
  const [isNewDocument, setNewDocument] = useState(prevNewDocument);

  useEffect(() => {
    updateNewDocument(isNewDocument);
  }, [isNewDocument]);

  // HOOK TO FETCH ALL USERS
  const { data, isLoading } = useFetchAllUsers();
  console.log(data);

  const initialValues = {
    title: "",
    docName: null,
    userId: [],
  };

  const documentSchema = Yup.object({
    title: Yup.string().required("Title is required"),
  });

  const { mutate: documentAccess } = userAccessListMutation({
    onSuccess(data) {
      console.log(data);
    },
    onError(error) {
      console.log(error);
    },
  });


  const { mutate: insertFile } = useInsertDocumentMutation({
    onSuccess(data) {
      const {documentId } = useDocumentOnlyId()
      console.log(documentId.data.doc_id)
      const doc_id = documentId.doc_id
    },
    onError(error) {
      console.log(error);
    },
  });

  const { mutate: uploadFile } = useDocUploadMutation({
    onSuccess(data) {
      // console.log(data, "file uploaded");
      const docName = data;
      const title = watch("title");
      console.log(docName, title);
      insertFile({ docName, title });
    },
    onError(error) {
      console.log(error);
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
    console.log(data);
    uploadFile(formData);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="bg-white shadow-2xl rounded-md w-[600px] mob_screen:w-[400px] new_document:w-[300px] p-6">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-semibold mob_screen:text-lg">
            Add a new document
          </div>
          <div>
            <img
              onClick={() => setNewDocument(!isNewDocument)}
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
            <input
              // className="mt-4 mb-4"
              type="file"
              {...register("file")}
            />
            {errors.file && (
              <p className="text-red-500 text-xs">{errors.file.message}</p>
            )}
          </div>

          {/* ACCESS LIST DIV */}
          <div>
            <div className="p-2">
              {/* SEARCH BAR */}
              <div className="sticky top-0 shadow-md bg-white w-full mb-4">
                <input
                  className="w-full border border-slate-300 rounded-md p-1 mt-2 focus:outline-blue-400"
                  type="text"
                  id="search"
                  placeholder="Search here"
                />
              </div>
              <div className="h-[200px] overflow-y-auto p-4">
                {/* {isLoading?(<div>Loading...</div>):data?.map((user) => (
                  <UserAccessList key={user.user_id} userId={user.user_id} username={user.username}/>
                ))} */}
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
                        <p>{user.first_name + " " + user.last_name}</p>
                      </div>
                      <input
                        className="cursor-pointer"
                        // id="access"
                        type="checkbox"
                        // ref={register.ref}
                        // name={"userId"}
                        // value={user?.user_id}
                        {...register("userId")}
                        value={user?.user_id}

                        // naam btaa response ma jo jayega
                        // value={userId}
                        // onChange={handleChange}
                        // onClick={handleChange}
                      />
                    </div>
                  ))
                )}
                {/* sun backend mn array or id bhejni haina? nhn array tw us component mn bnani hy append krke wo array wapis yaha lani hy woh ajaye gi, ary array tw bana wo ban nhnrhi na, mujhy yeh bta k response ma doc_acces ma list of userID jayengi na? doc id aur users ki ids ki array. set */}
                {/* <UserAccessList userId='1234' />
                <UserAccessList userId='2222' />
                <UserAccessList userId='6666' /> */}
                {/* acha sun ye abhi ids hardcoat ki hen check krne ke liyek pok  5 sec de*/}
              </div>
            </div>
          </div>
          <div className="flex justify-end p-4 mr-4 mt-4">
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
