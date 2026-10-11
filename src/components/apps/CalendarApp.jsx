import "./CalendarApp.css";
import { useState } from "react";
import { useCalendar } from "../../context/CalendarContext";

const MONTHS = [
  "enero","febrero","marzo","abril","mayo","junio",
  "julio","agosto","septiembre","octubre","noviembre","diciembre",
];

const DAYS = ["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"];

export default function CalendarApp() {
  const today = new Date();
  const { events, addEvent, updateEvent } = useCalendar(); // ✅ UPDATE AQUÍ

  const [current, setCurrent] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [selectedDate, setSelectedDate] = useState(null);
  const [viewDate, setViewDate] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  /* FORM STATE */
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const year = current.getFullYear();
  const month = current.getMonth();

  const firstDay = new Date(year, month, 1);
  const startDay = (firstDay.getDay() + 6) % 7;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();

  const cells = [];

  for (let i = startDay - 1; i >= 0; i--) {
    cells.push({ day: daysInPrev - i, muted: true });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const hasEvent = events.some(e => e.date === dateStr);

    const isToday =
      d === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();

    cells.push({
      day: d,
      today: isToday,
      hasEvent,
      dateStr
    });
  }

  while (cells.length % 7 !== 0) {
    cells.push({ day: "", muted: true });
  }

  const prevMonth = () => setCurrent(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrent(new Date(year, month + 1, 1));

  const resetForm = () => {
    setTitle("");
    setPlace("");
    setTime("");
    setNotes("");
  };

  /* NUEVO EVENTO */
  const submitEvent = async () => {
    await addEvent({
      date: selectedDate,
      title,
      place,
      time,
      notes,
    });

    setSelectedDate(null);
    resetForm();
  };

  /* ✏️ EDITAR EVENTO (ARREGLADO) */
  const saveEdit = async () => {
    await updateEvent({
      id: editingEvent.id,
      title,
      place,
      time,
      notes,
    });

    setEditingEvent(null);
    resetForm();
  };

  const eventsOfDay = viewDate
    ? events.filter(e => e.date === viewDate)
    : [];

  return (
    <>
      {/* CALENDAR */}
      <div className="calendar">
        <header className="calendar__header">
          <button onClick={prevMonth}>‹</button>
          <h2>{MONTHS[month]} de {year}</h2>
          <button onClick={nextMonth}>›</button>
        </header>

        <div className="calendar__grid">
          {DAYS.map(d => (
            <div key={d} className="calendar__dayName">{d}</div>
          ))}

          {cells.map((c, i) => (
            <div
              key={i}
              className={[
                "calendar__cell",
                c.today && "today",
                c.muted && "muted",
                c.hasEvent && "has-event",
                i % 7 >= 5 && !c.muted && "weekend",
              ].filter(Boolean).join(" ")}
              onClick={() => {
                if (!c.muted && c.day) {
                  c.hasEvent
                    ? setViewDate(c.dateStr)
                    : setSelectedDate(c.dateStr);
                }
              }}
            >
              {c.day}
            </div>
          ))}
        </div>
      </div>

      {/* 🪟 VER EVENTOS */}
      {viewDate && (
        <div className="calendar__eventOverlay" onClick={() => setViewDate(null)}>
          <div className="calendar__eventModal" onClick={e => e.stopPropagation()}>
            <h4>Eventos del día</h4>

            {eventsOfDay.map(ev => (
              <div key={ev.id} style={{ marginBottom: "14px" }}>
                <strong>{ev.title}</strong>
                {ev.time && <div>🕒 {ev.time.slice(0,5)}</div>}
                {ev.place && <div>📍 {ev.place}</div>}
                {ev.notes && <div>{ev.notes}</div>}

                <button
                  style={{
                    marginTop: "6px",
                    fontSize: "12px",
                    background: "#2c2c2e",
                    color: "#0a84ff",
                    border: "none",
                    borderRadius: "6px",
                    padding: "4px 10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setViewDate(null);
                    setEditingEvent(ev);
                    setTitle(ev.title || "");
                    setPlace(ev.place || "");
                    setTime(ev.time ? ev.time.slice(0,5) : "");
                    setNotes(ev.notes || "");
                  }}
                >
                  Editar
                </button>
              </div>
            ))}

            <div className="calendar__eventActions">
              <button onClick={() => setViewDate(null)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}

      {/* 🪟 NUEVO EVENTO */}
      {selectedDate && (
        <div className="calendar__eventOverlay" onClick={() => setSelectedDate(null)}>
          <div className="calendar__eventModal" onClick={e => e.stopPropagation()}>
            <h4>Nuevo evento</h4>

            <input placeholder="Nombre del evento" value={title} onChange={e => setTitle(e.target.value)} />
            <input placeholder="Lugar" value={place} onChange={e => setPlace(e.target.value)} />
            <input type="time" value={time} onChange={e => setTime(e.target.value)} />
            <textarea placeholder="Comentario" value={notes} onChange={e => setNotes(e.target.value)} />

            <div className="calendar__eventActions">
              <button onClick={() => setSelectedDate(null)}>Cancelar</button>
              <button className="primary" onClick={submitEvent}>Guardar</button>
            </div>
          </div>
        </div>
      )}

      {/* 🪟 EDITAR EVENTO */}
      {editingEvent && (
        <div className="calendar__eventOverlay" onClick={() => setEditingEvent(null)}>
          <div className="calendar__eventModal" onClick={e => e.stopPropagation()}>
            <h4>Editar evento</h4>

            <input placeholder="Nombre del evento" value={title} onChange={e => setTitle(e.target.value)} />
            <input placeholder="Lugar" value={place} onChange={e => setPlace(e.target.value)} />
            <input type="time" value={time} onChange={e => setTime(e.target.value)} />
            <textarea placeholder="Comentario" value={notes} onChange={e => setNotes(e.target.value)} />

            <div className="calendar__eventActions">
              <button onClick={() => setEditingEvent(null)}>Cancelar</button>
              <button className="primary" onClick={saveEdit}>Guardar cambios</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}