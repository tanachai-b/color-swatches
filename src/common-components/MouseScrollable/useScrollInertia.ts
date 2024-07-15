import { RefObject, useState } from "react";
import { useInterval } from "src/common-hooks";

export function useScrollInertia({
  ref,
  isMouseDown,
}: {
  ref: RefObject<HTMLDivElement>;
  isMouseDown: boolean;
}) {
  const [lastPosition, setLastPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const [scrollSpeed, setScrollSpeed] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useInterval(() => {
    if (isMouseDown) {
      if (ref.current == null) return;

      const { scrollLeft, scrollTop } = ref.current;

      setScrollSpeed({
        x: scrollLeft - lastPosition.x,
        y: scrollTop - lastPosition.y,
      });

      setLastPosition({ x: scrollLeft, y: scrollTop });
    } else {
      if (ref.current == null) return;

      ref.current.scrollTo({
        left: ref.current.scrollLeft + Math.round(scrollSpeed.x),
        top: ref.current.scrollTop + Math.round(scrollSpeed.y),
      });

      setScrollSpeed({
        x: scrollSpeed.x * 0.9,
        y: scrollSpeed.y * 0.9,
      });
    }
  }, 1000 / 60);
}
