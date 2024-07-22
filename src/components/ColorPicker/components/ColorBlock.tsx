import cx from "classnames";
import { useEffect, useRef } from "react";
import { Draggable } from "src/common-components";
import { ColorSystems } from "../ColorPicker";
import { getColor } from "../functions";

export function ColorBlock({
  system,
  precision,
  angle,
  pointer,
  onDrag,
  onDragStop,
}: {
  system: ColorSystems;
  precision: number;
  angle: number;
  pointer: { radius: number; height: number };
  onDrag: (radius: number, height: number) => void;
  onDragStop: () => void;
}) {
  const size = 125;

  const blockCanvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (blockCanvas.current) drawBlock(blockCanvas.current, system, precision, angle);
  }, [system, precision, angle]);

  function onAreaDrag(x: number, y: number): void {
    const radius = Math.min(Math.max(x / size, 0), 1);
    const height = 1 - Math.min(Math.max(y / size, 0), 1);

    onDrag(radius, height);
  }

  return (
    <Draggable onDrag={onAreaDrag} onDragStop={onDragStop}>
      <div className={cx("relative")}>
        <canvas ref={blockCanvas} width={size} height={size} />

        <Line size={size} pointer={pointer} />
      </div>
    </Draggable>
  );
}

function drawBlock(
  canvas: HTMLCanvasElement,
  system: ColorSystems,
  precision: number,
  angle: number,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const dimension = Math.min(canvas.width, canvas.height);

  ctx.clearRect(0, 0, dimension, dimension);

  for (let x = 0; x < dimension; x += 1) {
    for (let y = 0; y < dimension; y += 1) {
      const radius = x / dimension;
      const height = 1 - y / dimension;

      const color = getColor(system, angle, radius, height, precision);

      ctx.fillStyle = color;
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

function Line({
  size,
  pointer: { radius, height },
}: {
  size: number;
  pointer: { radius: number; height: number };
}) {
  return (
    <svg
      className={cx("absolute", "inset-0")}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {radius * size - 5 > 0 && (
        <>
          <line
            x1={0}
            y1={(1 - height) * size}
            x2={radius * size - 5}
            y2={(1 - height) * size}
            stroke="white"
            strokeWidth={3}
            strokeLinecap="round"
          />
          <line
            x1={0}
            y1={(1 - height) * size}
            x2={radius * size - 5}
            y2={(1 - height) * size}
            stroke="black"
            strokeWidth={1}
            strokeLinecap="round"
          />
        </>
      )}

      {radius * size + 5 < size && (
        <>
          <line
            x1={radius * size + 5}
            y1={(1 - height) * size}
            x2={size}
            y2={(1 - height) * size}
            stroke="white"
            strokeWidth={3}
            strokeLinecap="round"
          />
          <line
            x1={radius * size + 5}
            y1={(1 - height) * size}
            x2={size}
            y2={(1 - height) * size}
            stroke="black"
            strokeWidth={1}
            strokeLinecap="round"
          />
        </>
      )}

      <circle
        cx={radius * size}
        cy={(1 - height) * size}
        r="5"
        fill="none"
        stroke="white"
        strokeWidth={3}
      />
      <circle
        cx={radius * size}
        cy={(1 - height) * size}
        r="5"
        fill="none"
        stroke="black"
        strokeWidth={1}
      />
    </svg>
  );
}
