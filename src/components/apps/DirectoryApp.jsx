import "./DirectoryApp.css";

const ITEMS = [
  "Admisiones",
  "Soporte Plataforma",
  "Tesorería",
  "Bienestar Estudiantil",
  "Dirección Enfoco",
];

export default function DirectoryApp() {
  return (
    <div className="directoryApp">
      <h2 className="directoryApp__title">INFORMACIÓN Y ASESORAMIENTO</h2>

      <div className="directoryApp__list">
        {ITEMS.map((item) => (
          <button key={item} className="directoryApp__card">
            <span className="directoryApp__name">{item}</span>
            <span className="directoryApp__action">Contactar</span>
          </button>
        ))}
      </div>
    </div>
  );
}