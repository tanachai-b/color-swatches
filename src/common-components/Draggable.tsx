import { ReactNode, useEffect, useRef, useState } from "react";

export function Draggable({
  className,
  onDrag,
  onDragStart,
  onDragStop,
  children,
}: {
  className?: string;
  onDrag: ({
    x,
    y,
    dx,
    dy,
    cx,
    cy,
  }: {
    x: number;
    y: number;
    dx: number;
    dy: number;
    cx: number;
    cy: number;
  }) => void;
  onDragStart?: () => void;
  onDragStop?: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const [isPointerDown, setIsPointerDown] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isPointerDown) {
      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", onPointerUp);

      return () => {
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", onPointerUp);
      };
    }
  }, [isPointerDown, onPointerMove, onPointerUp]);

  function onPointerDown({ clientX, clientY }: React.PointerEvent) {
    setIsPointerDown(true);
    setLastPosition({ x: clientX, y: clientY });
    onDragStart?.();
  }

  function onPointerMove({ clientX, clientY }: PointerEvent) {
    drag(clientX, clientY);
    setLastPosition({ x: clientX, y: clientY });
  }

  function onPointerUp({ clientX, clientY }: PointerEvent) {
    setIsPointerDown(false);
    drag(clientX, clientY);
    onDragStop?.();
  }

  function drag(clientX: number, clientY: number) {
    const { x: rx = 0, y: ry = 0 } = ref.current?.getBoundingClientRect() ?? {};
    onDrag({
      x: clientX - rx,
      y: clientY - ry,
      dx: clientX - lastPosition.x,
      dy: clientY - lastPosition.y,
      cx: clientX,
      cy: clientY,
    });
  }

  return (
    <div ref={ref} className={className} onPointerDown={onPointerDown}>
      {children}
    </div>
  );
}
