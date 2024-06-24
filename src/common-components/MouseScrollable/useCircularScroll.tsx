import { RefObject } from "react";
import { useInterval } from "src/common-hooks";

export function useCircularScroll({
  ref,
  isMouseDown,
  circularScrollSizeX,
  circularScrollSizeY,
}: {
  ref: RefObject<HTMLDivElement>;
  isMouseDown: boolean;
  circularScrollSizeX?: number;
  circularScrollSizeY?: number;
}) {
  useInterval(() => {
    if (isMouseDown) return;

    if (circularScrollSizeX != null) {
      ref.current?.scrollTo({
        left: (ref.current.scrollLeft % circularScrollSizeX) + circularScrollSizeX,
      });
    }

    if (circularScrollSizeY != null) {
      ref.current?.scrollTo({
        top: (ref.current.scrollTop % circularScrollSizeY) + circularScrollSizeY,
      });
    }
  }, 1000 / 60);
}
