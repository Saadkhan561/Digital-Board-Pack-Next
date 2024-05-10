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

const Calendar = () => {
  const [expandedEventId, setExpandedEventId] = useState(null);
  const [period, setPeriod] = useState();

  // SCHEDULING DATE
  const [value, onChange] = useState(new Date());

  // HOOK TO GET ALL MEETINGS
  const { data: meetings, isLoading, refetch } = useFetchAllMeetings();

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
      start: `${meeting.meeting_date}T${meeting.meeting_time}`,
      end: `${meeting.meeting_date}T${meeting.meeting_time}`,
      extendedProps: {
        agenda: meeting.agenda,
        meeting_id: meeting.meeting_id,
        meeting_mins: meeting.meeting_mins,
      },
    }));

  const renderEventContent = (eventInfo) => {
    const { meeting_id } = eventInfo.event.extendedProps;
    const isExpanded = meeting_id === expandedEventId;

    let hours = eventInfo.event.start.getHours();
    let minutes = eventInfo.event.start.getMinutes();
    let period = 'AM' 

    if (hours >= 12) {
      period = "PM"
      hours = hours === 12 ? 12 : hours - 12;
    } else {
      period = "AM"
      if (hours === 0) {
        hours = 12;
      }
    }

    const formattedTime = `${hours}:${
      minutes < 10 ? "0" + minutes : minutes
    } ${period}`;

    return (
      <Link href={`/scheduling?id=${meeting_id}&modal=true`} className="cursor-pointer event-content">
        <div key={meeting._id}>
          <div className="font-semibold text-lg calendar_mob:text-sm mob_screen:text-xs">
            {eventInfo.event.title}
          </div>
          <div className="text-xs calendar_mob:hidden">
            {/* {members && <div>{`Members: ${members.join(", ")}`}</div>} */}
            <div>{`Time: ${formattedTime}`}</div>
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
        <div onClick={() => schedule("schedule")}>
          <button className="flex justify-center items-center w-[170px] p-1 rounded-sm bg-black text-white font-semibold text-md">
            Schedule a meeting
          </button>
        </div>
        <div>
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
          />
        </div>
      </div>
    </Layout>
  );
};

export default Calendar;
