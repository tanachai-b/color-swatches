import { ReactNode, RefObject, UIEvent, useEffect, useState } from "react";

export function useKeepScrollFactors({
  ref,
  children,
}: {
  ref: RefObject<HTMLDivElement>;
  children: ReactNode;
}) {
  const [scrollFactors, setScrollFactors] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (ref.current == null) return;

    ref.current.scrollTo({
      left: ref.current.scrollWidth * scrollFactors.x - ref.current.clientWidth / 2,
      top: ref.current.scrollHeight * scrollFactors.y - ref.current.clientHeight / 2,
    });
  }, [children]);

  function onScroll(e: UIEvent) {
    const { scrollWidth, scrollHeight, scrollLeft, scrollTop, clientWidth, clientHeight } =
      e.target as HTMLDivElement;

    setScrollFactors({
      x: (scrollLeft + clientWidth / 2) / scrollWidth,
      y: (scrollTop + clientHeight / 2) / scrollHeight,
    });
  }

  return { onScroll };
}
