import "./AppleAccount.css";
import avatar from "../../../assets/avatar.jpg"; // ✅ RUTA CORRECTA

export default function AppleAccount() {
  return (
    <div className="appleAccount">
      {/* HEADER */}
      <div className="appleAccount__header">
        <img
          className="appleAccount__avatar"
          src={avatar}
          alt="avatar"
        />
        <h2>enfoco.media</h2>
        <p>contacto@enfoco.media</p>
      </div>

      {/* MAIN CARDS */}
      <div className="appleAccount__cards">
        <div className="appleCard">
          <div className="appleCard__item">Información personal</div>
          <div className="appleCard__item">Inicio de sesión y seguridad</div>
          <div className="appleCard__item">Pago y envío</div>
        </div>

        <div className="appleCard">
          <div className="appleCard__item">iCloud</div>
          <div className="appleCard__item">Familia</div>
          <div className="appleCard__item">Contenido y compras</div>
          <div className="appleCard__item appleCard__apple">
            Iniciar sesión con Apple
          </div>
        </div>
      </div>
    </div>
  );
}