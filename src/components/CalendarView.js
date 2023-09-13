import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

const formatCalendarEvent = (calendarEvent) => ({
  ...calendarEvent,
  start: moment(calendarEvent.start).format("YYYY-MM-DD"),
  end: moment(calendarEvent.end).format("YYYY-MM-DD"),
});

function CalendarView({ eventsData, onAdd, onEdit }) {
  return (
    <div>
      <Calendar
        views={["month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "90vmin" }}
        onSelectEvent={(calendarEvent) => onEdit(formatCalendarEvent(calendarEvent))}
        onSelectSlot={(calendarEvent) => onAdd(formatCalendarEvent({ ...calendarEvent, done: false }))}
      />
    </div>
  );
}

export default CalendarView;
