import "./PvZApp.css";

export default function PvZApp() {
  return (
    <div className="pvzApp">
      <iframe
        src="https://pvz.ee/"
        title="Plants vs Zombies"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
}