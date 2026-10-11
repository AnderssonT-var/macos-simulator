import "./BatteryPanel.css";

export default function BatteryPanel({
  batteryPct,
  charging,
  powerSave,
  setPowerSave
}) {
  return (
    <div className="batteryPanel">
      <div className="batteryPanel__header">
        <span>Batería</span>
        <span>{batteryPct}%</span>
      </div>

      <div className="batteryPanel__row">
        Fuente de alimentación: batería
      </div>

      <div className="batteryPanel__divider" />

      <div className="batteryPanel__section">
        <div className="batteryPanel__mode">
          <div className="batteryPanel__modeIcon" />
          <span>Ahorrar batería</span>

          <label className="switch">
            <input
              type="checkbox"
              checked={powerSave}
              onChange={() => setPowerSave(!powerSave)}
            />
            <span className="slider" />
          </label>
        </div>
      </div>

      <div className="batteryPanel__divider" />

      <div className="batteryPanel__row muted">
        No hay apps que usen mucha energía
      </div>

      <div className="batteryPanel__divider" />

      <div className="batteryPanel__link">
        Configuración de Batería…
      </div>

      <div className="batteryPanel__status">
        {charging
          ? `Batería: ${batteryPct}% – Cargando`
          : `Batería: ${batteryPct}%`}
      </div>
    </div>
  );
}