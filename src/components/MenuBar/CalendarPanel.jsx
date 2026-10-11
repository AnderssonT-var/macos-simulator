import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarPanel.css";

export default function CalendarPanel() {
  const [value, setValue] = useState(new Date());

  return (
    <div className="calendarPanel">
      <Calendar
        onChange={setValue}
        value={value}
        locale="es-ES"
      />
    </div>
  );
}