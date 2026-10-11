import { createContext, useContext, useEffect, useState } from "react";

const CalendarContext = createContext();

export function CalendarProvider({ children }) {
  const [events, setEvents] = useState([]);

  /* LOAD EVENTS */
  const loadEvents = async () => {
    const res = await fetch("/api/calendar/list.php");
    const data = await res.json();
    setEvents(data);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  /* ADD EVENT */
  const addEvent = async (event) => {
    await fetch("/api/calendar/create.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });

    await loadEvents();
  };

  /* ✅ UPDATE EVENT (ESTO FALTABA) */
  const updateEvent = async (event) => {
    await fetch("/api/calendar/update.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });

    await loadEvents(); // 🔥 FORZAMOS REFRESH REAL
  };

  return (
    <CalendarContext.Provider value={{ events, addEvent, updateEvent }}>
      {children}
    </CalendarContext.Provider>
  );
}

export const useCalendar = () => useContext(CalendarContext);