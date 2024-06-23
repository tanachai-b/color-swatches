import { MouseEvent, ReactNode, useRef, useState } from "react";
import { useCircularScroll } from "./useCircularScroll";
import { useScrollInertia } from "./useScrollInertia";

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
  useCircularScroll({
    ref,
    isMouseDown,
    circularScrollSizeX,
    circularScrollSizeY,
  });

  function onMouseMove(e: MouseEvent) {
    if (isMouseDown) {
      ref.current?.scrollTo({
        left: ref.current.scrollLeft - e.movementX,
        top: ref.current.scrollTop - e.movementY,
      });
    }
  }

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
