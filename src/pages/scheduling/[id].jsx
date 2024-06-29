import { useFetchMeetingById } from "@/hooks/query.hook";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  useDocUploadMutation,
  useInsertDocumentMutation,
  useMeetingMinutesId,
  useUpdateAgendaDocument,
  useUpdateMeetingMinDocument,
} from "@/hooks/mutation.hook";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFetchDocumentById } from "@/hooks/query.hook";

// FOR TOAST
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MeetingInfo = () => {
  const [meetingUpdateOption, setMeetingUpdateOption] = useState('')
  const router = useRouter();

  const meeting = (name) => {
    if (router.query[name]) {
      delete router.query[name];
    }
    router.push("/scheduling", undefined, { shallow: true });
  };

  const id = router.query.id;
  const { data: meetingDoc, isLoading, refetch: refetchMeetingDoc } = useFetchMeetingById(
    { id },
    { enabled: Boolean(id) }
  );
  // console.log(meetingDoc);

  const meetingMinId = meetingDoc && meetingDoc[0].meeting_mins;
  const { data: meetingMin, isLoading: meetingMinLoading } =
    useFetchDocumentById(
      { id: meetingMinId },
      { enabled: Boolean(meetingMinId) }
    );
  // console.log(meetingMin);

  const meetingAgendaId = meetingDoc && meetingDoc[0].meeting_agenda;
  const { data: meetingAgenda, isLoading: meetingAgendaLoading } =
    useFetchDocumentById(
      { id: meetingAgendaId },
      { enabled: Boolean(meetingAgendaId) }
    );
  // console.log(meetingAgenda);

  const docId = meetingDoc && meetingDoc[0].agenda;
  const { data: agendaDocument } = useFetchDocumentById({ docId });
  // console.log(agendaDocument)

  const initialValues = {
    file: null,
  };

  const documentSchema = Yup.object().shape({
    file: Yup.mixed().required("File is required"),
  });

  const {mutate: updateMeetingMin} = useUpdateMeetingMinDocument({
    onSuccess(data) {
      console.log(data)
      toast.success("Document updated successfully!", {
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
      refetchMeetingDoc()
    },
    onError(data) {
      console.log(data)
      toast.error("Failed to update Document", {
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
  })

  const {mutate: updateAgendaDocument} = useUpdateAgendaDocument({
    onSuccess(data) {
      console.log(data)
      toast.success("Document updated successfully!", {
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
      refetchMeetingDoc()
    },
    onError(data) {
      console.log(data)
      toast.error("Failed to update Document", {
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
  })

  const { mutate: meetingMinutes } = useMeetingMinutesId({
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
      if (meetingUpdateOption === 'agenda') {
        updateAgendaDocument({newId: docId, meetingId: id})
      }
      else if(meetingUpdateOption === 'meetingMin') {
        updateMeetingMin({newId: docId, meetingId: id})
      } else {
        meetingMinutes({ docId, id });
      }
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
      const title = meetingAgenda.title
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


  const onAgendaSubmit = (data) => {
    console.log(data)
    setMeetingUpdateOption('agenda')
    const formData = new FormData();
    formData.append("file", data.file[0]);
    uploadFile({ formData, docName: meetingDoc[0].meeting_title });
  }

  const onMeetingMinSubmit = (data) => {
    console.log(data)
    setMeetingUpdateOption('meetingMin')
    const formData = new FormData();
    formData.append("file", data.meetingMinFile[0]);
    uploadFile({ formData, docName: meetingDoc[0].meeting_title });
  }

  const onUploadMeetingMinSubmit = (data) => {
    console.log(data)
    const formData = new FormData();
    formData.append("file", data.uploadMin[0]);
    uploadFile({ formData, docName: meetingDoc[0].meeting_title });
  };

  let meetingMinDoc = meetingMin && meetingMin.doc_name.split(".");

  let meetingAgendaDoc = meetingAgenda && meetingAgenda.doc_name.split(".");

  return (
    <div className="flex justify-center w-screen h-screen items-center">
      <ToastContainer />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        meetingDoc?.map((item) => (
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
                  const [hours, minutes] = item.meeting_datetime.split(":");
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
                      <li key={name._id}>
                        {name.first_name + "" + name.last_name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <p className="text-sm font-semibold">Agenda Document :</p>
                  <div className="p-1 border border-slate-400 rounded-lg text-xs cursor-pointer hover:bg-slate-100 duration-200">
                    {meetingAgendaLoading ? (
                      <div>Loading...</div>
                    ) : (
                      <a
                        href={
                          meetingAgendaDoc &&
                          `/pdf/${meetingDoc[0]?.meeting_title}/${meetingAgenda?.doc_name}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 font-semibold"
                      >
                        {meetingAgenda?.doc_name}
                      </a>
                    )}
                  </div>
                </div>
                <form onSubmit={handleSubmit(onAgendaSubmit)}>
                  <div className="flex flex-col text-sm font-semibold pb-1">
                    <label htmlFor="file">Update agenda document</label>
                    <input type="file" {...register("file")} />
                  </div>
                  <div className="pt-1">
                    <button
                      className="w-24 text-md font-semibold flex justify-center gap-3 items-center bg-slate-200 p-1 rounded-md hover:bg-slate-300 duration-200"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <div className="flex flex-col gap-2">
                {meetingDoc[0]?.meeting_mins === null ? null : (
                  <div className="flex gap-2 items-center">
                    <p className="text-sm font-semibold">Meeting Minutes :</p>
                    <div className="p-1 border border-slate-400 rounded-lg text-xs cursor-pointer hover:bg-slate-100 duration-200">
                      {meetingMinLoading ? (
                        <div>Loading...</div>
                      ) : (
                        <a
                          href={
                            meetingMinDoc &&
                            `/pdf/${meetingDoc[0]?.meeting_title}/${meetingMin?.doc_name}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 font-semibold"
                        >
                          {meetingMin?.doc_name}
                        </a>
                      )}
                    </div>
                  </div>
                )}
                <form onSubmit={handleSubmit(onMeetingMinSubmit)}>
                  <div className="flex flex-col text-sm font-semibold pb-1">
                    <label htmlFor="meetingMinFile">Update meeting minutes</label>
                    <input type="file" {...register("meetingMinFile")} />
                  </div>
                  <div className="pt-1">
                    <button
                      className="w-24 text-md font-semibold flex justify-center gap-3 items-center bg-slate-200 p-1 rounded-md hover:bg-slate-300 duration-200"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              {meetingDoc[0]?.meeting_mins !== null ? null : (
                <form onSubmit={handleSubmit(onUploadMeetingMinSubmit)}>
                  <div className="flex flex-col">
                    <label htmlFor="uploadMin">Upload meeting minutes</label>
                    <input type="file" {...register("uploadMin")} />
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
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MeetingInfo;
