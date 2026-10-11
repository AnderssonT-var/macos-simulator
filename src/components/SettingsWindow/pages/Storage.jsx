import { useEffect, useState } from "react";

export default function Storage() {
  const [data, setData] = useState(null);
  const DISK_TOTAL_GB = 100;

  useEffect(() => {
    fetch("/api/storage.php")
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("Error storage:", err));
  }, []);

  if (!data) return <div>Cargando almacenamiento...</div>;

  const toGB = (bytes) => bytes / 1024 / 1024 / 1024;

  const usedGB = toGB(data.total);
  const freeGB = DISK_TOTAL_GB - usedGB;

  const percent = (value) =>
    ((value / (DISK_TOTAL_GB * 1024 * 1024 * 1024)) * 100 || 0).toFixed(1);

  return (
    <div className="settingsPage">
      <h2>Almacenamiento</h2>

      <div className="settingsCard">
        <strong>Uso total</strong>
        <div style={{ margin: "8px 0" }}>
          {usedGB.toFixed(2)} GB usados de {DISK_TOTAL_GB} GB
        </div>

        {/* Barra */}
        <div style={{
          height: "12px",
          borderRadius: "6px",
          background: "#333",
          overflow: "hidden",
          display: "flex"
        }}>
          <div style={{ width: percent(data.photos) + "%", background: "#0a84ff" }} />
          <div style={{ width: percent(data.videos) + "%", background: "#30d158" }} />
          <div style={{ width: percent(data.wallpapers) + "%", background: "#ffd60a" }} />
          <div style={{ width: percent(freeGB * 1024 * 1024 * 1024) + "%", background: "#444" }} />
        </div>

        {/* TARJETAS */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          gap: "14px",
          marginTop: "18px"
        }}>

          <div className="storageCard">
            📷
            <div>
              <strong>Fotos</strong>
              <div>{toGB(data.photos).toFixed(2)} GB</div>
              <small>{data.photosCount} archivos</small>
            </div>
          </div>

          <div className="storageCard">
            🎬
            <div>
              <strong>Videos</strong>
              <div>{toGB(data.videos).toFixed(2)} GB</div>
              <small>{data.videosCount} archivos</small>
            </div>
          </div>

          <div className="storageCard">
            🖼
            <div>
              <strong>Fondos</strong>
              <div>{toGB(data.wallpapers).toFixed(2)} GB</div>
              <small>{data.wallpapersCount} archivos</small>
            </div>
          </div>

          <div className="storageCard">
            💾
            <div>
              <strong>Disponible</strong>
              <div>{freeGB.toFixed(2)} GB</div>
            </div>
          </div>

          {/* 🆕 NUEVA TARJETA DEL SISTEMA */}
          <div className="storageCard">
            🗂
            <div>
              <strong>Sistema</strong>
              <div>{data.systemFilesCount}</div>
              <small>archivos en public_html</small>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}