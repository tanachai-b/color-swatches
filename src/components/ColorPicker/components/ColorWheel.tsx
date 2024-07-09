import cx from "classnames";
import { useEffect, useMemo, useRef } from "react";
import { DragArea } from "src/common-components";
import { add, convertToHex, convertToRgb, multiply, round } from "src/common-functions";
import { Thumb } from "./Thumb";

export function ColorWheel({
  precision,
  height,
  pointer,
  onDrag,
}: {
  precision: number;
  height: number;
  pointer: { angle: number; radius: number };
  onDrag: (angle: number, radius: number) => void;
}) {
  const size = 250;
  const center = size / 2;

  const ref = useRef<HTMLCanvasElement>(null);

  const thumbPosition = useMemo(
    () => ({
      x: center + pointer.radius * Math.sin(pointer.angle * 2 * Math.PI) * center - 5,
      y: center + -pointer.radius * Math.cos(pointer.angle * 2 * Math.PI) * center - 5,
    }),
    [pointer],
  );

  useEffect(() => {
    if (ref.current) drawCanvas(ref.current, precision, height);
  }, [precision, height]);

  const onAreaDrag = (x0: number, y0: number): void => {
    const x = x0 - center;
    const y = y0 - center;

    const radius = Math.min(Math.hypot(x, y) / center, 1);
    const angle = ((Math.atan2(y, x) + Math.PI / 2) / (2 * Math.PI) + 1) % 1;

    onDrag(angle, radius);
  };

  return (
    <DragArea onDrag={onAreaDrag}>
      <div className={cx("relative")}>
        <canvas ref={ref} width={size} height={size} />

        <Thumb {...thumbPosition} />
      </div>
    </DragArea>
  );
}

function drawCanvas(canvas: HTMLCanvasElement, precision: number, height: number) {
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

      // const color = convertToHex(
      //   round(
      //     multiply(add(multiply(convertToRgb(angle), radius), (1 - radius) * 1), height),
      //     precision,
      //   ),
      // );

      // const color = convertToHex(
      //   round(
      //     add(
      //       multiply(
      //         add(multiply(convertToRgb(angle), radius), (1 - radius) / 2),
      //         1 - Math.abs(height - 0.5) * 2,
      //       ),
      //       Math.max(height * 2 - 1, 0),
      //     ),
      //     precision,
      //   ),
      // );

      // const color = convertToHex(
      //   round(
      //     add(
      //       multiply(
      //         add(multiply(convertToRgb(angle), height), (1 - height) / 2),
      //         -Math.abs(radius - 0.5) * 2 + 1,
      //       ),
      //       Math.max(-radius * 2 + 1, 0),
      //     ),
      //     precision,
      //   ),
      // );

      const color = convertToHex(
        round(add(multiply(convertToRgb(angle), radius), (1 - radius) * height), precision),
      );

      // const color = convertToHex(
      //   round(
      //     add(
      //       multiply(
      //         add(multiply(convertToRgb(angle), height), (1 - height) / 2),
      //         (-Math.abs(radius - 0.5) * 2 + 1) * (1 - height) + height,
      //       ),
      //       Math.max(-radius * 2 + 1, 0) * (1 - height),
      //     ),
      //     precision,
      //   ),
      // );

      ctx.fillStyle = color;
      ctx.fillRect(x, y, pixel, pixel);
    }
  }
}
