import { React, useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDocUploadMutation } from "../hooks/mutation.hook";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const NewDocument = ({ prevNewDocument, updateNewDocument }) => {
  const [isNewDocument, setNewDocument] = useState(prevNewDocument);

  useEffect(() => {
    updateNewDocument(isNewDocument);
  }, [isNewDocument]);

  const initialValues = {
    title: "",
    // owner_name: "",
    file: null,
  };

  const documentSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    // owner_name: Yup.string().required("Owner name is required"),
    file: Yup.string().required("File must be uploaded"),
  });

  // const { values, errors, handleChange, handleSubmit } = useFormik({
  //   initialValues: initialValues,
  //   validationSchema: documentSchema,
  //   onSubmit: (values) => {
  //     console.log(values);
  //   },
  // });

  const { mutate } = useDocUploadMutation({
    onSuccess(data) {
      console.log(data);
      // reset();
      // resetForm();
      // setValues({ ...initialValues });
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
    setValue,
  } = useForm({
    values: initialValues,
    resolver: yupResolver(documentSchema),
  });
  const inputRef = useRef();
  const onSubmit = (data) => {
    console.log(data);
    // mutate({
    //   file:data.
    // });
  };

  return (
    <div className="flex items-center justify-center border border-black w-screen h-screen">
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
            <input
              className="input_field"
              type="text"
              // id="title"
              // name="title"
              {...register("title")}
              // onChange={handleChange}
            />
            {errors.title && (
              <p className="text-red-500 text-xs">{errors.title.message}</p>
            )}
          </div>
          {/* <div>
            <label className="label" htmlFor="owner_name">
              Owner Name
            </label>
            <input
              className="input_field"
              type="text"
              // id="owner_name"
              // name="owner_name"
              {...register("owner_name")}
              // onChange={handleChange}
            />
            {errors.owner_name && (
              <p className="text-red-500 text-xs">
                {errors.owner_name.message}
              </p>
            )}
          </div> */}
          <div>
            <label className="label" htmlFor="myfile">
              Upload your document:
            </label>
            <input
              className="mt-4 mb-4"
              type="file"
              // onChange={(e) => {
              //   console.log("file", e.target.files[0].name)
              // }}
              {...register("file")}
              // {...register("file", {
              //   onChange: (e) => {
              //     // console.log(e.target.files);
              //     setValue("file", e.target.files[0]);
              //   },
              // })}
            />
            {errors.file && (
              <p className="text-red-500 text-xs">{errors.file.message}</p>
            )}
          </div>
          {/* ACCESS LIST DIV */}
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
              <div className="h-[200px] overflow-y-auto p-4">
                <div className="flex justify-between mt-4 border-b pb-2">
                  <div className="flex gap-2 items-center">
                    <img
                      src="/images/account.png"
                      alt=""
                      height={20}
                      width={20}
                    />
                    <p>Saad Nadeem Khan</p>
                  </div>
                  <input
                    className="cursor-pointer"
                    type="checkbox"
                    id="checkbox"
                  />
                </div>
                <div className="flex justify-between mt-4 border-b pb-2">
                  <div className="flex gap-2 items-center">
                    <img
                      src="/images/account.png"
                      alt=""
                      height={20}
                      width={20}
                    />
                    <p>Saad Nadeem Khan</p>
                  </div>
                  <input
                    className="cursor-pointer"
                    type="checkbox"
                    id="checkbox"
                  />
                </div>
                <div className="flex justify-between mt-4 border-b pb-2">
                  <div className="flex gap-2 items-center">
                    <img
                      src="/images/account.png"
                      alt=""
                      height={20}
                      width={20}
                    />
                    <p>Saad Nadeem Khan</p>
                  </div>
                  <input
                    className="cursor-pointer"
                    type="checkbox"
                    id="checkbox"
                  />
                </div>
                <div className="flex justify-between mt-4 border-b pb-2">
                  <div className="flex gap-2 items-center">
                    <img
                      src="/images/account.png"
                      alt=""
                      height={20}
                      width={20}
                    />
                    <p>Saad Nadeem Khan</p>
                  </div>
                  <input
                    className="cursor-pointer"
                    type="checkbox"
                    id="checkbox"
                  />
                </div>
                <div className="flex justify-between mt-4 border-b pb-2">
                  <div className="flex gap-2 items-center">
                    <img
                      src="/images/account.png"
                      alt=""
                      height={20}
                      width={20}
                    />
                    <p>Saad Nadeem Khan</p>
                  </div>
                  <input
                    className="cursor-pointer"
                    type="checkbox"
                    id="checkbox"
                    onChange={(e) => setValue("file", e.target.files[0])}
                  />
                </div>
                <div className="flex justify-between mt-4 border-b pb-2">
                  <div className="flex gap-2 items-center">
                    <img
                      src="/images/account.png"
                      alt=""
                      height={20}
                      width={20}
                    />
                    <p>Saad Nadeem Khan</p>
                  </div>
                  <input
                    className="cursor-pointer"
                    type="checkbox"
                    id="checkbox"
                  />
                </div>
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
