import { MouseEvent, MouseEventHandler, ReactNode, useState } from "react";

export function Clickable({
  onClick,
  children,
}: {
  onClick: MouseEventHandler<HTMLDivElement>;
  children: ReactNode;
}) {
  const [mouseDownEvent, setMouseDownEvent] = useState<MouseEvent>();

  return (
    <div
      onMouseDown={setMouseDownEvent}
      onClick={(e) => {
        if (mouseDownEvent == null) {
          onClick(e);
        } else {
          if (
            Math.abs(e.clientX - mouseDownEvent.clientX) < 10 &&
            Math.abs(e.clientY - mouseDownEvent.clientY) < 10
          ) {
            onClick(e);
          }
        }
      }}
    >
      {children}
    </div>
  );
}
