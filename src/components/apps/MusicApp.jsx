import { useEffect, useRef } from "react";

export default function MusicApp() {
  const audioRef = useRef(null);

  useEffect(() => {
    // Registrar el audio global del sistema
    window.systemAudio = audioRef.current;

    // Media Session (para que el Control Center muestre canción)
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: "Simulador macOS",
        artist: "Spotify (visual)",
        album: "Reproductor del sistema",
      });
    }
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* AUDIO REAL DEL SISTEMA */}
      <audio
        ref={audioRef}
        src="/music/demo.mp3"   // 👈 aquí pon tu mp3 real
        autoPlay
        loop
        controls={false}
        style={{ display: "none" }}
      />

      {/* SPOTIFY SOLO VISUAL */}
      <iframe
        title="Spotify"
        src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M"
        width="100%"
        height="100%"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        style={{ borderRadius: "12px" }}
      />
    </div>
  );
}