import cx from "classnames";
import { getShade } from "src/common-functions";

export function Preview({ color }: { color: string }) {
  return (
    <div
      className={cx(
        "h-[70px]",

        "grid",
        "place-items-center",

        "font-mono",
        "text-[25px]",
        getShade(color) === "dark" ? "text-[#ffffff80]" : "text-[#00000080]",

        "transition-all",
      )}
      style={{ background: color }}
    >
      {color}
    </div>
  );
}
