import { ReactNode, useEffect, useState } from "react";
import { ObserveResize } from "src/common-components";

export function DragArea({
  onDrag,
  onDragStop,
  children,
}: {
  onDrag: (x: number, y: number) => void;
  onDragStop: () => void;
  children: ReactNode;
}) {
  const [area, setArea] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const [isPointerDown, setIsPointerDown] = useState(false);

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

  function onPointerDown(e: React.PointerEvent) {
    setIsPointerDown(true);
    drag(e.clientX, e.clientY);
  }

  function onPointerMove(e: PointerEvent) {
    drag(e.clientX, e.clientY);
  }

  function onPointerUp() {
    setIsPointerDown(false);
    onDragStop();
  }

  function drag(x: number, y: number) {
    onDrag(x - area.x, y - area.y);
  }

  return (
    <ObserveResize onResize={({ x, y }) => setArea({ x, y })}>
      <div onPointerDown={onPointerDown}>{children}</div>
    </ObserveResize>
  );
}
