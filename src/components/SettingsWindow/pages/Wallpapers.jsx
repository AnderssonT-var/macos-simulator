import { useEffect, useRef, useState } from "react";
import "./Wallpapers.css";

export default function Wallpapers({ onSelectWallpaper }) {
  const [wallpapers, setWallpapers] = useState([]);
  const [selected, setSelected] = useState(null);
  const inputRef = useRef(null);

  const loadWallpapers = async () => {
    const res = await fetch("/api/wallpapers/list.php");
    const data = await res.json();
    setWallpapers(data);

    // ⚠️ SOLO marcar seleccionado, NO cambiar fondo
    const current = data.find(w => w.is_current == 1);
    if (current) {
      setSelected(current);
    }
  };

  useEffect(() => {
    loadWallpapers();
  }, []);

  const uploadWallpaper = async (file) => {
    const form = new FormData();
    form.append("file", file);

    await fetch("/api/wallpapers/upload.php", {
      method: "POST",
      body: form,
    });

    loadWallpapers();
  };

  const setAsWallpaper = async () => {
    if (!selected) return;

    await fetch("/api/wallpapers/set-current.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: selected.id }),
    });

    // ✅ SOLO AQUÍ se cambia el fondo visual
    onSelectWallpaper(`uploads/wallpapers/${selected.filename}`);

    loadWallpapers();
  };

  const deleteWallpaper = async () => {
    if (!selected) return;

    await fetch("/api/wallpapers/delete.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: selected.id }),
    });

    setSelected(null);
    loadWallpapers();
  };

  return (
    <div className="wallpapers">
      {/* TOP */}
      <div className="wallpapers__top">
        <div className="wallpapers__preview">
          {selected ? (
            <img src={`/uploads/wallpapers/${selected.filename}`} />
          ) : (
            <div className="wallpapers__empty">Selecciona un fondo</div>
          )}
        </div>

        <div className="wallpapers__controls">
          <button onClick={() => inputRef.current.click()}>
            Subir fondo de pantalla…
          </button>

          <button
            disabled={!selected}
            onClick={setAsWallpaper}
          >
            Seleccionar como fondo
          </button>

          {selected && (
            <button className="danger" onClick={deleteWallpaper}>
              Eliminar fondo
            </button>
          )}

          <input
            ref={inputRef}
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => uploadWallpaper(e.target.files[0])}
          />
        </div>
      </div>

      {/* GRID */}
      <div className="wallpapers__grid">
        {wallpapers.map((w) => (
          <div
            key={w.id}
            className={`wallpaperItem ${
              selected?.id === w.id ? "active" : ""
            }`}
            onClick={() => setSelected(w)}
          >
            <img src={`/uploads/wallpapers/${w.filename}`} />
          </div>
        ))}
      </div>
    </div>
  );
}