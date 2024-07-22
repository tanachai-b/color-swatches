import cx from "classnames";
import { useEffect, useMemo, useRef } from "react";
import { DragArea } from "src/common-components";
import { ColorSystems } from "../ColorPicker";
import { add, getColor, getXY, round } from "../functions";
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
  const lineCanvas = useRef<HTMLCanvasElement>(null);

  const thumbPosition = useMemo(
    () => ({
      x: center + pointer.radius * Math.sin(pointer.angle * 2 * Math.PI) * center - 5,
      y: center + -pointer.radius * Math.cos(pointer.angle * 2 * Math.PI) * center - 5,
    }),
    [pointer],
  );

  useEffect(() => {
    if (wheelCanvas.current) drawWheel(wheelCanvas.current, system, precision, height);
  }, [system, precision, height]);

  useEffect(() => {
    if (lineCanvas.current) drawLine(lineCanvas.current, pointer);
  }, [pointer]);

  function onAreaDrag(x0: number, y0: number): void {
    const x = x0 - center;
    const y = y0 - center;

    const radius = Math.min(Math.hypot(x, y) / center, 1);
    const angle = ((Math.atan2(y, x) + Math.PI / 2) / (2 * Math.PI) + 1) % 1;

    onDrag(angle, radius);
  }

  return (
    <DragArea onDrag={onAreaDrag} onDragStop={onDragStop}>
      <div className={cx("relative")}>
        <canvas ref={wheelCanvas} width={size} height={size} />

        <canvas className={cx("absolute", "inset-0")} ref={lineCanvas} width={size} height={size} />

        <Thumb {...thumbPosition} />
      </div>
    </DragArea>
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

  ctx.beginPath();
  ctx.arc(center, center, center, 0, Math.PI * 2);
  ctx.clip();

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

function drawLine(canvas: HTMLCanvasElement, pointer: { angle: number; radius: number }) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const dimension = Math.min(canvas.width, canvas.height);
  const center = dimension / 2;

  ctx.clearRect(0, 0, dimension, dimension);

  ctx.beginPath();
  ctx.arc(center, center, center, 0, Math.PI * 2);
  ctx.clip();

  if (center * pointer.radius > 5) {
    stroke(ctx, center, pointer.angle, 0, center * pointer.radius - 6);
  }
  if (center - center * pointer.radius > 5) {
    stroke(ctx, center, pointer.angle, center * pointer.radius + 5, center);
  }
}

function stroke(ctx: CanvasRenderingContext2D, center: number, a: number, r1: number, r2: number) {
  const cen = { x: center, y: center };
  const offset = { x: 0.5, y: 0.5 };

  const p1 = add(round(add(getXY(r1, a * 2 * Math.PI), cen)), offset);
  const p2 = add(round(add(getXY(r2, a * 2 * Math.PI), cen)), offset);

  ctx.lineCap = "round";

  ctx.lineWidth = 3;
  ctx.strokeStyle = "#ffffff";
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();

  ctx.lineWidth = 1;
  ctx.strokeStyle = "#000000";
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
}
