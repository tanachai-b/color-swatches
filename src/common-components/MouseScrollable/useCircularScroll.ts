import { RefObject, useEffect } from "react";
import { useTrigger } from "src/common-hooks";

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
  const trigger = useTrigger(() => {
    if (ref.current == null) return;
    if (isMouseDown) return;

    if (circularScrollSizeX != null) {
      ref.current.scrollTo({
        left: (ref.current.scrollLeft % circularScrollSizeX) + circularScrollSizeX,
      });
    }

    if (circularScrollSizeY != null) {
      ref.current.scrollTo({
        top: (ref.current.scrollTop % circularScrollSizeY) + circularScrollSizeY,
      });
    }
  });

  useEffect(() => {
    const interval = setInterval(trigger, 1000 / 60);
    return () => clearInterval(interval);
  }, []);
}
