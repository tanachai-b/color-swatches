import cx from "classnames";
import { ReactNode, useRef } from "react";
import { useCircularScroll } from "./useCircularScroll";
import { useKeepScrollFactors } from "./useKeepScrollFactors";
import { useMouseScroll } from "./useMouseScroll";
import { useScrollInertia } from "./useScrollInertia";

export function MouseScrollable({
  circularScrollSizeX,
  circularScrollSizeY,
  children,
}: {
  circularScrollSizeX?: number;
  circularScrollSizeY?: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { isMouseDown, onMouseDown } = useMouseScroll(ref);
  useScrollInertia({ ref, isMouseDown });
  useCircularScroll({ ref, isMouseDown, circularScrollSizeX, circularScrollSizeY });
  const { onScroll } = useKeepScrollFactors({ ref, children });

  return (
    <div
      ref={ref}
      className={cx("size-full", "overflow-auto")}
      onMouseDown={onMouseDown}
      onScroll={onScroll}
    >
      {children}
    </div>
  );
}
