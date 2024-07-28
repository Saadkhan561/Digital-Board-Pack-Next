import { useGetNotifications } from "@/hooks/query.hook";
import { formatDate } from "@/utils/common";
import Image from "next/image";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Notification = () => {
  const {
    data: notifications,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetNotifications();

  const flattenedNotifications =
    notifications?.pages?.flatMap((page) => page) || [];
  const exists = Boolean(flattenedNotifications.length);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === "pending") {
    return (
      <ul className="p-2">
        <li className="flex gap-4 justify-center items-center mb-2 p-2 w-full h-full rounded-xl duration-200">
          <div>
            <div className="text-sm font-semibold mb-1">{}</div>
            <div className="text-zinc-800 font-semibold text-xs">Loading</div>
          </div>
        </li>
      </ul>
    );
  }

  if (status === "error") {
    return (
      <ul className="p-2">
        <li className="flex gap-4 justify-center items-center mb-2 p-2 w-full h-full rounded-xl duration-200">
          <div>
            <div className="text-sm font-semibold mb-1">{}</div>
            <div className="text-zinc-800 font-semibold text-xs">
              Somethign Went Wrong : {error}
            </div>
          </div>
        </li>
      </ul>
    );
  }

  return (
    <ul className="p-2 ">
      {exists ? (
        flattenedNotifications?.map((notification, index) => {
          const seen = Boolean(Number(notification?.seen));
          const bindRef = flattenedNotifications.length === index + 1;

          return bindRef ? (
            <li
              className={`flex gap-4 items-center mb-2 p-2 w-full ${
                seen ? "bg-white" : "bg-blue-400"
              } hover:bg-slate-200 rounded-xl duration-200`}
              key={index}
              ref={ref}
            >
              <div className="border rounded-full p-1">
                <Image
                  src="/images/account.png"
                  alt=""
                  height={30}
                  width={30}
                />
              </div>
              <div>
                <div className="text-sm font-semibold mb-1">
                  {notification.description}
                </div>
                <div className="text-zinc-800 font-semibold text-xs">
                  {formatDate(notification?.created_at)}
                </div>
              </div>
            </li>
          ) : (
            <li
              className={`flex gap-4 items-center mb-2 p-2 w-full ${
                seen ? "bg-white" : "bg-blue-400"
              } hover:bg-slate-200 rounded-xl duration-200`}
              key={index}
            >
              <div className="border rounded-full p-1">
                <Image
                  src="/images/account.png"
                  alt=""
                  height={30}
                  width={30}
                />
              </div>
              <div>
                <div className="text-sm font-semibold mb-1">
                  {notification.description}
                </div>
                <div className="text-zinc-800 font-semibold text-xs">
                  {formatDate(notification?.created_at)}
                </div>
              </div>
            </li>
          );
        })
      ) : (
        <li className="flex gap-4 justify-center items-center mb-2 p-2 w-full h-full rounded-xl duration-200">
          <div>
            <div className="text-sm font-semibold mb-1">{}</div>
            <div className="text-zinc-800 font-semibold text-xs">
              No Notifications to Show
            </div>
          </div>
        </li>
      )}
      {isFetchingNextPage && (
        <li className="flex gap-4 justify-center items-center mb-2 p-2 w-full h-full rounded-xl duration-200">
          <div>
            <div className="text-sm font-semibold mb-1">{}</div>
            <div className="text-zinc-800 font-semibold text-xs">Loading</div>
          </div>
        </li>
      )}
    </ul>
  );
};

export default Notification;
