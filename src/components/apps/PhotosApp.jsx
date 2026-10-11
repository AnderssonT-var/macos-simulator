import "./PhotosApp.css";
import { useEffect, useRef, useState } from "react";

export default function PhotosApp() {
  const [items, setItems] = useState([]);
  const [viewerIndex, setViewerIndex] = useState(null);
  const [filter, setFilter] = useState("photos");

  /* PASSWORD MODAL */
  const [askPassword, setAskPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordAction, setPasswordAction] = useState(null);

  const inputRef = useRef(null);

  /* VIDEO PLAYER */
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  /* LOAD */
  const loadItems = async () => {
    const res = await fetch("/api/list.php");
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    loadItems();
  }, []);

  /* ───────── PASSWORD FLOW ───────── */
  const openUpload = () => {
    setPassword("");
    setPasswordError(false);
    setPasswordAction("upload");
    setAskPassword(true);
  };

  const openDelete = () => {
    setPassword("");
    setPasswordError(false);
    setPasswordAction("delete");
    setAskPassword(true);
  };

  const confirmPassword = async () => {
    try {
      const res = await fetch("/api/password/validate.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!data.success) {
        setPasswordError(true);
        return;
      }

      setAskPassword(false);

      if (passwordAction === "upload") {
        setTimeout(() => {
          inputRef.current.click();
        }, 0);
      }

      if (passwordAction === "delete" && viewerItem) {
        await fetch("/api/delete.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: viewerItem.id }),
        });

        setViewerIndex(null);
        loadItems();
      }
    } catch {
      setPasswordError(true);
    }
  };

  /* ───────── UPLOAD WITH PROGRESS ───────── */
  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);

    for (const file of files) {
      const tempId = "temp-" + Math.random();

      const tempItem = {
        id: tempId,
        url: URL.createObjectURL(file),
        type: file.type,
        favorite: false,
        uploading: true,
        progress: 0,
      };

      setItems((prev) => [tempItem, ...prev]);

      const form = new FormData();
      form.append("file", file);

      await new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/upload.php");

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            const percent = Math.round((e.loaded / e.total) * 100);
            setItems((prev) =>
              prev.map((item) =>
                item.id === tempId
                  ? { ...item, progress: percent }
                  : item
              )
            );
          }
        };

        xhr.onload = async () => {
          await loadItems();
          resolve();
        };

        xhr.send(form);
      });
    }

    e.target.value = "";
  };

  /* FAVORITE */
  const handleFavorite = async (id) => {
    await fetch("/api/favorite.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadItems();
  };

  /* FILTER */
  const visibleItems = items.filter((item) => {
    if (filter === "photos") return item.type.startsWith("image/");
    if (filter === "videos") return item.type.startsWith("video/");
    if (filter === "favorites") return item.favorite;
    return true;
  });

  const viewerItem = viewerIndex !== null ? visibleItems[viewerIndex] : null;

  /* VIDEO CONTROLS */
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  const onTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
    setDuration(videoRef.current.duration || 0);
  };

  const seek = (e) => {
    videoRef.current.currentTime = e.target.value;
  };

  const changeVolume = (e) => {
    videoRef.current.volume = e.target.value;
    setVolume(e.target.value);
  };

  const formatTime = (t) => {
    if (!t) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const fullscreen = () => {
    videoRef.current?.requestFullscreen?.();
  };

  return (
    <div className="photos">
      {/* SIDEBAR */}
      <aside className="photos__sidebar">
        <h3>Fototeca</h3>
        <ul>
          <li className={filter === "photos" ? "active" : ""} onClick={() => setFilter("photos")}>Fotos</li>
          <li className={filter === "videos" ? "active" : ""} onClick={() => setFilter("videos")}>Videos</li>
          <li className={filter === "favorites" ? "active" : ""} onClick={() => setFilter("favorites")}>Favoritos</li>
        </ul>

        <button className="photos__uploadBtn" onClick={openUpload}>
          Subir contenido
        </button>

        <input
          ref={inputRef}
          type="file"
          hidden
          multiple
          accept="image/*,video/*"
          onChange={handleUpload}
        />
      </aside>

      {/* GRID */}
      <section className="photos__main">
        <div className="photos__grid">
          {visibleItems.map((item, i) => (
            <div
              key={item.id}
              className="photos__item"
              onDoubleClick={() => !item.uploading && setViewerIndex(i)}
            >
              {item.type.startsWith("image/") ? (
                <img src={item.url} alt="" />
              ) : (
                <video src={item.url} muted />
              )}

              <button
                className={`photos__favorite ${item.favorite ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavorite(item.id);
                }}
              >
                ★
              </button>

              {item.uploading && (
                <div className="uploadProgressCircle">
                  <svg viewBox="0 0 36 36">
                    <path
                      className="bg"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="progress"
                      strokeDasharray={`${item.progress}, 100`}
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x="18" y="20.35" className="percentage">
                      {item.progress}%
                    </text>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* VIEWER */}
      {viewerItem && (
        <div className="photos__viewer">
          <div className="photos__viewerFrame">
            <div className="photos__viewerHeader">
              <button className="viewer-btn close" onClick={() => setViewerIndex(null)}>✕</button>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  className={`viewer-btn fav ${viewerItem.favorite ? "active" : ""}`}
                  onClick={() => handleFavorite(viewerItem.id)}
                >
                  ★
                </button>

                <button className="viewer-btn delete" onClick={openDelete}>
                  🗑
                </button>
              </div>
            </div>

            <div className="photos__viewerBody">
              {viewerItem.type.startsWith("image/") ? (
                <img src={viewerItem.url} alt="" />
              ) : (
                <div
                  className="videoPlayer"
                  onMouseMove={() => setShowControls(true)}
                  onMouseLeave={() => setShowControls(false)}
                >
                  <video
                    ref={videoRef}
                    src={viewerItem.url}
                    autoPlay
                    onTimeUpdate={onTimeUpdate}
                    onClick={togglePlay}
                  />

                  {showControls && (
                    <>
                      <div className="videoTopLeft">
                        <button onClick={fullscreen}>⤢</button>
                      </div>

                      <div className="videoTopRight">
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={volume}
                          onChange={changeVolume}
                        />
                      </div>

                      <div className="videoControls">
                        <button onClick={togglePlay}>
                          {playing ? "❚❚" : "▶"}
                        </button>

                        <span className="videoTime">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>

                        <input
                          type="range"
                          min="0"
                          max={duration}
                          value={currentTime}
                          onChange={seek}
                        />

                        <button onClick={fullscreen}>⛶</button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PASSWORD MODAL */}
      {askPassword && (
        <div className="photos__passwordOverlay">
          <div className="photos__passwordModal">
            <h4>Contraseña requerida</h4>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(false);
              }}
              placeholder="Ingresa la contraseña"
              onKeyDown={(e) => e.key === "Enter" && confirmPassword()}
            />
            {passwordError && (
              <p className="photos__passwordError">Contraseña incorrecta</p>
            )}
            <div className="photos__passwordActions">
              <button onClick={() => setAskPassword(false)}>Cancelar</button>
              <button className="primary" onClick={confirmPassword}>
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}