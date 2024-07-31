import {
  useFetchMeetingById,
  useFetchMeetingDoc,
  useGetUserMeetings,
} from "@/hooks/query.hook";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  useDeleteMeeting,
  useDocUploadMutation,
  useInsertDocumentMutation,
  useMeetingMinutesId,
  useMeetingReScheduleMutation,
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
import Image from "next/image";
import { withProtectedWrapper } from "@/components/Protected Routes/protected_login";
import useUserStore from "@/stores/useUserStore";
import { Trash2 } from "lucide-react";
import moment from "moment";
import useModalStore from "@/stores/useModalStore";

const MeetingInfo = () => {
  const [meetingUpdateOption, setMeetingUpdateOption] = useState("");
  const [postponeBtn, setPostponeBtn] = useState(false);

  const { currentUser } = useUserStore();
  const { closeModal, id } = useModalStore();

  const {
    data: meetingDoc,
    isLoading,
    refetch: refetchMeetingDoc,
  } = useFetchMeetingById({ id }, { enabled: Boolean(id) });

  const meetingMinId = meetingDoc && meetingDoc?.[0]?.meeting_minutes;
  const { data: meetingMin, isLoading: meetingMinLoading } = useFetchMeetingDoc(
    { id: meetingMinId },
    { enabled: Boolean(meetingMinId) }
  );

  const meetingAgendaId = meetingDoc && meetingDoc?.[0]?.meeting_agenda;
  const { data: meetingAgenda, isLoading: meetingAgendaLoading } =
    useFetchMeetingDoc(
      { id: meetingAgendaId },
      { enabled: Boolean(meetingAgendaId) }
    );

  const docId = meetingDoc && meetingDoc?.[0]?.agenda;

  const initialValues = {
    file: null,
  };

  const documentSchema = Yup.object().shape({
    file: Yup.mixed().required("File is required"),
  });

  const { mutate: updateMeetingMin, isPending: isMeetingMinUpdatePending } =
    useUpdateMeetingMinDocument({
      onSuccess(data) {
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
        refetchMeetingDoc();
      },
      onError(data) {
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
      },
    });

  const { mutate: updateAgendaDocument, isPending: isAgendaUpdatePending } =
    useUpdateAgendaDocument({
      onSuccess(data) {
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
        refetchMeetingDoc();
      },
      onError(data) {
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
      },
    });

  const { mutate: meetingMinutes, isPending: isMeetingMinPending } =
    useMeetingMinutesId({
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
        refetchMeetingDoc();
      },
      onError(error) {
        toast.error(error.message, {
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
      if (meetingUpdateOption === "agenda") {
        updateAgendaDocument({ newId: docId, meetingId: id });
      } else if (meetingUpdateOption === "updateMeetingMin") {
        updateMeetingMin({ newId: docId, meetingId: id });
      } else if (meetingUpdateOption === "meetingMin") {
        meetingMinutes({ docId, id });
      }
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

  const { mutate: uploadFile } = useDocUploadMutation({
    onSuccess(data) {
      const doc_name = data.value;
      const title = meetingDoc[0]?.meeting_title;
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

  const { mutate: deleteMeeting, isPending: isDeleteMeetingPending } =
    useDeleteMeeting({
      onSuccess(data) {
        toast.success("Meeting deleted!", {
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
        closeModal("modals");
      },
      onError(error) {
        toast.error("Failed to delete meeting!", {
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

  const { mutate: postPoneMeeting, isPending: isPostponePending } =
    useMeetingReScheduleMutation({
      onSuccess() {
        toast.success("Meeting Rescheduled!", {
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
        closeModal("modals");
      },
      onError(error) {
        toast.error("Failed to postpone meeting!", {
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

  const postponeValues = {
    meeting_date: "",
    meeting_time: "",
  };

  const postPoneSchema = Yup.object({
    meeting_date: Yup.string().required("Meeting date is required."),
    meeting_time: Yup.string().required("Meeting time is required."),
  });

  const {
    register: postponeRegister,
    handleSubmit: handlePostponeSubmit,
    reset: resetPostpone,
    formState: { errors },
  } = useForm({
    values: postponeValues,
    resolver: yupResolver(postPoneSchema),
  });

  const onPostponeSubmit = (data) => {
    const dateTime = moment(
      `${data.meeting_date} ${data.meeting_time}`,
      "YYYY-MM-DD HH:mm"
    )
      .utc()
      .toDate();
    postPoneMeeting({
      meetingId: meetingDoc[0]?.meeting_id,
      meeting_time: dateTime,
    });
  };

  const { register, handleSubmit, reset } = useForm({
    values: initialValues,
    resolver: yupResolver(documentSchema),
  });

  const onAgendaSubmit = (data) => {
    setMeetingUpdateOption("agenda");
    const formData = new FormData();
    formData.append("file", data.file[0]);
    uploadFile({ formData, docName: meetingDoc[0].meeting_title });
  };

  const onMeetingMinSubmit = (data) => {
    setMeetingUpdateOption("updateMeetingMin");
    const formData = new FormData();
    formData.append("file", data.meetingMinFile[0]);
    uploadFile({ formData, docName: meetingDoc[0].meeting_title });
  };

  const onUploadMeetingMinSubmit = (data) => {
    setMeetingUpdateOption("meetingMin");
    const formData = new FormData();
    formData.append("file", data.uploadMin[0]);
    uploadFile({ formData, docName: meetingDoc[0].meeting_title });
  };

  const meetingMinDoc = meetingMin && meetingMin.value.doc_name.split(".");

  const meetingAgendaDoc =
    meetingAgenda && meetingAgenda.value.doc_name.split(".");

  return (
    <div className="flex justify-center w-screen h-screen items-center">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        meetingDoc?.map((item) => (
          <div
            key={item._id}
            className="border border-slate-200 rounded-md w-[600px] h-4/5 z-10 shadow-2xl bg-white"
          >
            <div className="flex justify-end p-2 bg-gray-900">
              <Image
                className="cursor-pointer"
                onClick={() => closeModal("modals")}
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
                  const localTime = moment
                    .utc(item.meeting_datetime)
                    .local()
                    .format("YYYY-MM-DD:HH:mm:ss");
                  const [date, hour, minutes, seconds] = localTime.split(":");
                  const formattedHours = parseInt(hour, 10) % 12 || 12;

                  const ampm = parseInt(hour, 10) >= 12 ? "PM" : "AM";
                  const formattedTime = `${formattedHours}:${minutes} ${ampm}`;

                  return formattedTime;
                })()}
                <div
                  onClick={() => deleteMeeting({ id })}
                  className={
                    isDeleteMeetingPending
                      ? "p-1 flex justify-between gap-4 items-center bg-red-500 rounded-md cursor-pointer hover:bg-red-400 duration-200 mt-2 text-white opacity-50"
                      : "p-1 flex justify-between gap-4 items-center bg-red-500 rounded-md cursor-pointer hover:bg-red-400 duration-200 mt-2 text-white"
                  }
                >
                  <p>Delete</p>
                  <Trash2 className="h-3 w-3" />
                </div>
              </div>
            </div>
            <hr />
            <div className="flex gap-4">
              <div className="flex flex-col gap-6 p-2 border-r border-r-slate-200">
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
                            `/pdf/${meetingDoc[0]?.meeting_title}/${meetingAgenda?.value.doc_name}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 font-semibold"
                        >
                          {meetingAgenda?.value.doc_name}
                        </a>
                      )}
                    </div>
                  </div>
                  {currentUser.roles === "secretary" && (
                    <form onSubmit={handleSubmit(onAgendaSubmit)}>
                      <div className="flex flex-col text-sm font-semibold pb-1">
                        <label htmlFor="file">Update agenda document</label>
                        <input type="file" {...register("file")} />
                      </div>
                      <div className="pt-1">
                        <button
                          className={
                            isAgendaUpdatePending
                              ? "w-24 text-md font-semibold flex justify-center gap-3 items-center bg-slate-200 p-1 rounded-md hover:bg-slate-300 duration-200 opacity-50"
                              : "w-24 text-md font-semibold flex justify-center gap-3 items-center bg-slate-200 p-1 rounded-md hover:bg-slate-300 duration-200"
                          }
                          type="submit"
                          disabled={isAgendaUpdatePending}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                {/* UPLOAD MEETING MIN DIV */}
                {!meetingDoc[0]?.meeting_minutes && (
                  <form onSubmit={handleSubmit(onUploadMeetingMinSubmit)}>
                    <div className="flex flex-col font-semibold text-sm">
                      <label htmlFor="uploadMin">Upload meeting minutes</label>
                      <input type="file" {...register("uploadMin")} />
                    </div>
                    <div className="pt-4">
                      <button
                        className={
                          isMeetingMinPending
                            ? "w-24 text-md font-semibold flex justify-center gap-3 items-center bg-slate-200 p-1 rounded-md hover:bg-slate-300 duration-200 opacity-50"
                            : "w-24 text-md font-semibold flex justify-center gap-3 items-center bg-slate-200 p-1 rounded-md hover:bg-slate-300 duration-200"
                        }
                        type="submit"
                        disabled={isMeetingMinPending}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                )}

                {/* UPDATE MEETING MINUTES DIV */}
                <div className="flex flex-col gap-2">
                  {/* meetingDoc[0]?.meeting_mins */}
                  <div
                    className={
                      meetingDoc[0]?.meeting_minutes
                        ? "flex gap-2 items-center"
                        : "hidden"
                    }
                  >
                    <p className="text-sm font-semibold">Meeting Minutes :</p>
                    <div className="p-1 border border-slate-400 rounded-lg text-xs cursor-pointer hover:bg-slate-100 duration-200">
                      {meetingMinLoading ? (
                        <div>Loading...</div>
                      ) : (
                        <a
                          href={
                            meetingMinDoc &&
                            `/pdf/${meetingDoc[0]?.meeting_title}/${meetingMin?.value.doc_name}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 font-semibold"
                        >
                          {meetingMin?.value.doc_name}
                        </a>
                      )}
                    </div>
                  </div>
                  {meetingDoc[0]?.meeting_minutes !== null && (
                    <form onSubmit={handleSubmit(onMeetingMinSubmit)}>
                      <div className="flex flex-col text-sm font-semibold pb-1">
                        <label htmlFor="meetingMinFile">
                          Update meeting minutes
                        </label>
                        <input type="file" {...register("meetingMinFile")} />
                      </div>
                      <div className="pt-1">
                        <button
                          className={
                            isMeetingMinUpdatePending
                              ? "w-24 text-md font-semibold flex justify-center gap-3 items-center bg-slate-200 p-1 rounded-md hover:bg-slate-300 duration-200 opacity-50"
                              : "w-24 text-md font-semibold flex justify-center gap-3 items-center bg-slate-200 p-1 rounded-md hover:bg-slate-300 duration-200"
                          }
                          type="submit"
                          disabled={isMeetingMinUpdatePending}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
              <div className="p-2">
                <button
                  onClick={() => setPostponeBtn(!postponeBtn)}
                  className="p-2 bg-slate-200 font-semibold hover:bg-slate-300 duration-200 rounded-md"
                >
                  Postpone meeting
                </button>
                {postponeBtn && (
                  <form
                    className="mt-4"
                    onSubmit={handlePostponeSubmit(onPostponeSubmit)}
                  >
                    <p className="text-gray-400 text-sm">
                      Schedule your time and date
                    </p>
                    <div className="flex justify-between">
                      <div className="mt-2">
                        <input
                          type="date"
                          {...postponeRegister("meeting_date")}
                        />
                        {errors.meeting_date?.message && (
                          <p className="text-red-500 text-xs">
                            {errors.meeting_date.message}
                          </p>
                        )}
                      </div>
                      <div className="mt-2">
                        <input
                          type="time"
                          {...postponeRegister("meeting_time")}
                        />
                        {errors.meeting_time?.message && (
                          <p className="text-red-500 text-xs">
                            {errors.meeting_time.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="pt-4">
                      <button
                        className={
                          isPostponePending
                            ? "w-24 text-md font-semibold flex justify-center gap-3 items-center bg-slate-200 p-1 rounded-md hover:bg-slate-300 duration-200 opacity-50"
                            : "w-24 text-md font-semibold flex justify-center gap-3 items-center bg-slate-200 p-1 rounded-md hover:bg-slate-300 duration-200"
                        }
                        type="submit"
                        disabled={isPostponePending}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default withProtectedWrapper(MeetingInfo);
