import cx from "classnames";
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
  const [area, setArea] = useState<{ x: number; y: number; width: number; height: number }>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const [isPointerDown, setIsPointerDown] = useState(false);

  useEffect(() => {
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
    };
  }, [area, isPointerDown]);

  function onPointerDown(e: React.PointerEvent) {
    setIsPointerDown(true);
    drag(e.clientX, e.clientY);
  }

  function onPointerMove(e: PointerEvent) {
    if (isPointerDown) drag(e.clientX, e.clientY);
  }

  function onPointerUp() {
    if (!isPointerDown) return;
    setIsPointerDown(false);
    onDragStop();
  }

  function drag(x: number, y: number) {
    onDrag(x - area.x, y - area.y);
  }

  return (
    <ObserveResize onResize={({ x, y, width, height }) => setArea({ x, y, width, height })}>
      <div className={cx("touch-none")} onPointerDown={onPointerDown}>
        {children}
      </div>
    </ObserveResize>
  );
}
