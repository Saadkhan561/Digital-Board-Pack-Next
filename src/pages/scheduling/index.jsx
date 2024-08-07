import { withProtectedWrapper } from "@/components/Protected Routes/protected_login";
import { useGetUserMeetings } from "@/hooks/query.hook";
import Layout from "@/layout/UserLayout";
import useModalStore from "@/stores/useModalStore";
import { truncateTitle } from "@/utils/common";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import moment from "moment";
import Image from "next/image";
import { useState } from "react";

const Calendar = () => {
  const { data: meetings } = useGetUserMeetings();
  const { openModal } = useModalStore();

  const fullCalendarEvents = meetings?.map((meeting) => ({
    title: truncateTitle(meeting.meeting_title, 10),
    start: `${moment
      .utc(meeting.meeting_datetime)
      .local()
      .format("YYYY-MM-DDTHH:mm:ss")}`,
    end: `${moment
      .utc(meeting.meeting_datetime)
      .local()
      .format("YYYY-MM-DDTHH:mm:ss")}`,
    extendedProps: {
      agenda: meeting.agenda,
      meeting_id: meeting.meeting_id,
      meeting_mins: meeting.meeting_mins,
    },
  }));

  const renderEventContent = (eventInfo) => {
    const { meeting_id } = eventInfo.event.extendedProps;
    const hours = eventInfo.event.start.getHours();
    const minutes = eventInfo.event.start.getMinutes();
    const seconds = eventInfo.event.start.getSeconds();
    const time = `${hours.toString()}:${minutes.toString()}:${seconds.toString()}`;
    const modalClickHandler = (id) => {
      openModal("modals", id);
    };

    return (
      <div
        onClick={() => modalClickHandler(meeting_id)}
        className="cursor-pointer event-content"
      >
        <div key={eventInfo.event.meeting_id}>
          <div className="font-semibold text-lg calendar_mob:text-sm mob_screen:text-xs">
            {eventInfo.event.title}
          </div>
          <div className="text-xs calendar_mob:hidden">
            <div>{`Time: ${time && time}`}</div>
          </div>
          <div className="text-xs text-gray-600 underline">Show details</div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="p-2">
        <div className="flex justify-center">
          <div className="h-[450px] w-11/12">
            <div
              className="mb-4 flex items-center gap-2 cursor-pointer border border-slate-300 rounded-lg hover:bg-slate-200 duration-200 w-max p-1 font-semibold shadow-2xl"
              onClick={() => openModal("schedule")}
            >
              <Image src="/images/plus.png" alt="" height={15} width={15} />
              <button>Schedule a meeting</button>
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
