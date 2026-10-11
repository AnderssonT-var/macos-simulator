import { useState } from "react";
import "./SettingsWindow.css";

import SettingsSidebar from "./SettingsSidebar";
import General from "./pages/General";
import AppleAccount from "./pages/AppleAccount";
import Wallpapers from "./pages/Wallpapers";
import Storage from "./pages/Storage"; // ✅ YA IMPORTADO

export default function SettingsWindow({ onSelectWallpaper, currentWallpaper }) {
  // ✅ Abrir primero en enfoco.media (Cuenta)
  const [section, setSection] = useState("apple");

  const renderSection = () => {
    switch (section) {
      case "apple":
        return <AppleAccount />;

      case "wallpapers":
        return (
          <Wallpapers
            currentWallpaper={currentWallpaper}
            onSelectWallpaper={onSelectWallpaper}
          />
        );

      case "storage": // ✅ NUEVO
        return <Storage />;

      case "general":
      default:
        return <General />;
    }
  };

  return (
    <div className="settings">
      <SettingsSidebar
        active={section}
        onChange={(value) => setSection(value)}
      />

      <div className="settings__content">
        {renderSection()}
      </div>
    </div>
  );
}