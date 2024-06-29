import cx from "classnames";
import { MouseEventHandler } from "react";
import { countColors } from "src/common-functions";

export function SelectorItem({
  divisionsLabel,
  divisions,
  isSelected,
  onClick,
}: {
  divisionsLabel: string;
  divisions: number;
  isSelected: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
}) {
  const colorCount = countColors(divisions);

  return (
    <div
      className={cx(
        "hover:bg-[#ffffff10]",
        { "bg-[#ffffff10]": isSelected },

        "px-[30px]",
        "py-[15px]",

        "flex",
        "flex-row",

        "justify-center",
        "items-center",
        "gap-[10px]",

        "cursor-pointer",

        "transition-all",
      )}
      onClick={onClick}
    >
      <div
        className={cx(
          "w-[60px]",

          "text-[#ffffffc0]",
          "text-[15px]",
        )}
      >
        {divisionsLabel}
      </div>

      <div
        className={cx(
          "w-[80px]",

          "text-[#ffffff60]",
          "text-[12px]",
        )}
      >
        ({colorCount.toLocaleString()} Colors)
      </div>
    </div>
  );
}
