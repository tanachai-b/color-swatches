import cx from "classnames";

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

function getTextColor(color: string) {
  const red = parseInt(color.substring(1, 3), 16) / 255;
  const green = parseInt(color.substring(3, 5), 16) / 255;
  const blue = parseInt(color.substring(5, 7), 16) / 255;

  const brightness = (blue + red * 2 + green * 4) / 7;

  return brightness > 0.5 ? "#000000" : "#ffffff";
}
