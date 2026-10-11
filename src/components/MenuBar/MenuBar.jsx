import "./MenuBar.css";
import { useEffect, useMemo, useRef, useState } from "react";

import appleIcon from "../../assets/favicon.png";
import controlCenterIcon from "../../assets/icons/menubar/control-center.webp";

import CalendarPanel from "./CalendarPanel";
import ControlCenter from "./ControlCenter";
import BatteryPanel from "./BatteryPanel";
import NotificationCenter from "./NotificationCenter"; // ✅ IMPORTAR

function formatDateTime(date) {
  const locale = "es-EC";

  const parts = new Intl.DateTimeFormat(locale, {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit", // ✅ SEGUNDOS
    hour12: false,
  }).formatToParts(date);

  const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  const wd = (map.weekday || "").replace(".", "");
  const mo = (map.month || "").replace(".", "");

  return `${wd} ${map.day} ${mo} ${map.hour}:${map.minute}:${map.second}`;
}

export default function MenuBar() {
  const [now, setNow] = useState(() => new Date());
  const [openPanel, setOpenPanel] = useState(null);

  const barRef = useRef(null);

  /* CLOCK */
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  /* CLOSE OUTSIDE */
  useEffect(() => {
    const close = (e) => {
      if (!barRef.current?.contains(e.target)) {
        setOpenPanel(null);
      }
    };
    window.addEventListener("mousedown", close);
    return () => window.removeEventListener("mousedown", close);
  }, []);

  const label = useMemo(() => formatDateTime(now), [now]);

  /* BATTERY */
  const [batteryPct, setBatteryPct] = useState(100);
  const [charging, setCharging] = useState(false);
  const [powerSave, setPowerSave] = useState(false);

  useEffect(() => {
    if (!navigator.getBattery) return;

    navigator.getBattery().then((battery) => {
      const updateBattery = () => {
        setBatteryPct(Math.round(battery.level * 100));
        setCharging(battery.charging);
      };

      updateBattery();
      battery.addEventListener("levelchange", updateBattery);
      battery.addEventListener("chargingchange", updateBattery);
    });
  }, []);

  const batteryColor =
    batteryPct > 60 ? "#34c759" : batteryPct > 20 ? "#ffd60a" : "#ff453a";

  return (
    <header className="menuBar" ref={barRef}>
      <nav className="menuBar__inner">
        {/* LEFT */}
        <div className="menuBar__left">
          <button className="menuBar__chip menuBar__chipBtn">
            <img
              className="menuBar__apple"
              src={appleIcon}
              alt="Apple"
              draggable="false"
            />
          </button>

          <button className="menuBar__chip menuBar__chipBtn menuBar__chipBtn--bold">
            Finder
          </button>
        </div>

        {/* RIGHT */}
        <div className="menuBar__right">
          {/* BATTERY MINI */}
          <button
            className={`menuBar__chip menuBar__batteryMini ${
              openPanel === "battery" ? "menuBar__chip--active" : ""
            }`}
            onClick={() =>
              setOpenPanel(openPanel === "battery" ? null : "battery")
            }
          >
            <span className="menuBar__batteryMiniCase">
              <span
                className="menuBar__batteryMiniFill"
                style={{
                  width: `${batteryPct}%`,
                  background: batteryColor,
                }}
              />
            </span>
          </button>

          {/* CONTROL CENTER */}
          <button
            className={`menuBar__chip menuBar__chipBtn menuBar__iconBtn ${
              openPanel === "control" ? "menuBar__chip--active" : ""
            }`}
            onClick={() =>
              setOpenPanel(openPanel === "control" ? null : "control")
            }
          >
            <img
              className="menuBar__imgIcon"
              src={controlCenterIcon}
              alt=""
              draggable="false"
            />
          </button>

          {/* CLOCK */}
          <button
            className={`menuBar__chip menuBar__chipBtn menuBar__clock ${
              openPanel === "calendar" ? "menuBar__chip--active" : ""
            }`}
            onClick={() =>
              setOpenPanel(openPanel === "calendar" ? null : "calendar")
            }
          >
            {label}
          </button>
        </div>
      </nav>

      {/* PANELS */}

      {/* 📅 + 🔔 COMBINADOS */}
      {openPanel === "calendar" && (
        <div className="menuBar__panel menuBar__panel--calendar">
          <CalendarPanel />
          <NotificationCenter /> {/* 👈 ABAJO */}
        </div>
      )}

      {openPanel === "control" && (
        <div className="menuBar__panel menuBar__panel--control">
          <ControlCenter />
        </div>
      )}

      {openPanel === "battery" && (
        <div className="menuBar__panel menuBar__panel--battery">
          <BatteryPanel
            batteryPct={batteryPct}
            charging={charging}
            powerSave={powerSave}
            setPowerSave={setPowerSave}
          />
        </div>
      )}
    </header>
  );
}