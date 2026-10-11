import { useEffect, useState } from "react";
import "./PhotoWidget.css";

export default function PhotoWidget() {
  const [photos, setPhotos] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/list.php")
      .then(res => res.json())
      .then(data => {
        // 🔥 solo imágenes
        const onlyImages = (data || []).filter(item =>
          item.type && item.type.startsWith("image/")
        );
        setPhotos(onlyImages);
        setLoading(false);
      })
      .catch(err => {
        console.error("Widget photos error:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!photos.length) return;
    const interval = setInterval(() => {
      setIndex(i => (i + 1) % photos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [photos]);

  return (
    <div className="photoWidget">
      {loading && <div className="photoWidget__placeholder">Cargando…</div>}

      {!loading && photos.length === 0 && (
        <div className="photoWidget__placeholder">Sin fotos</div>
      )}

      {!loading && photos.length > 0 && (
        <img
          key={photos[index].id}
          src={photos[index].url}
          alt="widget"
          className="photoWidget__image"
        />
      )}
    </div>
  );
}