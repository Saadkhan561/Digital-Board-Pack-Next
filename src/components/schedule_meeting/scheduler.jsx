import { useRouter } from "next/router";

import { useMeetingScheduleMutation } from "@/hooks/mutation.hook";
import { useFetchAllUsers, useGetUserMeetings } from "@/hooks/query.hook";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

// FOR TOAST
import moment from "moment";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import useUserStore from "@/stores/useUserStore";
import { X } from "lucide-react";
import { useState } from "react";
import useModalStore from "@/stores/useModalStore";

const Scheduler = () => {
  // QUERY TO FETCH ALL USERS
  const { data, isLoading } = useFetchAllUsers();

  const { currentUser } = useUserStore();

  const [fileExtError, setFileExtError] = useState();

  const { refetch: refetchMeetings } = useGetUserMeetings();

  // FOR SCHEDULE MODAL
  const router = useRouter();
  const { modals, closeModal, openModal } = useModalStore();

  const initialValues = {
    meeting_date: "",
    meeting_time: "",
    meeting_title: "",
    attenders: [],
    file: null,
  };

  const scheduleSchema = Yup.object({
    file: Yup.mixed().required("File is required."),
    meeting_date: Yup.string().required("Meeting date is required."),
    meeting_time: Yup.string().required("Meeting time is required."),
    meeting_title: Yup.string().required("Meeting title is required."),
    attenders: Yup.array().min(1, "At least one attender should be selected."),
  });

  // MUTATIONS
  const { mutate: scheduleMeeting, isPending } = useMeetingScheduleMutation({
    onSuccess(data) {
      toast.success("Meeting Scheduled!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      closeModal("schedule");
      reset();
    },
    onError(error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
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
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    values: initialValues,
    resolver: yupResolver(scheduleSchema),
  });
  const onSubmit = (data) => {
    data.attenders.push(currentUser.user_id);
    const { meeting_date, meeting_time, ...rest } = data;
    const formData = new FormData();
    formData.append("file", data.file[0]);
    const dateTime = moment(
      `${data.meeting_date} ${data.meeting_time}`,
      "YYYY-MM-DD HH:mm"
    )
      .utc()
      .toDate();

    if (
      data.file[0]?.name.split(".")[1] === "pdf" ||
      data.file[0]?.name.split(".")[1] === "docx"
    ) {
      setFileExtError(null);

      scheduleMeeting({ meeting_datetime: dateTime, formData, ...rest });
    } else {
      setFileExtError("File extension should be pdf or docx");
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <ToastContainer />
      <div className="bg-white shadow-2xl rounded-md w-[600px] mob_screen:w-[500px] new_document:w-[350px] z-10 mob_screen:h-[600px]">
        <div className="flex justify-between items-center text-white bg-slate-900 p-4">
          <div className="text-xl font-semibold mob_screen:text-lg">
            Schedule your meeting
          </div>
          {/* <div>
            <Image
              onClick={() => schedule("schedule")}
              className="cursor-pointer"
              src="/images/cross-white.png"
              alt=""
              height={20}
              width={20}
            />
          </div> */}
          <X
            onClick={() => closeModal("schedule")}
            className="h-6 w-6 cursor-pointer rounded-full p-1 hover:bg-slate-700 duration-200"
          />
        </div>
        <div className="p-6 mt-3 mob_screen:mt-0">
          <form
            className="flex flex-col gap-5 mob_screen:gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex gap-10 mob_screen:flex-col mob_screen:text-sm mob_screen:gap-2">
              <div className="">
                <label className="label" htmlFor="agenda">
                  Meeting Agenda
                </label>
                <input
                  className="input_field"
                  type="text"
                  {...register("meeting_title")}
                />
                {errors.meeting_title && (
                  <p className="text-red-500 text-xs">
                    {errors.meeting_title.message}
                  </p>
                )}
              </div>
              <div>
                <p className="text-gray-400 text-sm" >
                  Schedule your time and date
                </p>
                <div className="flex justify-between">
                  <div className="mt-2">
                    <input
                      type="date"
                      {...register("meeting_date")}
                      min={new Date().toISOString().split("T")[0]}
                    />
                    {errors.meeting_date?.message && (
                      <p className="text-red-500 text-xs">
                        {errors.meeting_date.message}
                      </p>
                    )}
                  </div>
                  <div className="mt-2">
                    <input type="time" {...register("meeting_time")} />
                    {errors.meeting_time?.message && (
                      <p className="text-red-500 text-xs">
                        {errors.meeting_time.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label className="label" htmlFor="file">
                Upload your document:
              </label>
              <input type="file" {...register("file")} />
              {errors.file && (
                <p className="text-red-500 text-xs">{errors.file.message}</p>
              )}
              {fileExtError !== null ? (
                <p className="text-red-500 text-xs">{fileExtError}</p>
              ) : null}
            </div>
            <div>
              <div className="p-2">
                {" "}
                <div className="font-semibold text-xl">Add Permissions</div>
                <div className="h-[200px] overflow-y-auto p-4 mt-4">
                  {isLoading ? (
                    <div>Loading...</div>
                  ) : (
                    data?.map(
                      (user, index) =>
                        user.roles === "user" && (
                          <div
                            className="flex justify-between mt-4 border-b pb-2"
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
                              {...register("attenders")}
                              value={user?.user_id}
                            />
                          </div>
                        )
                    )
                  )}
                </div>
                {errors.attenders && (
                  <p className="text-red-500 text-xs">
                    {errors.attenders.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-end p-4 mr-4 mt-4 mob_screen:mt-0 mob_screen:p-0">
              <button
                className={
                  isPending
                    ? "mt-4 w-24 text-md font-semibold flex justify-center gap-3 items-center bg-slate-200 p-1 rounded-md hover:bg-slate-300 duration-200 opacity-50"
                    : "mt-4 w-24 text-md font-semibold flex justify-center gap-3 items-center bg-slate-200 p-1 rounded-md hover:bg-slate-300 duration-200"
                }
                type="submit"
                disabled={isPending}
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
