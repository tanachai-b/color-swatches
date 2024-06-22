import {
  MouseEvent,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

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

function useScrollSpeed(ref: RefObject<HTMLDivElement>) {
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

function useScrollInertia({
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

function useInterval(handler: () => void, timeout: number) {
  const [triggered, triggers] = useState({});

  useEffect(() => {
    const interval = setInterval(() => triggers({}), timeout);
    return () => clearInterval(interval);
  }, []);

  useEffect(handler, [triggered]);
}
