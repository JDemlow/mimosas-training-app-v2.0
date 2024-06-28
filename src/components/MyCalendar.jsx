import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Setup the localizer by providing the moment (or globalize) Object
const localizer = momentLocalizer(moment);

// Sample events to display on the calendar
const myEventsList = [
  {
    title: "Meeting",
    start: new Date(2024, 5, 30, 10, 0, 0), // June 30, 2024, 10:00 AM
    end: new Date(2024, 5, 30, 12, 0, 0), // June 30, 2024, 12:00 PM
    allDay: false,
  },
  {
    title: "Lunch Break",
    start: new Date(2024, 5, 30, 13, 0, 0), // June 30, 2024, 1:00 PM
    end: new Date(2024, 5, 30, 14, 0, 0), // June 30, 2024, 2:00 PM
    allDay: false,
  },
  // Add more events here
];

const MyCalendar = () => (
  <div style={{ height: "500pt" }}>
    <Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>
);

export default MyCalendar;
