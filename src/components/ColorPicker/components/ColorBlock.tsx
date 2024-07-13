import cx from "classnames";
import { useEffect, useMemo, useRef } from "react";
import { DragArea } from "src/common-components";
import { ColorSystems } from "../ColorPicker";
import { add, getColor, round } from "../functions";
import { Thumb } from "./Thumb";

export function ColorBlock({
  system,
  precision,
  angle,
  pointer,
  onDrag,
}: {
  system: ColorSystems;
  precision: number;
  angle: number;
  pointer: { radius: number; height: number };
  onDrag: (radius: number, height: number) => void;
}) {
  const size = 125;

  const blockCanvas = useRef<HTMLCanvasElement>(null);
  const lineCanvas = useRef<HTMLCanvasElement>(null);

  const thumbPosition = useMemo(
    () => ({ x: pointer.radius * size - 5, y: (1 - pointer.height) * size - 5 }),
    [pointer],
  );

  useEffect(() => {
    if (blockCanvas.current) drawBlock(blockCanvas.current, system, precision, angle);
  }, [system, precision, angle]);

  useEffect(() => {
    if (lineCanvas.current) drawLine(lineCanvas.current, pointer);
  }, [pointer]);

  const onAreaDrag = (x: number, y: number): void => {
    const radius = Math.min(Math.max(x / size, 0), 1);
    const height = 1 - Math.min(Math.max(y / size, 0), 1);

    onDrag(radius, height);
  };

  return (
    <DragArea onDrag={onAreaDrag}>
      <div className={cx("relative")}>
        <canvas ref={blockCanvas} width={size} height={size} />

        <canvas className={cx("absolute", "inset-0")} ref={lineCanvas} width={size} height={size} />

        <Thumb {...thumbPosition} />
      </div>
    </DragArea>
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

function drawLine(canvas: HTMLCanvasElement, pointer: { radius: number; height: number }) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const dimension = Math.min(canvas.width, canvas.height);

  ctx.clearRect(0, 0, dimension, dimension);

  if (dimension * pointer.radius > 5) {
    stroke(ctx, dimension * (1 - pointer.height), 0, dimension * pointer.radius - 6);
  }
  if (dimension - dimension * pointer.radius > 5) {
    stroke(ctx, dimension * (1 - pointer.height), dimension * pointer.radius + 5, dimension);
  }
}

function stroke(ctx: CanvasRenderingContext2D, y: number, x1: number, x2: number) {
  const offset = { x: 0.5, y: 0.5 };

  const p1 = add(round({ x: x1, y }), offset);
  const p2 = add(round({ x: x2, y }), offset);

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
