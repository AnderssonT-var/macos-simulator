import "./FolderWindow.css";

const MENU = [
  "Información",
  "Aplicaciones",
  "Producciones",
  "Normativas",
  "Rendición de Cuentas",
  "PEDI y POA",
  "Política de Calidad",
];

const CARDS = [
  { id: 1, title: "¿Quiénes Somos?", icon: "🛠️" },
  { id: 2, title: "Historia ", icon: "📜" },
  { id: 3, title: "Nosotros ", icon: "🐊" },
  { id: 4, title: "Ubicación ", icon: "📍" },
];

export default function FolderWindow() {
  return (
    <div className="folder">
      {/* Sidebar */}
      <aside className="folder__sidebar">
        {MENU.map((item) => (
          <button key={item} className="folder__menuItem">
            {item}
          </button>
        ))}
      </aside>

      {/* Content */}
      <section className="folder__content">
        <div className="folder__grid">
          {CARDS.map((card) => (
            <div key={card.id} className="folder__card">
              <div className="folder__icon">{card.icon}</div>
              <div className="folder__title">{card.title}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}