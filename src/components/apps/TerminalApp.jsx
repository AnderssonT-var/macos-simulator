import "./TerminalApp.css";

export default function TerminalApp() {

  return (

    <div className="terminalApp">

      <div className="terminalSidebar">

        <h3>Tras Cámaras</h3>

        <ul>
          <li className="active">Videos</li>
          <li>Fotos</li>
          <li>Clips</li>
        </ul>

      </div>

      <div className="terminalContent">

        <h2>Tras Cámaras</h2>

        <div className="terminalGrid">

          <div className="terminalCard">Clip 1</div>
          <div className="terminalCard">Clip 2</div>
          <div className="terminalCard">Clip 3</div>
          <div className="terminalCard">Clip 4</div>

        </div>

      </div>

    </div>

  );

}