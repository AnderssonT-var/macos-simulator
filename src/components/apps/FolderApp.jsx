import "./FolderApp.css";

export default function FolderApp() {
  return (
    <div className="folderApp">
      {/* Sidebar */}
      <aside className="folderApp__sidebar">
        <div className="folderApp__section active">Información</div>
        <div className="folderApp__section">Aplicaciones</div>
        <div className="folderApp__section">Producciones</div>
        <div className="folderApp__section">Normativas</div>
        <div className="folderApp__section">Rendición de Cuentas</div>
        <div className="folderApp__section">PEDI y POA</div>
        <div className="folderApp__section">Política de Calidad</div>
      </aside>

      {/* Content */}
      <section className="folderApp__content">
        <div className="folderApp__grid">
          <div className="folderApp__card">¿Quiénes Somos?</div>
          <div className="folderApp__card">Historia </div>
          <div className="folderApp__card">Nosotros </div>
          <div className="folderApp__card">Ubicación </div>
        </div>
      </section>
    </div>
  );
}