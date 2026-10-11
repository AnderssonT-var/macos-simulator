import "./SettingsSidebar.css";

export default function SettingsSidebar({ active, onChange }) {
  return (
    <aside className="settingsSidebar">
      {/* BUSCAR */}
      <div className="settingsSidebar__search">
        <input type="text" placeholder="Buscar" disabled />
      </div>

      {/* CUENTA */}
      <div className="settingsSidebar__section">
        <div
          className={`settingsSidebar__item ${active === "apple" ? "active" : ""}`}
          onClick={() => onChange("apple")}
        >
          <span className="icon">👤</span>
          <div>
            <div><strong>enfoco.media</strong></div>
            <small>Cuenta</small>
          </div>
        </div>
      </div>

      {/* GENERAL */}
      <div className="settingsSidebar__section">
        <div
          className={`settingsSidebar__item ${active === "general" ? "active" : ""}`}
          onClick={() => onChange("general")}
        >
          <span className="icon">⚙️</span>
          General
        </div>

        <div
          className={`settingsSidebar__item ${active === "wallpapers" ? "active" : ""}`}
          onClick={() => onChange("wallpapers")}
        >
          <span className="icon">🖼️</span>
          Fondo de pantalla
        </div>
      </div>

      {/* ESTÁTICOS */}
      <div className="settingsSidebar__section">
        <div className="settingsSidebar__item disabled">
          <span className="icon">📶</span>
          Wi-Fi
        </div>
        <div className="settingsSidebar__item disabled">
          <span className="icon">🔵</span>
          Bluetooth
        </div>
        <div className="settingsSidebar__item disabled">
          <span className="icon">🔔</span>
          Notificaciones
        </div>
      </div>
    </aside>
  );
}