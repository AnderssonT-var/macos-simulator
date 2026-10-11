import { useCallback, useEffect, useRef, useState } from "react";

function readCssPxVar(varName, fallbackPx) {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();

  if (!raw) return fallbackPx;
  const n = parseFloat(raw.replace("px", ""));
  return Number.isFinite(n) ? n : fallbackPx;
}

export function useWindowDrag({
  initialX = 120,
  initialY = 120,
  width = 560,
  edgePadding = 120,
  overflow = 30,
  containerRef = null,
  disabled = false,
} = {}) {
  const [pos, setPos] = useState({ x: initialX, y: initialY });

  const draggingRef = useRef(false);
  const pointerIdRef = useRef(null);

  const startRef = useRef({ x: 0, y: 0 });
  const originRef = useRef({ x: initialX, y: initialY });

  const clamp = useCallback(
    (x, y) => {
      let areaW = window.innerWidth;
      let areaH = window.innerHeight;

      if (containerRef?.current) {
        const r = containerRef.current.getBoundingClientRect();
        areaW = r.width;
        areaH = r.height;
      }

      const menubarH = readCssPxVar("--menubar-height", 28);

      const minX = -(width - edgePadding) - overflow;
      const maxX = areaW - edgePadding + overflow;

      const minY = menubarH;
      const maxY = areaH - edgePadding + overflow;

      return {
        x: Math.min(Math.max(x, minX), maxX),
        y: Math.min(Math.max(y, minY), maxY),
      };
    },
    [containerRef, edgePadding, overflow, width]
  );

  const onPointerMove = useCallback(
    (e) => {
      if (!draggingRef.current) return;
      if (pointerIdRef.current !== e.pointerId) return;

      const dx = e.clientX - startRef.current.x;
      const dy = e.clientY - startRef.current.y;

      const next = clamp(
        originRef.current.x + dx,
        originRef.current.y + dy
      );

      setPos(next);
    },
    [clamp]
  );

  const endDrag = useCallback((e) => {
    if (!draggingRef.current) return;
    if (pointerIdRef.current !== e.pointerId) return;

    draggingRef.current = false;
    pointerIdRef.current = null;
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
    };
  }, [onPointerMove, endDrag]);

  const onPointerDown = useCallback(
    (e) => {
      if (disabled) return;
      if (e.button !== undefined && e.button !== 0) return;

      draggingRef.current = true;
      pointerIdRef.current = e.pointerId;

      startRef.current = { x: e.clientX, y: e.clientY };
      originRef.current = { x: pos.x, y: pos.y };

      e.currentTarget.setPointerCapture?.(e.pointerId);
    },
    [pos.x, pos.y, disabled]
  );

  return {
    x: pos.x,
    y: pos.y,
    bindTitlebar: { onPointerDown },
    setPos,
  };
}