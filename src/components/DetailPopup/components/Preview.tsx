import cx from "classnames";
import { getTextColor } from "src/common-functions";

export function Preview({ color }: { color?: string }) {
  return (
    <div
      className={cx(
        "h-[150px]",

        "grid",
        "place-items-center",

        "transition-all",
      )}
      style={{ background: color }}
    >
      <div
        className={cx(
          "font-mono",
          "text-[30px]",

          "opacity-50",

          "transition-all",
        )}
        style={{ color: getTextColor(color ?? "#000000") }}
      >
        {color}
      </div>
    </div>
  );
}
