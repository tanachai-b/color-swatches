import cx from "classnames";
import { getTextColor } from "src/functions";

export function ColorSwatches({ colorRows }: { colorRows: string[][] }) {
  return (
    <div className={cx("flex", "flex-col", "gap-[20px]")}>
      {colorRows.map((colorRow, index) => (
        <div key={index} className={cx("flex", "flex-row", "gap-[20px]", "justify-around")}>
          {colorRow.map((color) => (
            <ColorSwatch key={color} color={color} />
          ))}
        </div>
      ))}
    </div>
  );
}

function ColorSwatch({ color }: { color: string }) {
  return (
    <div
      className={cx(
        "flex-grow",

        "w-[50px]",
        "h-[50px]",

        "rounded-[5px]",

        "grid",
        "place-items-center",

        "font-mono",
        "text-[11px]",
      )}
      style={{ backgroundColor: color, color: getTextColor(color) }}
    >
      {color}
    </div>
  );
}
