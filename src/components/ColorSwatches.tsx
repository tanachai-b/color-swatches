import cx from "classnames";
import { MouseEvent, MouseEventHandler, memo } from "react";
import { getTextColor } from "src/common-functions";
import { Clickable } from "../common-components";

export function ColorSwatches({
  colorRows,
  selected,
  onClick,
}: {
  colorRows: string[][];
  selected?: string;
  onClick: (e: MouseEvent, color: string) => void;
}) {
  return (
    <div className={cx("flex", "flex-col", "gap-[20px]")}>
      {colorRows.map((colorRow, index) => (
        <div key={index} className={cx("flex", "flex-row", "gap-[20px]", "justify-around")}>
          {colorRow.map((color) => (
            <MemoizedColorSwatch
              key={color}
              color={color}
              isSelected={color === selected}
              onClick={(e) => onClick(e, color)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

const MemoizedColorSwatch = memo(ColorSwatch, (prev, next) => prev.isSelected === next.isSelected);

function ColorSwatch({
  color,
  isSelected,
  onClick,
}: {
  color: string;
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
          {color}
        </div>
      </Clickable>
    </div>
  );
}
