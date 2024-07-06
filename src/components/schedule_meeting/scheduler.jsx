import { useRouter } from "next/router";

import { useMeetingScheduleMutation } from "@/hooks/mutation.hook";
import { useFetchAllUsers } from "@/hooks/query.hook";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

// FOR TOAST
import moment from "moment";
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

  const scheduleSchema = Yup.object().shape({
    meeting_date: Yup.string().required("Meeting date is required."),
    meeting_time: Yup.string().required("Meeting time is required."),
    meeting_title: Yup.string().required("Meeting title is required."),
    attenders: Yup.array()
      .of(Yup.string().typeError("Attenders must be an array of strings."))
      .min(1, "At least one attender should be selected.")
      .required("Please select attenders."),
    file: Yup.mixed().required("File is required."),
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
      // reset();
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
    resolver: yupResolver(scheduleSchema),
  });
  const onSubmit = (data) => {
    const { meeting_date, meeting_time, ...rest } = data;
    const formData = new FormData();
    formData.append("file", data.file[0]);

    const dateTime = moment(
      `${data.meeting_date} ${data.meeting_time}`,
      "YYYY-MM-DD HH:mm"
    )
      .utc()
      .toDate();

    scheduleMeeting({ meeting_datetime: dateTime, formData, ...rest });
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <ToastContainer />
      <div className="bg-white shadow-2xl rounded-md w-[600px] mob_screen:w-[500px] new_document:w-[350px] z-10 mob_screen:h-[600px]">
        <div className="flex justify-between items-center text-white bg-slate-900 p-4">
          <div className="text-2xl font-semibold mob_screen:text-lg">
            Schedule your meeting
          </div>
          <div>
            <img
              onClick={() => schedule("schedule")}
              className="cursor-pointer"
              src="/images/cross-white.png"
              alt=""
              height={20}
              width={20}
            />
          </div>
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
                {errors.title && (
                  <p className="text-red-500 text-xs">{errors.title.message}</p>
                )}
              </div>
              <div>
                <p className="text-gray-400 text-sm">Schedule your time and date</p>
                <div className="flex justify-between">
                  <div className="mt-2">
                    <input type="date" {...register("meeting_date")} />
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
                          <p>{user.email}</p>
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
            <div className="flex justify-end p-4 mr-4 mt-4 mob_screen:mt-0 mob_screen:p-0">
              <button
                className="mt-4 w-24 text-md font-semibold flex justify-center gap-3 items-center bg-slate-200 p-1 rounded-md hover:bg-slate-300 duration-200"
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
