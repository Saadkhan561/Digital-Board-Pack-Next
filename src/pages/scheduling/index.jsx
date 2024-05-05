import React, { useState } from "react";
import Layout from "@/layout/UserLayout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { useRouter } from "next/router";
import { withProtectedWrapper } from "@/components/Protected Routes/protected_login";

const Calendar = () => {
  const [expandedEventId, setExpandedEventId] = useState(null);

  // SCHEDULING DATE
  const [value, onChange] = useState(new Date());

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

  // FOR CALENDAR
  const events = [
    {
      id: "event1",
      title: "Discuss daily sales",
      start: "2024-04-10T14:00:00",
      end: "2024-04-10T18:00:00",
      extendedProps: {
        members: ["saad", "anas"],
        time: "02:00 PM - 06:00 PM",
      },
    },
    {
      id: "event2",
      title: "Conference",
      start: "2024-04-04T09:00:00",
      end: "2024-04-04T17:00:00",
      extendedProps: {
        members: ["Dave", "Eve"],
        time: "09:00 AM - 05:00 PM",
      },
    },
  ];

  const renderEventContent = (eventInfo) => {
    const { members, time } = eventInfo.event.extendedProps;

    const isExpanded = eventInfo.event.id === expandedEventId;

    return (
      <div className="event-content">
        <div className="font-semibold text-lg calendar_mob:text-sm mob_screen:text-xs">
          {eventInfo.event.title}
        </div>
        <div className="text-xs calendar_mob:hidden">
          {members && <div>{`Members: ${members.join(", ")}`}</div>}
          {time && <div>{`Time: ${time}`}</div>}
        </div>
        <div className="calendar_full:hidden">
          <div className="relative">
            <p
              className="underline hover:cursor-pointer text-xs"
              onClick={() =>
                setExpandedEventId(isExpanded ? null : eventInfo.event.id)
              }
            >
              {isExpanded ? "Show Less" : "Show More"}
            </p>
            {isExpanded && (
              <div className="absolute -left-10 border rounded-lg shadow-2xl bg-black text-white p-2 font-semibold">
                {members && <div>{`Members: ${members.join(", ")}`}</div>}
                {time && <div>{`Time: ${time}`}</div>}
              </div>
            )}
          </div>
        </div>
      </div>
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
            events={events}
            eventContent={renderEventContent}
          />
        </div>
      </div>
    </Layout>
  );
};

export default withProtectedWrapper(Calendar);
