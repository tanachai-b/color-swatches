import cx from "classnames";
import { useMemo, useState } from "react";
import { Clickable, MouseScrollable, Resizable } from "src/common-components";
import { ColorSwatch, ColorSwatches } from "./ColorSwatches";
import { getColorRows } from "./getColorRows";

export function SwatchesArea({
  precision,
  isShowCode,
  selectedColor,
  onSelectColor,
}: {
  precision: number;
  isShowCode: boolean;
  selectedColor?: string;
  onSelectColor: (color?: string) => void;
}) {
  const colorRows = useMemo(() => getColorRows(precision), [precision]);

  const [containerWidth, setContainerWidth] = useState(0);
  const [swatchesWidth, setSwatchesWidth] = useState(0);

  const isWideSwatches = swatchesWidth + 20 * 2 > containerWidth;

  const colorSwatches = (
    <ColorSwatches
      colorRows={colorRows}
      swatch={(color) => (
        <ColorSwatch
          key={color}
          color={color}
          isShowCode={isShowCode}
          isSelected={color === selectedColor}
          onClick={(e) => {
            onSelectColor(color !== selectedColor ? color : undefined);
            e.stopPropagation();
          }}
        />
      )}
    />
  );

  return (
    <Resizable onResize={({ width }) => setContainerWidth(width)}>
      <Clickable onClick={() => onSelectColor()}>
        <div className={cx("absolute", "size-full")}>
          <MouseScrollable
            className={cx("size-full", "overflow-auto")}
            circularScrollSizeX={isWideSwatches ? swatchesWidth + 20 : undefined}
          >
            <div
              className={cx(
                "size-full",

                "grid",
                "place-items-center",
              )}
            >
              <div
                className={cx(
                  "flex",
                  "flex-row",
                  "justify-center",

                  "p-[20px]",
                  "py-[150px]",

                  "gap-[20px]",
                )}
                style={{ width: isWideSwatches ? "auto" : swatchesWidth + 800 }}
              >
                {isWideSwatches && colorSwatches}

                <Resizable onResize={({ width }) => setSwatchesWidth(width)}>
                  {colorSwatches}
                </Resizable>

                {isWideSwatches && colorSwatches}
              </div>
            </div>
          </MouseScrollable>
        </div>
      </Clickable>
    </Resizable>
  );
}
