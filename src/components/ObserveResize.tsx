import { CSSProperties, ReactNode, useEffect, useRef } from "react";

export function ObserveResize({
  className,
  style,
  onResize,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  onResize?: (boundingClientRect: DOMRect) => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (!ref.current) return;
      onResize?.(ref.current.getBoundingClientRect());
    });

    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, [onResize]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
