import cx from "classnames";
import { ReactNode, useState } from "react";
import { MouseScrollable, ObserveResize } from ".";

export function ScrollArea({ children }: { children: ReactNode }) {
  const [containerWidth, setContainerWidth] = useState(0);
  const [swatchesWidth, setSwatchesWidth] = useState(0);

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

          "select-none",
        )}
        circularScrollSizeX={swatchesWidth > 0 ? swatchesWidth + 20 : undefined}
      >
        <div
          className={cx(
            "flex",
            "flex-row",

            "p-[20px]",
            "py-[150px]",

            "gap-[20px]",
          )}
        >
          <ObserveResize onResize={({ width }) => setSwatchesWidth(width)}>
            {children}
          </ObserveResize>

          {swatchesWidth + 20 * 2 > containerWidth && (
            <>
              {children}
              {children}
            </>
          )}
        </div>
      </MouseScrollable>
    </ObserveResize>
  );
}
