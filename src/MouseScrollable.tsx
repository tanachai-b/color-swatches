import { ReactNode, useEffect, useRef, useState } from "react";

export function MouseScrollable({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const [mouseDown, setMouseDown] = useState<boolean>(false);

  const [lastX, setLastX] = useState<number>(0);
  const [lastY, setLastY] = useState<number>(0);
  const [vx, setVx] = useState<number>(0);
  const [vy, setVy] = useState<number>(0);

  useInterval(() => {
    if (mouseDown) {
      setVx(((ref.current?.scrollLeft ?? 0) - lastX) / 2);
      setVy(((ref.current?.scrollTop ?? 0) - lastY) / 2);
      setLastX(ref.current?.scrollLeft ?? 0);
      setLastY(ref.current?.scrollTop ?? 0);
    }
  }, 1000 / 30);

  useInterval(() => {
    if (!mouseDown) {
      setVx((vx) => (Math.abs(vx) * 0.95 < 1 ? 0 : vx * 0.95));
      setVy((vy) => (Math.abs(vy) * 0.95 < 1 ? 0 : vy * 0.95));
      ref.current?.scrollTo({
        left: ref.current.scrollLeft + vx,
        top: ref.current.scrollTop + vy,
      });
    }
  }, 1000 / 60);

  return (
    <div
      ref={ref}
      className={className}
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={() => setMouseDown(false)}
      onMouseLeave={() => setMouseDown(false)}
      onMouseMove={(e) => {
        if (mouseDown) {
          ref.current?.scrollTo({
            left: ref.current.scrollLeft - e.movementX,
            top: ref.current.scrollTop - e.movementY,
          });
        }
      }}
    >
      {children}
    </div>
  );
}

function useInterval(handler: () => void, timeout: number) {
  const [triggered, triggers] = useState({});

  useEffect(() => {
    setInterval(() => triggers({}), timeout);
  }, []);

  useEffect(handler, [triggered]);
}
