import { MouseEvent, ReactNode, useRef, useState } from "react";
import { useInterval, useScrollInertia } from "./hooks";

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

  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  useScrollInertia({ ref, isMouseDown });

  function onMouseMove(e: MouseEvent) {
    if (isMouseDown) {
      ref.current?.scrollTo({
        left: ref.current.scrollLeft - e.movementX,
        top: ref.current.scrollTop - e.movementY,
      });
    }
  }

  useInterval(() => {
    if (isMouseDown) return;

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
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
      onMouseLeave={() => setIsMouseDown(false)}
      onMouseMove={onMouseMove}
    >
      {children}
    </div>
  );
}
