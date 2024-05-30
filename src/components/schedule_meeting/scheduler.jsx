import { useRouter } from "next/router";
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useFetchAllUsers } from "@/hooks/query.hook";
import {
  useDocUploadMutation,
  useInsertDocumentMutation,
  useInsertMeeting,
} from "@/hooks/mutation.hook";

// FOR TOAST
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Scheduler = () => {
  // QUERY TO FETCH ALL USERS
  const { data, isLoading } = useFetchAllUsers();

  // FOR SCHEDULE MODAL
  const router = useRouter();
  const schedule = (name) => {
    if (router.query[name]) {
      delete router.query[name];
    } else {
      router.query[name] = true;
    }
    router.push(router, undefined, { shallow: true });
  };

  const initialValues = {
    meeting_title: "",
    meetingAgenda: "",
    attenders: [],
    meeting_date: "",
    meeting_time: "",
    docName: null,
  };

  const [formData, setFormData] = useState(initialValues);

  const scheduleSchema = Yup.object({
    title: Yup.string().required("Agenda is required"),
    meeting_date: Yup.string().required("Meeting date is required"),
    meeting_time: Yup.string().required("Meeting time is required"),
    // docName: Yup.string().required("Document is required"),
    // attenders: Yup.required("attenders are required")
  });

  // MUTATIONS
  const { mutate: insertMeeting } = useInsertMeeting({
    onSuccess(data) {
      console.log(data);
      toast.success("Meeting Scheduled!",{
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      })
      reset()
    },
    onError(error) {
      console.log(error);
    },
  });

  const { mutate: insertFile } = useInsertDocumentMutation({
    onSuccess(data) {
      const {meetingAgenda,file,docName,...rest} =formData
      console.log({...rest})
      insertMeeting(
        { ...rest, meeting_agenda: data.value },
      );
    },
    onError(error) {
      console.log(error);
    },
  });

  const { mutate: uploadFile } = useDocUploadMutation({
    onSuccess(data) { 
      const docName = data;
      const title = watch("title");
      insertFile({ docName, title });
    },
    onError(error) {
      console.log(error);
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm({
    values: initialValues,
    resolver: yupResolver(scheduleSchema),
  });
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    setFormData({
      ...data,
      meeting_time: data.meeting_time,
      meeting_date: data.meeting_date,
    });
    uploadFile({formData, title: data.title});
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <ToastContainer />
      <div className="bg-white shadow-2xl rounded-md w-[600px] mob_screen:w-[400px] new_document:w-[300px] p-6 z-10">
        <div className="flex justify-between items-center">
          <div className="text-3xl font-semibold">Schedule your meeting</div>
          <div>
            <img
              onClick={() => schedule("schedule")}
              className="cursor-pointer"
              src="/images/cross.png"
              alt=""
              height={20}
              width={20}
            />
          </div>
        </div>
        <div className="p-1 mt-5">
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex gap-10">
              <div className="">
                <label className="label" htmlFor="agenda">
                  Meeting Agenda
                </label>
                <input
                  className="input_field"
                  type="text"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-red-500 text-xs">{errors.title.message}</p>
                )}
              </div>
              <div className="mt-5">
                <input type="date" {...register("meeting_date")} />
                {errors.meeting_date?.message && (
                  <p className="text-red-500 text-xs">
                    {errors.meeting_date.message}
                  </p>
                )}
              </div>
              <div className="mt-5">
                <input type="time" {...register("meeting_time")} />
                {errors.meeting_time?.message && (
                  <p className="text-red-500 text-xs">
                    {errors.meeting_time.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="label" htmlFor="file">
                Upload your document:
              </label>
              <input type="file" {...register("file")} />
              {errors.docName && (
                <p className="text-red-500 text-xs">{errors.docName.message}</p>
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
                <div className="h-[200px] overflow-y-auto p-4">
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
                          type="checkbox"
                          {...register("attenders")}
                          value={user?.user_id}
                        />
                      </div>
                    ))
                  )}
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
    </div>
  );
};

export default Scheduler;
