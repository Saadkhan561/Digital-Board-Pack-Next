import React, { useState } from "react";
import Layout from "@/layout/UserLayout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { useRouter } from "next/router";
import { withProtectedWrapper } from "@/components/Protected Routes/protected_login";
import { useFetchAllMeetings } from "@/hooks/query.hook";
import Link from "next/link";
import useUserStore from "@/stores/useUserStore";

const Calendar = () => {
  const [expandedEventId, setExpandedEventId] = useState(null);

  // SCHEDULING DATE
  const [value, onChange] = useState(new Date());

  const { currentUser } = useUserStore();
  // HOOK TO GET ALL MEETINGS
  const { data: meetings, isLoading, refetch } = useFetchAllMeetings();
  meetings && console.log(meetings);

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

  const meeting = (name) => {
    if (router.query[name]) {
      delete router.query[name];
    } else {
      router.query[name] = true;
    }
    router.push(router, undefined, { shallow: true });
  };

  // FOR CALENDAR
  const fullCalendarEvents =
    meetings &&
    meetings.map((meeting) => ({
      title: meeting.meeting_title,
      start: `${meeting.meeting_datetime}`,
      end: `${meeting.meeting_datetime}`,
      extendedProps: {
        agenda: meeting.agenda,
        meeting_id: meeting.meeting_id,
        meeting_mins: meeting.meeting_mins,
      },
    }));

  const renderEventContent = (eventInfo) => {
    console.log(eventInfo.event.start);
    const { meeting_id } = eventInfo.event.extendedProps;
    const isExpanded = meeting_id === expandedEventId;

    // let hours = eventInfo.event.start.getHours();
    // let minutes = eventInfo.event.start.getMinutes();
    // let period = 'AM'

    // if (hours >= 12) {
    //   period = "PM"
    //   hours = hours === 12 ? 12 : hours - 12;
    // } else {
    //   period = "AM"
    //   if (hours === 0) {
    //     hours = 12;
    //   }
    // }

    // const formattedTime = `${hours}:${
    //   minutes < 10 ? "0" + minutes : minutes
    // } ${period}`;

    // let date = new Date(eventInfo.event.meeting_datetime);

    // Extract the time components
    let hours = eventInfo.event.start.getHours(); // Use getHours() for local time, getUTCHours() for UTC
    let minutes = eventInfo.event.start.getMinutes(); // Use getMinutes() for local time, getUTCMinutes() for UTC
    let seconds = eventInfo.event.start.getSeconds(); // Use getSeconds() for local time, getUTCSeconds() for UTC

    // Format the time as HH:MM:SS
    let time = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    console.log(time);

    return (
      <Link
        href={`/scheduling?id=${meeting_id}&modal=true`}
        className="cursor-pointer event-content"
      >
        <div key={eventInfo.event.meeting_id}>
          <div className="font-semibold text-lg calendar_mob:text-sm mob_screen:text-xs">
            {eventInfo.event.title}
          </div>
          <div className="text-xs calendar_mob:hidden">
            {/* {members && <div>{`Members: ${members.join(", ")}`}</div>} */}
            <div>{`Time: ${time}`}</div>
          </div>
          <div className="calendar_full:hidden">
            <div className="relative">
              <p
                className="underline hover:cursor-pointer text-xs"
                onClick={() =>
                  setExpandedEventId(isExpanded ? null : meeting._id)
                }
              >
                {isExpanded ? "Show Less" : "Show More"}
              </p>
              {isExpanded && (
                <div className="absolute -left-10 border rounded-lg shadow-2xl bg-black text-white p-2 font-semibold">
                  {/* {members && <div>{`Members: ${members.join(", ")}`}</div>} */}
                  <div>{`Time: ${formattedTime}`}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <Layout>
      <div className="p-2">
        <div className="flex justify-center">
          <div className="h-[550px] w-11/12">
            <div className="mb-4 flex items-center gap-2 cursor-pointer border border-slate-300 rounded-lg hover:bg-slate-200 duration-200 w-max p-1 font-semibold shadow-2xl" onClick={() => schedule("schedule")}>
              <img src="/images/plus.png" alt="" height={15} width={15}/>
              <button>
                Schedule a meeting
              </button>
            </div>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
              initialView="dayGridMonth"
              views={{
                dayGridMonth: {
                  titleFormat: {
                    // Custom title format for dayGridMonth view
                    month: "long",
                    year: "numeric",
                  },
                },
                timeGridWeek: {
                  titleFormat: {
                    // Custom title format for timeGridWeek view
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  },
                },
                listWeek: {
                  titleFormat: {
                    // Custom title format for listWeek view
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  },
                },
              }}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,listWeek", // Add buttons for different views
              }}
              events={fullCalendarEvents}
              eventContent={renderEventContent}
              height="100%"
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withProtectedWrapper(Calendar);
