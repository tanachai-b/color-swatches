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

  const ref = useRef<HTMLCanvasElement>(null);

  const thumbPosition = useMemo(
    () => ({ x: pointer.radius * size - 5, y: (1 - pointer.height) * size - 5 }),
    [pointer],
  );

  useEffect(() => {
    if (ref.current) drawCanvas(ref.current, precision, angle);
  }, [precision, angle]);

  const onAreaDrag = (x: number, y: number): void => {
    const radius = Math.min(Math.max(x / size, 0), 1);
    const height = 1 - Math.min(Math.max(y / size, 0), 1);

    onDrag(radius, height);
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

function drawCanvas(canvas: HTMLCanvasElement, precision: number, angle: number) {
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
