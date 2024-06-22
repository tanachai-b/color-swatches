import { MouseEvent, ReactNode, useRef, useState } from "react";
import { useInterval, useScrollInertia, useScrollSpeed } from "./hooks";

export function MouseScrollable({
  className,
  circularScrollSizeX,
  circularScrollSizeY,
  children,
}: {
  className: string;
  circularScrollSizeX?: number;
  circularScrollSizeY?: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const [mouseDown, setMouseDown] = useState<boolean>(false);

  const scrollSpeed = useScrollSpeed(ref);
  const setScrollInertia = useScrollInertia({ ref, mouseDown });

  function onMouseDown() {
    setMouseDown(true);
  }

  function onMouseUp() {
    setMouseDown(false);
    setScrollInertia({ ...scrollSpeed });
  }

  function onMouseMove(e: MouseEvent) {
    if (mouseDown) {
      ref.current?.scrollTo({
        left: ref.current.scrollLeft - e.movementX,
        top: ref.current.scrollTop - e.movementY,
      });
    }
  }

  useInterval(() => {
    if (circularScrollSizeX != null) {
      ref.current?.scrollTo({
        left:
          (ref.current.scrollLeft % circularScrollSizeX) + circularScrollSizeX,
      });
    }
    if (circularScrollSizeY != null) {
      ref.current?.scrollTo({
        top:
          (ref.current.scrollTop % circularScrollSizeY) + circularScrollSizeY,
      });
    }
  }, 1000 / 60);

  return (
    <div
      ref={ref}
      className={className}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onMouseMove={onMouseMove}
    >
      {children}
    </div>
  );
}
