import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Layout from "@/layout/UserLayout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { useRouter } from "next/router";

// DATE/TIME PICKER
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

const Scheduling = () => {
  const [expandedEventId, setExpandedEventId] = useState(null);

  // SCHEDULING DATE
  const [value, onChange] = useState(new Date());
  const [meeting, setMeeting] = useState(false);

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

  const initialValues = {
    agenda: "",
    meetingDate: "",
    meetingTime: "",
    duration: "",
    attenders: [],
  };

  const scheduleSchema = Yup.object({
    agenda: Yup.string().required("Agenda is required"),
    meetingDate: Yup.string().required("Meeting date is required"),
    meetingTime: Yup.string().required("Time date is required"),
    meetingDuration: Yup.string().required("Duration is required"),
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
  const onSubmitHandle = (data) => {
    console.log(data);
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

  const renderMeetingDiv = () => {
    if (meeting) {
      return (
        <div className="">
          <div className="flex justify-between items-center">
            <div className="text-3xl font-semibold">Schedule your meeting</div>
            <div>
              <img
                onClick={() => setMeeting(!meeting)}
                className="cursor-pointer"
                src="
            /images/cross.png"
                alt=""
                height={20}
                width={20}
              />
            </div>
          </div>
          <div className="p-1">
            <form onSubmit={onSubmitHandle}>
              <div>
                <label className="label" htmlFor="agenda">
                  Meeting Agenda
                </label>
                <input className="input_field" type="text" />
              </div>
              <div className="mt-10 w-[50px] h-[50px]">
                <DateTimePicker
                  className="z-10"
                  onChange={onChange}
                  value={value}
                />
              </div>
            </form>
          </div>
        </div>
    );
    }
  };

  return (
    <Layout>
      <div className="p-2">
        <div onClick={() => setMeeting(!meeting)}>
          <button className="flex justify-center items-center w-[170px] p-1 rounded-sm bg-black text-white font-semibold text-md">Schedule a meeting</button>
        </div>
      {renderMeetingDiv()}
        <div>
          <h1>Demo App</h1>
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

export default Scheduling;
