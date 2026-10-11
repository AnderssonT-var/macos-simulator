import "./BootScreen.css";
import { useEffect, useState } from "react";
import logo from "../../assets/favicon.png";

export default function BootScreen({ onFinish }) {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setClosing(true); // empieza animación de salida
    }, 2500); // empieza a desaparecer antes de los 3s

    const finishTimer = setTimeout(() => {
      onFinish(); // entra al escritorio
    }, 3000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div className={`boot ${closing ? "boot--hide" : ""}`}>
      <img src={logo} alt="logo" className="boot__logo" />
      <div className="boot__loader"></div>
    </div>
  );
}