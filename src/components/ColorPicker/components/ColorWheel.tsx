import cx from "classnames";
import { useEffect, useMemo, useRef } from "react";
import { Draggable } from "src/common-components";
import { ColorSystems } from "../ColorPicker";
import { getColor } from "../functions";
import { Thumb } from "./Thumb";

export function ColorWheel({
  system,
  precision,
  height,
  pointer,
  onDrag,
  onDragStop,
}: {
  system: ColorSystems;
  precision: number;
  height: number;
  pointer: { angle: number; radius: number };
  onDrag: (angle: number, radius: number) => void;
  onDragStop: () => void;
}) {
  const size = 250;
  const center = size / 2;

  const wheelCanvas = useRef<HTMLCanvasElement>(null);

  const thumbPosition = useMemo(
    () => ({
      x: center + pointer.radius * center * Math.sin(pointer.angle * 2 * Math.PI) - 5,
      y: center - pointer.radius * center * Math.cos(pointer.angle * 2 * Math.PI) - 5,
    }),
    [pointer],
  );

  useEffect(() => {
    if (wheelCanvas.current) drawWheel(wheelCanvas.current, system, precision, height);
  }, [system, precision, height]);

  function onAreaDrag(x0: number, y0: number): void {
    const x = x0 - center;
    const y = y0 - center;

    const radius = Math.min(Math.hypot(x, y) / center, 1);
    const angle = ((Math.atan2(y, x) + Math.PI / 2) / (2 * Math.PI) + 1) % 1;

    onDrag(angle, radius);
  }

  return (
    <Draggable onDrag={onAreaDrag} onDragStop={onDragStop}>
      <div className={cx("relative")}>
        <div className={cx("rounded-full", "overflow-clip")}>
          <canvas ref={wheelCanvas} width={size} height={size} />
        </div>

        <Line size={size} pointer={pointer} />

        <Thumb {...thumbPosition} />
      </div>
    </Draggable>
  );
}

function drawWheel(
  canvas: HTMLCanvasElement,
  system: ColorSystems,
  precision: number,
  height: number,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const pixel = 1;

  const dimension = Math.min(canvas.width, canvas.height);
  const center = dimension / 2;

  ctx.clearRect(0, 0, dimension, dimension);

  for (let x = 0; x < dimension + 0; x += pixel) {
    for (let y = 0; y < dimension + 0; y += pixel) {
      if ((x - center) ** 2 + (y - center) ** 2 > (center + pixel * 2) ** 2) continue;

      const angle = Math.atan2(y - center, x - center) / (2 * Math.PI) + 1.25;
      const radius = Math.min(Math.hypot(x - center, y - center) / center, 1);

      const color = getColor(system, angle, radius, height, precision);

      ctx.fillStyle = color;
      ctx.fillRect(x, y, pixel, pixel);
    }
  }
}

function Line({
  size,
  pointer: { angle, radius },
}: {
  size: number;
  pointer: { angle: number; radius: number };
}) {
  const center = size / 2;

  return (
    <svg
      className={cx("absolute", "inset-0")}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1={center}
        y1={center}
        x2={center + (radius * center - 5) * Math.sin(angle * 2 * Math.PI)}
        y2={center - (radius * center - 5) * Math.cos(angle * 2 * Math.PI)}
        stroke="white"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <line
        x1={center}
        y1={center}
        x2={center + (radius * center - 5) * Math.sin(angle * 2 * Math.PI)}
        y2={center - (radius * center - 5) * Math.cos(angle * 2 * Math.PI)}
        stroke="black"
        strokeWidth={1}
        strokeLinecap="round"
      />

      <line
        x1={center + (radius * center + 5) * Math.sin(angle * 2 * Math.PI)}
        y1={center - (radius * center + 5) * Math.cos(angle * 2 * Math.PI)}
        x2={center + center * Math.sin(angle * 2 * Math.PI)}
        y2={center - center * Math.cos(angle * 2 * Math.PI)}
        stroke="white"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <line
        x1={center + (radius * center + 5) * Math.sin(angle * 2 * Math.PI)}
        y1={center - (radius * center + 5) * Math.cos(angle * 2 * Math.PI)}
        x2={center + center * Math.sin(angle * 2 * Math.PI)}
        y2={center - center * Math.cos(angle * 2 * Math.PI)}
        stroke="black"
        strokeWidth={1}
        strokeLinecap="round"
      />
    </svg>
  );
}
