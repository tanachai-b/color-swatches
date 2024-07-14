import cx from "classnames";
import { memo, MouseEventHandler, ReactNode } from "react";
import { Clickable } from "src/common-components";
import { getTextColor } from "src/common-functions";

export function ColorSwatches({
  colorRows,
  swatch,
}: {
  colorRows: string[][];
  swatch: (color: string) => ReactNode;
}) {
  return (
    <div className={cx("flex", "flex-col", "gap-[20px]")}>
      {colorRows.map((colorRow, index) => (
        <div key={index} className={cx("flex", "flex-row", "gap-[20px]", "justify-around")}>
          {colorRow.map((color) => swatch(color))}
        </div>
      ))}
    </div>
  );
}

export { MemoColorSwatch as ColorSwatch };

const MemoColorSwatch = memo(
  ColorSwatch,
  (prev, next) => prev.isShowCode === next.isShowCode && prev.isSelected === next.isSelected,
);

function ColorSwatch({
  color,
  isShowCode,
  isSelected,
  onClick,
}: {
  color: string;
  isShowCode: boolean;
  isSelected: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div className={cx("flex-grow")}>
      <Clickable onClick={onClick}>
        <div
          className={cx(
            "min-w-[50px]",
            "min-h-[50px]",

            "rounded-[5px]",

            "grid",
            "place-items-center",

            "font-mono",
            "text-[11px]",

            "outline",
            isSelected ? "outline-[#ffffff]" : "outline-[#ffffff00]",
            "outline-[2px]",
            "outline-offset-[2px]",

            "transition-all",

            "cursor-pointer",
          )}
          style={{ backgroundColor: color, color: getTextColor(color) }}
        >
          {isShowCode && color}
        </div>
      </Clickable>
    </div>
  );
}
