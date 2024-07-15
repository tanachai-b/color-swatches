import cx from "classnames";
import { useEffect, useMemo, useRef } from "react";
import { DragArea } from "src/common-components";
import { add, convertToHex, convertToRgb, multiply, round } from "src/common-functions";
import { Thumb } from "./Thumb";

export function ColorBlock({
  precision,
  angle,
  pointer,
  onDrag,
}: {
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
    if (blockCanvas.current) drawBlock(blockCanvas.current, precision, angle);
  }, [precision, angle]);

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

        <canvas
          className={cx("absolute", "left-0", "top-0")}
          ref={lineCanvas}
          width={size}
          height={size}
        />

        <Thumb {...thumbPosition} />
      </div>
    </DragArea>
  );
}

function drawBlock(canvas: HTMLCanvasElement, precision: number, angle: number) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const dimension = Math.min(canvas.width, canvas.height);

  ctx.clearRect(0, 0, dimension, dimension);

  for (let x = 0; x < dimension; x += 1) {
    for (let y = 0; y < dimension; y += 1) {
      const x1 = x / dimension;
      const y1 = 1 - y / dimension;

      // const color = convertToHex(
      //   round(multiply(add(multiply(convertToRgb(angle), x1), 1 - x1), y1), precision),
      // );

      // const color = convertToHex(
      //   round(
      //     add(
      //       multiply(
      //         add(multiply(convertToRgb(angle), x1), (1 - x1) / 2),
      //         1 - Math.abs(y1 * 2 - 1),
      //       ),
      //       Math.max(y1 * 2 - 1, 0),
      //     ),
      //     precision,
      //   ),
      // );

      const color = convertToHex(
        round(add(multiply(convertToRgb(angle), x1), y1 * (1 - x1)), precision),
      );

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
  ctx.lineCap = "round";

  ctx.lineWidth = 3;
  ctx.strokeStyle = "#ffffff";
  ctx.beginPath();
  ctx.moveTo(x1 + 0.5, y + 0.5);
  ctx.lineTo(x2 + 0.5, y + 0.5);
  ctx.stroke();

  ctx.lineWidth = 1;
  ctx.strokeStyle = "#000000";
  ctx.beginPath();
  ctx.moveTo(x1 + 0.5, y + 0.5);
  ctx.lineTo(x2 + 0.5, y + 0.5);
  ctx.stroke();
}