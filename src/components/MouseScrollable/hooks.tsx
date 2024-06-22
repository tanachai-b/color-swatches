import { RefObject, useEffect, useState } from "react";

export function useScrollSpeed(ref: RefObject<HTMLDivElement>) {
  const [lastPosition, setLastPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const [scrollSpeed, setScrollSpeed] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useInterval(() => {
    if (ref.current == null) return;

    const { scrollLeft, scrollTop } = ref.current;

    setScrollSpeed({
      x: scrollLeft - lastPosition.x,
      y: scrollTop - lastPosition.y,
    });

    setLastPosition({ x: scrollLeft, y: scrollTop });
  }, 1000 / 60);

  return scrollSpeed;
}

export function useScrollInertia({
  ref,
  mouseDown,
}: {
  ref: RefObject<HTMLDivElement>;
  mouseDown: boolean;
}) {
  const [scrollInertia, setScrollInertia] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useInterval(() => {
    if (ref.current == null) return;

    if (!mouseDown) {
      ref.current.scrollTo({
        left: ref.current.scrollLeft + Math.round(scrollInertia.x),
        top: ref.current.scrollTop + Math.round(scrollInertia.y),
      });

      setScrollInertia({
        x: scrollInertia.x * 0.9,
        y: scrollInertia.y * 0.9,
      });
    }
  }, 1000 / 60);

  return setScrollInertia;
}

export function useInterval(handler: () => void, timeout: number) {
  const [triggered, triggers] = useState({});

  useEffect(() => {
    const interval = setInterval(() => triggers({}), timeout);
    return () => clearInterval(interval);
  }, []);

  useEffect(handler, [triggered]);
}
