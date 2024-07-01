import cx from "classnames";
import { MouseEventHandler, ReactNode, useState } from "react";
import { MouseScrollable, ObserveResize } from "src/common-components";
import { Clickable } from "../common-components";

export function ScrollArea({
  onClick,
  children,
}: {
  onClick: MouseEventHandler<HTMLDivElement>;
  children: ReactNode;
}) {
  const [containerWidth, setContainerWidth] = useState(0);
  const [swatchesWidth, setSwatchesWidth] = useState(0);

  const isWideSwatches = swatchesWidth + 20 * 2 > containerWidth;

  return (
    <Clickable onClick={onClick}>
      <ObserveResize onResize={({ width }) => setContainerWidth(width)}>
        <div
          className={cx(
            "absolute",
            "size-full",

            "bg-[#000000]",
          )}
        >
          <MouseScrollable circularScrollSizeX={isWideSwatches ? swatchesWidth + 20 : undefined}>
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
                {isWideSwatches && children}

                <ObserveResize onResize={({ width }) => setSwatchesWidth(width)}>
                  {children}
                </ObserveResize>

                {isWideSwatches && children}
              </div>
            </div>
          </MouseScrollable>
        </div>
      </ObserveResize>
    </Clickable>
  );
}
