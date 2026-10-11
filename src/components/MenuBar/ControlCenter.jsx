import MenuPopover from "./MenuPopover";
import {
  LuWifi,
  LuBluetooth,
  LuMoon,
  LuSun,
  LuVolume,
  LuVolume1,
  LuVolume2,
  LuVolumeX,
  LuHeadphones,
  LuGamepad2,
  LuSpeaker,
  LuRouter,
  LuBatteryCharging,
  LuBatteryFull
} from "react-icons/lu";
import { useEffect, useState } from "react";

import "./ControlCenter.css";

export default function ControlCenter() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const [showWifi, setShowWifi] = useState(false);
  const [showBluetooth, setShowBluetooth] = useState(false);

  const [wifiOn, setWifiOn] = useState(true);
  const [bluetoothOn, setBluetoothOn] = useState(true);

  const [connectedWifi, setConnectedWifi] = useState("ENFOCO.MEDIA");
  const [connectedDevice, setConnectedDevice] = useState("AirPods Pro de Andersson");

  const [focusOn, setFocusOn] = useState(false);
  const [warmLight, setWarmLight] = useState(false);

  const [brightness, setBrightness] = useState(
    Number(localStorage.getItem("brightness")) || 100
  );

  const [volume, setVolume] = useState(
    Number(localStorage.getItem("volume")) || 60
  );

  /* WIFI STATUS REAL */
  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);



  /* BRIGHTNESS + WARM LIGHT */
  useEffect(() => {
    let filter = `brightness(${brightness}%)`;

    if (warmLight) {
      filter += " sepia(20%) saturate(90%) hue-rotate(-10deg)";
    }

    document.documentElement.style.filter = filter;
    localStorage.setItem("brightness", brightness);
  }, [brightness, warmLight]);

  /* VOLUME */
  useEffect(() => {
    localStorage.setItem("volume", volume);
  }, [volume]);

  const getVolumeIcon = () => {
    if (volume === 0) return <LuVolumeX />;
    if (volume < 30) return <LuVolume />;
    if (volume < 70) return <LuVolume1 />;
    return <LuVolume2 />;
  };

  /* RANDOM WIFI NETWORKS */
  const wifiNetworks = [
    "MEGATIENDA",
    "FASTNETT",
    "XTRIM_CARLOS_5G",
    "NETLIFE-204",
    "ORIENTE",
    "PRIMAX",
    "SMT_EL_PARADERO",
    "HOTEL_WIFI",
    "CASA_LAURA"
  ].sort(() => 0.5 - Math.random()).slice(0, 5);

  /* RANDOM BLUETOOTH DEVICES */
  const bluetoothDevices = [
    "AirPods Pro #2",
    "DUALSHOCK 4 Wireless Controller",
    "JBL Speaker",
    "Galaxy Buds",
    "BOSE QC45",
    "PS5 Controller",
    "Logitech Speaker"
  ].sort(() => 0.5 - Math.random()).slice(0, 4);

  return (
    <MenuPopover align="right">
      <div className="controlCenter">

        {/* TOGGLES */}
        <div className="cc__grid">
          <div
            className={`cc__tile ${wifiOn ? "active" : ""}`}
            onClick={() => {
              setShowWifi(!showWifi);
              setShowBluetooth(false);
            }}
          >
            <LuWifi />
            <span>Wi-Fi</span>
          </div>

          <div
            className={`cc__tile ${bluetoothOn ? "active" : ""}`}
            onClick={() => {
              setShowBluetooth(!showBluetooth);
              setShowWifi(false);
            }}
          >
            <LuBluetooth />
            <span>Bluetooth</span>
          </div>

          <div
            className={`cc__tile ${focusOn ? "active" : ""}`}
            onClick={() => setFocusOn(!focusOn)}
          >
            <LuMoon />
            <span>Enfoque</span>
          </div>

          <div
            className={`cc__tile ${warmLight ? "active" : ""}`}
            onClick={() => setWarmLight(!warmLight)}
          >
            <LuSun />
            <span>Luz</span>
          </div>
        </div>

        {/* WIFI PANEL */}
        {showWifi && (
          <div className="cc__bluetoothPanel">
            <div className="cc__bluetoothHeader">
              <span>Wi-Fi</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={wifiOn}
                  onChange={() => setWifiOn(!wifiOn)}
                />
                <span className="slider" />
              </label>
            </div>

            {wifiOn && (
              <>
                <div className="cc__bluetoothConnected">
                  <LuRouter />
                  <div>
                    <strong>{connectedWifi}</strong>
                    <span>Conectado</span>
                  </div>
                </div>

                <div className="cc__bluetoothList">
                  {wifiNetworks.map((net) => (
                    <div
                      key={net}
                      className="cc__bluetoothItem"
                      onClick={() => setConnectedWifi(net)}
                    >
                      <LuWifi />
                      <span>{net}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* BLUETOOTH PANEL */}
        {showBluetooth && (
          <div className="cc__bluetoothPanel">
            <div className="cc__bluetoothHeader">
              <span>Bluetooth</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={bluetoothOn}
                  onChange={() => setBluetoothOn(!bluetoothOn)}
                />
                <span className="slider" />
              </label>
            </div>

            {bluetoothOn && (
              <>
                <div className="cc__bluetoothConnected">
                  <LuHeadphones />
                  <div>
                    <strong>{connectedDevice}</strong>
                    <span>Conectado</span>
                  </div>
                </div>

                <div className="cc__bluetoothList">
                  {bluetoothDevices.map((d) => (
                    <div
                      key={d}
                      className="cc__bluetoothItem"
                      onClick={() => setConnectedDevice(d)}
                    >
                      {d.includes("Controller")
                        ? <LuGamepad2 />
                        : d.includes("Speaker")
                        ? <LuSpeaker />
                        : <LuHeadphones />}
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* SPOTIFY MINI */}
        <div className="cc__music">
          <iframe
            title="Spotify Mini"
            src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M"
            width="100%"
            height="90"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{ borderRadius: "12px", border: "none" }}
          />
        </div>

        {/* BRIGHTNESS */}
        <div className="cc__slider">
          <span>Pantalla</span>
          <input
            type="range"
            min="30"
            max="120"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
          />
        </div>

        {/* VOLUME */}
        <div className="cc__slider">
          <span>Sonido {getVolumeIcon()}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
        </div>

      </div>
    </MenuPopover>
  );
}