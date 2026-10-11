import "./SocialsApp.css";

import facebookIcon from "../../assets/icons/socials/facebook.png";
import instagramIcon from "../../assets/icons/socials/instagram.png";
import tiktokIcon from "../../assets/icons/socials/tiktok.png";
import youtubeIcon from "../../assets/icons/socials/youtube.png";

const SOCIALS = [
  {
    id: "facebook",
    name: "Facebook",
    handle: "usename",
    meta: "⭐ 4.6 Estrellas",
    icon: facebookIcon,
    url: "https://www.facebook.com/",
  },
  {
    id: "instagram",
    name: "Instagram",
    handle: "username",
    meta: "👤 +55K Seguidores",
    icon: instagramIcon,
    url: "https://www.instagram.com/",
  },
  {
    id: "tiktok",
    name: "TikTok",
    handle: "username",
    meta: "👤 +8K Seguidores",
    icon: tiktokIcon,
    url: "https://www.tiktok.com/",
  },
  {
    id: "youtube",
    name: "YouTube",
    handle: "userame",
    meta: "👤 +900 Suscriptores",
    icon: youtubeIcon,
    url: "https://www.youtube.com/",
  },
];

export default function SocialsApp() {
  return (
    <div className="socials">
      <div className="socials__list">
        {SOCIALS.map((s) => (
          <div key={s.id} className="socials__card">
            {/* Icon */}
            <div className="socials__icon">
              <img src={s.icon} alt={s.name} draggable="false" />
            </div>

            {/* Info */}
            <div className="socials__info">
              <h3 className="socials__title">{s.name}</h3>
              <p className="socials__handle">{s.handle}</p>
              <span className="socials__meta">{s.meta}</span>
            </div>

            {/* Action */}
            <div className="socials__action">
              <button
                className="socials__btn"
                onClick={() => window.open(s.url, "_blank")}
              >
                Visitar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}