import cx from "classnames";
import { getTextColor } from "src/common-functions";

export function Preview({ color }: { color: string }) {
  return (
    <div
      className={cx(
        "h-[70px]",

        "grid",
        "place-items-center",
      )}
      style={{ background: color }}
    >
      <div
        className={cx(
          "font-mono",
          "text-[25px]",

          "opacity-50",
        )}
        style={{ color: getTextColor(color) }}
      >
        {color}
      </div>
    </div>
  );
}
