import cx from "classnames";
import { ReactNode } from "react";

export function BarChart({ children }: { children: ReactNode }) {
  return (
    <div className={cx("grid", "grid-flow-row", "grid-cols-[auto,1fr,auto]", "gap-[10px]")}>
      {children}
    </div>
  );
}

export function Label({ children }: { children: ReactNode }) {
  return <div className={cx("w-[9ch]", "text-right")}>{children}</div>;
}

export function Bar({ value }: { value: number }) {
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

export function Value({
  value,
  isInteger,
  unit,
}: {
  value: number;
  isInteger?: boolean;
  unit?: string;
}) {
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
