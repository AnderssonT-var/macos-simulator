import "./NotificationCenter.css";
import { useCalendar } from "../../context/CalendarContext";

export default function NotificationCenter({ onOpenCalendar }) {
  const { events } = useCalendar();

  const todayStr = new Date().toISOString().slice(0, 10);

  const todayEvents = events.filter(e => e.date === todayStr);
  const upcomingEvents = events.filter(e => e.date > todayStr);

  return (
    <div className="notificationCenter">
      <h3>Centro de notificaciones</h3>

      {todayEvents.length > 0 && (
        <>
          <h4>Hoy</h4>
          {todayEvents.map(ev => (
            <div
              key={ev.id}
              className="notificationItem"
              onClick={onOpenCalendar}
            >
              <strong>{ev.title}</strong>
              {ev.time && <span>🕒 {ev.time}</span>}
            </div>
          ))}
        </>
      )}

      {upcomingEvents.length > 0 && (
        <>
          <h4>Próximos</h4>
          {upcomingEvents.map(ev => (
            <div
              key={ev.id}
              className="notificationItem"
              onClick={onOpenCalendar}
            >
              <strong>{ev.title}</strong>
              <span>{ev.date}</span>
            </div>
          ))}
        </>
      )}

      {events.length === 0 && (
        <p className="notificationEmpty">
          No hay eventos en el calendario
        </p>
      )}
    </div>
  );
}