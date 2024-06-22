import cx from "classnames";
import { ReactNode, useState } from "react";
import { MouseScrollable } from "./MouseScrollable";
import { ObserveResize } from "./ObserveResize";
import { getColorRows } from "./getColorRows";

export default function App() {
  const colorRows = getColorRows(6);

  return (
    <Container>
      <ColorSwatches colorRows={colorRows} />
    </Container>
  );
}

function Container({ children }: { children: ReactNode }) {
  const [circularScrollSize, setCircularScrollSize] = useState(0);

  return (
    <MouseScrollable
      className={cx(
        "h-full",
        "bg-[#000000]",

        "grid",
        "place-items-center",

        "overflow-auto",

        "select-none",
      )}
      circularScrollSizeX={circularScrollSize}
    >
      <div className={cx("flex", "flex-row", "p-[20px]", "gap-[20px]")}>
        <ObserveResize
          onResize={({ width }) => setCircularScrollSize(width + 20)}
        >
          {children}
        </ObserveResize>
        {children}
        {children}
      </div>
    </MouseScrollable>
  );
}

function ColorSwatches({ colorRows }: { colorRows: string[][] }) {
  return (
    <div className={cx("flex", "flex-col", "gap-[20px]")}>
      {colorRows.map((colorRow) => (
        <div className={cx("flex", "flex-row", "gap-[20px]", "justify-around")}>
          {colorRow.map((color) => (
            <ColorSwatch color={color} />
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
