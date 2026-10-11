import "./SpotifyMini.css";
import { LuPlay, LuPause, LuSkipForward } from "react-icons/lu";

export default function SpotifyMini() {
  return (
    <div className="spotify-mini">
      <div className="spotify-mini__info">
        <strong>Spotify</strong>
        <span>Reproduciendo ahora</span>
      </div>

      <div className="spotify-mini__controls">
        <LuPlay />
        <LuSkipForward />
      </div>
    </div>
  );
}