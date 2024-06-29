import cx from "classnames";
import { hsv, rgb } from "src/common-functions";
import { Bar, BarChart, Label, Value } from "./BarChart";

export function Detail({ color }: { color?: string }) {
  const { r, g, b } = rgb(color ?? "#000000");
  const { h, s, v } = hsv(color ?? "#000000");

  return (
    <div
      className={cx(
        "p-[20px]",
        "py-[30px]",
        "gap-[30px]",

        "flex",
        "flex-col",

        "text-[#ffffff80]",
        "text-[13px]",
      )}
    >
      <BarChart>
        <Label>Red</Label>
        <Bar value={r / 255} />
        <Value value={r} isInteger={true} />

        <Label>Green</Label>
        <Bar value={g / 255} />
        <Value value={g} isInteger={true} />

        <Label>Blue</Label>
        <Bar value={b / 255} />
        <Value value={b} isInteger={true} />
      </BarChart>

      <BarChart>
        <Label>Hue</Label>
        <Bar value={h / 360} />
        <Value value={h} unit={"°"} />

        <Label>Saturation</Label>
        <Bar value={s / 100} />
        <Value value={s} unit={"%"} />

        <Label>Brightness</Label>
        <Bar value={v / 100} />
        <Value value={v} unit={"%"} />
      </BarChart>
    </div>
  );
}
