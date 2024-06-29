import cx from "classnames";
import { ReactNode } from "react";

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
      <div className={cx("grid", "grid-flow-row", "grid-cols-[auto,1fr,auto]", "gap-[10px]")}>
        <Label>Red</Label>
        <Bar value={r / 255} />
        <Value value={r} isInteger={true} />

        <Label>Green</Label>
        <Bar value={g / 255} />
        <Value value={g} isInteger={true} />

        <Label>Blue</Label>
        <Bar value={b / 255} />
        <Value value={b} isInteger={true} />
      </div>

      <div className={cx("grid", "grid-flow-row", "grid-cols-[auto,1fr,auto]", "gap-[10px]")}>
        <Label>Hue</Label>
        <Bar value={h / 360} />
        <Value value={h} unit={"°"} />

        <Label>Saturation</Label>
        <Bar value={s / 100} />
        <Value value={s} unit={"%"} />

        <Label>Brightness</Label>
        <Bar value={v / 100} />
        <Value value={v} unit={"%"} />
      </div>
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <div className={cx("w-[9ch]", "text-right")}>{children}</div>;
}

function Bar({ value }: { value: number }) {
  return (
    <div className={cx("grid", "items-center", "relative")}>
      <div className={cx("w-full", "h-[5px]", "bg-[#ffffff10]", "rounded-full")} />
      <div
        className={cx(
          "absolute",
          "w-full",
          "h-[5px]",
          "bg-[#ffffff60]",
          "rounded-full",
          "transition-all",
        )}
        style={{ width: `${value * 100}%` }}
      />
    </div>
  );
}

function Value({ value, isInteger, unit }: { value: number; isInteger?: boolean; unit?: string }) {
  const fix = value.toFixed(1).split(".");
  const num = fix[0];
  const dec = fix[1];

  return (
    <div className={cx("flex", "flex-row")}>
      <div className={cx("w-[3ch]", "text-right")}>{num}</div>

      <div className={cx("w-[2ch]", "text-left")}>{!isInteger ? `.${dec}` : ""}</div>

      <div className={cx("w-[1.5ch]")}>{unit}</div>
    </div>
  );
}

function rgb(hex: string) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  return { r, g, b };
}

function hsv(hex: string) {
  const { r, g, b } = rgb(hex);

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  let h = 0;
  if (r === g && g === b) {
    h = 0;
  } else if (r === max) {
    h = hsvSection(r, b, g);
  } else if (g === max) {
    h = 120 + hsvSection(g, r, b);
  } else if (b === max) {
    h = 240 + hsvSection(b, g, r);
  }
  h = (h + 360) % 360;

  const s = ((max - min) / (max || 1)) * 100;
  const v = (max / 255) * 100;

  return { h, s, v };

  function hsvSection(max: number, desc: number, asc: number) {
    if (desc > asc) {
      return ((desc - asc) / (max - asc)) * -60;
    } else {
      return ((asc - desc) / (max - desc)) * 60;
    }
  }
}
