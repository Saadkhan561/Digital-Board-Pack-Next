import { useFetchNotifications } from "@/hooks/query.hook";
import moment from "moment";
import Image from "next/image";
import React from "react";

const Notification = () => {
  const { data: notifications } = useFetchNotifications();

  return (
    <div>
      <ul className="p-2">
        {notifications?.map((data) => (
          <li
            key={data.id}
            className="flex gap-4 items-center mb-2 p-2 w-ful rounded-xl duration-200 border-b border-slate-200"
          >
            <div className="border rounded-full p-1">
              <Image src="/images/account.png" alt="" height={30} width={30} />
            </div>
            <div>
              <div className="text-sm mb-1">
                {data?.description}
              </div>
              <div className="text-blue-500 font-semibold text-xs">
                {moment(data?.created_at).format("DD MMM YYYY")}
              </div>
            </div>
          </li>

        ))}
      </ul>
    </div>
  );
};

export default Notification;
