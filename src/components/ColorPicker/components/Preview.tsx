import cx from "classnames";
import { getShade } from "src/common-functions";

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
          getShade(color) === "dark" ? "text-[#ffffff80]" : "text-[#00000080]",
        )}
      >
        {color}
      </div>
    </div>
  );
}
