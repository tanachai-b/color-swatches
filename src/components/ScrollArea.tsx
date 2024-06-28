import cx from "classnames";
import { ReactNode, useState } from "react";
import { MouseScrollable, ObserveResize } from "src/common-components";

export function ScrollArea({ children }: { children: ReactNode }) {
  const [containerWidth, setContainerWidth] = useState(0);
  const [swatchesWidth, setSwatchesWidth] = useState(0);

  const isWideSwatches = swatchesWidth + 20 * 2 > containerWidth;

  return (
    <ObserveResize onResize={({ width }) => setContainerWidth(width)}>
      <MouseScrollable
        className={cx(
          "absolute",

          "size-full",
          "bg-[#000000]",

          "grid",
          "place-items-center",

          "overflow-auto",
        )}
        circularScrollSizeX={isWideSwatches ? swatchesWidth + 20 : undefined}
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
          {isWideSwatches && children}

          <ObserveResize onResize={({ width }) => setSwatchesWidth(width)}>
            {children}
          </ObserveResize>

          {isWideSwatches && children}
        </div>
      </MouseScrollable>
    </ObserveResize>
  );
}
