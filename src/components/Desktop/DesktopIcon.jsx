import "./DesktopIcon.css";
import Draggable from "react-draggable";
import { useRef } from "react";

export default function DesktopIcon({
  icon,
  label,
  onOpen,
  defaultPosition = { x: 0, y: 0 }
}) {
  const nodeRef = useRef(null);

  return (
    <Draggable nodeRef={nodeRef} bounds="parent" defaultPosition={defaultPosition}>
      <div
        ref={nodeRef}
        className="desktopIcon"
        onDoubleClick={(e) => {
          e.stopPropagation();
          onOpen?.();
        }}
      >
        <img src={icon} alt={label} draggable={false} />
        <span>{label}</span>
      </div>
    </Draggable>
  );
}