import { useFetchMeetingById } from "@/hooks/query.hook";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  useDocUploadMutation,
  useInsertDocumentMutation,
  useMeetingMinutesId,
} from "@/hooks/mutation.hook";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFetchDocumentById } from "@/hooks/query.hook";

// FOR TOAST
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const MeetingInfo = () => {
  const router = useRouter();

  const meeting = (name) => {
    if (router.query[name]) {
      delete router.query[name];
    }
    router.push("/scheduling", undefined, { shallow: true });
  };

  const id = router.query.id;
  const { data, isLoading } = useFetchMeetingById(
    { id },
    { enabled: Boolean(id) }
  );


  const docId = data && data[0].agenda
  console.log(docId)
  const { data: agendaDocument } = useFetchDocumentById(
    { docId }
  );
  console.log(agendaDocument)

  const initialValues = {
    docName: null,
  };

  const documentSchema = Yup.object({
    // title: Yup.string().required("Title is required"),
  });

  const { mutate: meetingMinutes } = useMeetingMinutesId({
    onSuccess(data) {
      console.log(data);
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
      // router.push('/scheduling')
    },
    onError(error) {
      console.log(error);
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

  const { mutate: insertFile } = useInsertDocumentMutation({
    onSuccess(data) {
      const docId = data.value;
      meetingMinutes({ docId, id });
    },
    onError(error) {
      console.log(error);
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
      const docName = data;
      const title = watch("title");
      insertFile({ docName, title });
    },
    onError(error) {
      console.log(error);
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
    uploadFile(formData);
  };

  return (
    <div className="flex justify-center w-screen h-screen items-center">
      <ToastContainer />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        data?.map((item) => (
          <div
            key={item._id}
            className="border border-slate-200 rounded-md w-[600px] h-4/5 z-10 shadow-2xl bg-white"
          >
            <div className="flex justify-end p-2 bg-gray-900">
              <img
                className="cursor-pointer"
                onClick={() => meeting("modal")}
                src="/images/cross-white.png"
                alt=""
                height={15}
                width={15}
              />
            </div>
            <div className="flex justify-between items-center pb-4 p-4 bg-gray-900 text-white">
              <div className="text-3xl font-semibold">{item.meeting_title}</div>
              <div className="text-white font-semibold text-sm">
                {(() => {
                  const [hours, minutes] = item.meeting_time.split(":");
                  let formattedHours = parseInt(hours, 10) % 12 || 12;
                  const ampm = parseInt(hours, 10) >= 12 ? "PM" : "AM";
                  const formattedTime = `${formattedHours}:${minutes} ${ampm}`;
                  return formattedTime;
                })()}
              </div>
            </div>
            <hr />
            <div className="flex flex-col gap-6 p-2">
              <div className="flex gap-2 pt-4">
                <div className="font-semibold">Attenders -</div>
                <div className="text-sm text-gray-600">
                  <ul>
                    {item.attender.map((name) => (
                      <li>{name.first_name + "" + name.last_name}</li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* <Link href={`/pdf/${agendaDocument?.value.docName}`} className="border border-slate-400 rounded-md w-fit pl-4 pr-4 text-center text-sm text-gray-600 cursor-pointer hover:bg-slate-100 duration-200">
                Agenda Document
              </Link> */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col">
                  <label htmlFor="file">Upload meeting minutes</label>
                  <input type="file" {...register("file")} />
                </div>
                <div className="pt-4">
                  <button
                    className="w-24 text-md font-semibold flex justify-center gap-3 items-center bg-slate-200 p-1 rounded-md hover:bg-slate-300 duration-200"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MeetingInfo;
