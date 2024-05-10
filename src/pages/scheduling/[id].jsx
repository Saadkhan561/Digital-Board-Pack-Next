import { useFetchMeetingById } from "@/hooks/query.hook";
import { useRouter } from "next/router";
import React from "react";

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
  console.log(data);

  return (
    <div className="flex justify-center w-screen h-screen items-center">
      {data?.map((item) => (
        <div className="border border-slate-200 rounded-md w-[600px] h-4/5 p-6 z-10 shadow-2xl bg-white">
          <div className="flex justify-end pb-4">
            <img
              className="cursor-pointer"
              onClick={() => meeting("modal")}
              src="/images/cross.png"
              alt=""
              height={15}
              width={15}
            />
          </div>
          <div className="flex justify-between pb-4">
            <div className="text-2xl font-semibold">
              {item.meeting_title}
            </div>
            <div className="text-gray-600 font-semibold text-sm">
              {(() => {
                const [hours, minutes] = item.meeting_time.split(":");
                let formattedHours = parseInt(hours, 10) % 12 || 12;
                const ampm = parseInt(hours, 10) >= 12 ? "PM" : "AM";
                const formattedTime = `${formattedHours}:${minutes} ${ampm}`;
                return (
                  formattedTime
                );
              })()}
            </div>
          </div>
          <hr />
          <div className="flex flex-col gap-6">
            <div className="flex gap-2 pt-4">
              <div className="font-semibold">Attenders -</div>
              <div className="text-sm text-gray-600">
                <ul>
                  {item.attender.map((name) => (
                    <li>{name.first_name + '' + name.last_name}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="border border-slate-400 rounded-md w-fit pl-4 pr-4 text-center text-sm text-gray-600 cursor-pointer hover:bg-slate-100 duration-200">
              Agenda Document
            </div>
            <div>
              <div className="flex flex-col">
                <label htmlFor="file">Upload meeting minutes</label>
                <input type="file" />
              </div>
            </div>
            <div className="">
              <button
                className="w-24 text-md font-semibold flex justify-center gap-3 items-center bg-slate-200 p-1 rounded-md hover:bg-slate-300 duration-200"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MeetingInfo;
