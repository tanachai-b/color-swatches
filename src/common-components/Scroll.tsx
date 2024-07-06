import cx from "classnames";
import React, { useEffect, useState } from "react";
import { ObserveResize } from ".";

export function Scroll({
  scroll,
  onChange,
}: {
  scroll: number;
  onChange: (value: number) => void;
}) {
  const [trackLeft, setTrackLeft] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);

  const [isPointerDown, setIsPointerDown] = useState(false);
  const [thumbLeft, setThumbLeft] = useState(0);

  useEffect(() => setThumbLeft(trackWidth * scroll), [scroll, trackWidth]);

  const onResize = ({ left, width }: DOMRect): void => {
    setTrackLeft(left);
    setTrackWidth(width - 20);
  };

  useEffect(() => {
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
    };
  }, [trackLeft, trackWidth, isPointerDown, thumbLeft]);

  function onTrackPointerDown(e: React.PointerEvent) {
    setIsPointerDown(true);
    moveThumb(e.clientX);
  }

  function onPointerMove(e: PointerEvent) {
    if (isPointerDown) moveThumb(e.clientX);
  }

  function onPointerUp() {
    setIsPointerDown(false);
  }

  function moveThumb(thumbLeft: number) {
    const left = thumbLeft - trackLeft - 10;
    const newLeft = Math.max(Math.min(left, trackWidth), 0);
    onChange(newLeft / trackWidth);
  }

  return (
    <div
      className={cx(
        "w-full",
        "h-[20px]",

        "bg-[grey]",

        "touch-none",
      )}
      onPointerDown={onTrackPointerDown}
    >
      <ObserveResize onResize={onResize}>
        <div
          className={cx("w-[20px]", "h-[20px]", "bg-[white]", "relative")}
          style={{ left: `${thumbLeft}px` }}
        />
      </ObserveResize>
    </div>
  );
}
