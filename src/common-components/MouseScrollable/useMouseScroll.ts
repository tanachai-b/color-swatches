import { RefObject, useEffect, useState } from "react";

export function useMouseScroll(ref: RefObject<HTMLDivElement>) {
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  function onMouseDown() {
    setIsMouseDown(true);
  }

  function onMouseMove(e: MouseEvent | React.MouseEvent) {
    if (!isMouseDown) return;

    ref.current?.scrollTo({
      left: ref.current.scrollLeft - e.movementX,
      top: ref.current.scrollTop - e.movementY,
    });
  }

  function onMouseUp() {
    setIsMouseDown(false);
  }

  return { isMouseDown, onMouseDown };
}
