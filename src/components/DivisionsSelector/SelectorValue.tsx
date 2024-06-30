import cx from "classnames";
import { ReactNode } from "react";
import { countColors } from "src/common-functions";

export function SelectorValue({
  divisionsLabel,
  divisions,
}: {
  divisionsLabel: string;
  divisions: number;
}): ReactNode {
  const colorCount = countColors(divisions);

  return (
    <div
      className={cx(
        "flex",
        "flex-row",

        "justify-center",
        "items-center",
        "gap-[10px]",
      )}
    >
      <div
        className={cx(
          "w-[2ch]",

          "text-[#ffffff]",
          "text-[20px]",
          "text-right",
        )}
      >
        {divisionsLabel}
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
    </div>
  );
}
