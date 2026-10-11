import "./Dock.css";

/* Dock icons */
import finder from "../../assets/icons/dock/finder.webp";
import appstore from "../../assets/icons/dock/appstore.webp";
import message from "../../assets/icons/dock/message.webp";
import music from "../../assets/icons/dock/music.webp";
import photos from "../../assets/icons/dock/photos.webp";
import safari from "../../assets/icons/dock/safari.webp";
import maps from "../../assets/icons/dock/maps.webp";
import calendar from "../../assets/icons/dock/calendar.png";
import notes from "../../assets/icons/dock/notes.webp";
import siri from "../../assets/icons/dock/siri.webp";
import terminal from "../../assets/icons/dock/terminal.webp";
import settings from "../../assets/icons/dock/settings.webp";
import trash from "../../assets/icons/dock/trash.webp";

const DOCK_ITEMS = [
  { id: "finder", label: "Finder", src: finder },
  { id: "appstore", label: "App Store", src: appstore },
  { id: "message", label: "Mensajes", src: message },
  { id: "music", label: "Música", src: music },
  { id: "photos", label: "Fotos", src: photos },
  { id: "safari", label: "Safari", src: safari },
  { id: "maps", label: "Mapas", src: maps },
  { id: "calendar", label: "Calendario", src: calendar },
  { id: "notes", label: "Notas", src: notes },
  { id: "siri", label: "Siri", src: siri },
  { id: "terminal", label: "Terminal", src: terminal },
  { id: "settings", label: "Configuración", src: settings },
  { id: "trash", label: "Papelera", src: trash },
];

export default function Dock({
  onItemClick = () => {},
  onFinderClick = () => {},
  appState = {},
}) {
  return (
    <div className="dock" aria-label="Dock">
      {DOCK_ITEMS.map((item) => {
        const state = appState[item.id];
        const isOpen = Boolean(state?.open);
        const isMinimized = Boolean(state?.open && state?.minimized);

        const itemClass = [
          "dockItem",
          isOpen && "dockItem--open",
          isMinimized && "dockItem--minimized",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <div
            key={item.id}
            className={itemClass}
            data-app={item.id}
          >
            <div className="dockItem__dotLayer" aria-hidden="true">
              <span className="dock-dot" />
            </div>

            <button
              className="icon"
              type="button"
              aria-label={item.label}
              onClick={(e) => {
                e.stopPropagation();

                /* 👇 Finder cierra todo */
                if (item.id === "finder") {
                  onFinderClick();
                  return;
                }

                onItemClick(item.id);
              }}
            >
              <img src={item.src} alt={item.label} draggable="false" />
              <span className="dock-tooltip">{item.label}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}