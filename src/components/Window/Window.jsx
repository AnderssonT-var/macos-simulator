import "./Window.css";
import { LuX, LuMinus, LuPlus } from "react-icons/lu";
import { useWindowDrag } from "../../hooks/useWindowDrag";
import { useEffect, useState } from "react";

const MENU_BAR_HEIGHT = 32;
const DOCK_HEIGHT = 90;

/* tamaño estándar */
const DEFAULT_WIDTH = 960;
const DEFAULT_HEIGHT = 620;

export default function Window({
  children,
  title = "Ventana",
  stageRef,
  minimized = false,
  onClose,
  onMinimize,
  isActive = false,
  zIndex = 1,
  onFocus,
}) {

  const [isMaximized, setIsMaximized] = useState(false);

  const [animateOpen, setAnimateOpen] = useState(true);

  const [restoreAnim, setRestoreAnim] = useState(false);

  const [resizeSize, setResizeSize] = useState({
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  });

  /* calcular tamaño inicial */
  useEffect(() => {

    const vh = window.innerHeight - MENU_BAR_HEIGHT - DOCK_HEIGHT;

    setResizeSize({
      width: Math.min(DEFAULT_WIDTH, window.innerWidth * 0.9),
      height: Math.min(DEFAULT_HEIGHT, vh * 0.9)
    });

  }, []);

  /* quitar animación abrir */
  useEffect(() => {

    const timer = setTimeout(() => {
      setAnimateOpen(false);
    }, 260);

    return () => clearTimeout(timer);

  }, []);

  /* animación restaurar */
  useEffect(() => {

    if (!minimized) {

      setRestoreAnim(true);

      const t = setTimeout(() => {
        setRestoreAnim(false);
      }, 220);

      return () => clearTimeout(t);

    }

  }, [minimized]);



  /* POSICIÓN INICIAL CENTRADA (fix bug esquina) */

  const initialX = (window.innerWidth - resizeSize.width) / 2;
  const initialY = MENU_BAR_HEIGHT + 10;



  const drag = useWindowDrag({
    initialX,
    initialY,
    width: resizeSize.width,
    edgePadding: 20,
    overflow: 20,
    containerRef: stageRef,
    disabled: isMaximized,
  });



  const startResize = (direction, e) => {

    e.preventDefault();

    const startX = e.clientX;
    const startY = e.clientY;

    const startWidth = resizeSize.width;
    const startHeight = resizeSize.height;

    const onMouseMove = (ev) => {

      let newWidth = startWidth;
      let newHeight = startHeight;

      if(direction.includes("right")){
        newWidth = startWidth + (ev.clientX - startX);
      }

      if(direction.includes("bottom")){
        newHeight = startHeight + (ev.clientY - startY);
      }

      if(direction.includes("left")){
        newWidth = startWidth - (ev.clientX - startX);
      }

      if(direction.includes("top")){
        newHeight = startHeight - (ev.clientY - startY);
      }

      setResizeSize({
        width: Math.max(newWidth, 320),
        height: Math.max(newHeight, 220)
      });

    };

    const onMouseUp = () => {

      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);

    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

  };



  return (
    <section
      className={[
        "window",
        animateOpen && "window--opening",
        restoreAnim && "window--restore",
        minimized && "window--minimized",
        isMaximized && "window--maximized",
        isActive ? "window--active" : "window--inactive",
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        isMaximized
          ? {
              width: "100%",
              height: `calc(100% - ${MENU_BAR_HEIGHT + DOCK_HEIGHT}px)`,
              top: `${MENU_BAR_HEIGHT}px`,
              left: 0,
              transform: "translate(0,0)",
              zIndex,
            }
          : {
              width: resizeSize.width,
              height: resizeSize.height,
              zIndex,
              top: 0,
              left: 0,
              transform: `translate(${drag.x}px, ${drag.y}px)`,
              transition: "none",
            }
      }
      onMouseDown={(e) => {
        e.stopPropagation();
        onFocus?.();
      }}
    >

      <div className="window__frame">

        <header
          className="window__titlebar"
          {...(!isMaximized ? drag.bindTitlebar : {})}
        >

          <div className="window__traffic">

            <button
              className="window__dotBtn window__dotBtn--red"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onClose?.();
              }}
            >
              <LuX />
            </button>

            <button
              className="window__dotBtn window__dotBtn--yellow"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onMinimize?.();
              }}
            >
              <LuMinus />
            </button>

            <button
              className="window__dotBtn window__dotBtn--green"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                setIsMaximized((v) => !v);
              }}
            >
              <LuPlus />
            </button>

          </div>

          <div className="window__title">{title}</div>

          <div className="window__spacer" />

        </header>

        <div className="window__content">
          {children}
        </div>

      </div>


      {!isMaximized && (
        <>
          <div className="resize right" onMouseDown={(e)=>startResize("right",e)} />
          <div className="resize left" onMouseDown={(e)=>startResize("left",e)} />
          <div className="resize top" onMouseDown={(e)=>startResize("top",e)} />
          <div className="resize bottom" onMouseDown={(e)=>startResize("bottom",e)} />

          <div className="resize bottom-right" onMouseDown={(e)=>startResize("bottom-right",e)} />
          <div className="resize bottom-left" onMouseDown={(e)=>startResize("bottom-left",e)} />
          <div className="resize top-right" onMouseDown={(e)=>startResize("top-right",e)} />
          <div className="resize top-left" onMouseDown={(e)=>startResize("top-left",e)} />
        </>
      )}

    </section>
  );

}