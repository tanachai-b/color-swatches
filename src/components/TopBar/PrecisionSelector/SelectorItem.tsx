import cx from "classnames";
import { MouseEventHandler } from "react";

export function SelectorItem({
  precision,
  colorCount,
  isSelected,
  onClick,
}: {
  precision: number;
  colorCount: number;
  isSelected: boolean;
  onClick: MouseEventHandler;
}) {
  return (
    <button
      className={cx(
        "px-[30px]",
        "py-[15px]",

        "flex",
        "flex-row",

        "justify-center",
        "items-center",
        "gap-[10px]",

        "hover:bg-[#ffffff10]",
        { "bg-[#ffffff10]": isSelected },
        "transition-all",
      )}
      onClick={onClick}
    >
      <div
        className={cx(
          "w-[2ch]",

          "text-[#ffffffc0]",
          "text-[15px]",
          "text-right",
        )}
      >
        {precision}
      </div>

      <div
        className={cx(
          "w-[11ch]",

          "text-[#ffffff60]",
          "text-[12px]",
          "text-right",
        )}
      >
        {colorCount.toLocaleString()} Colors
      </div>
    </button>
  );
}
