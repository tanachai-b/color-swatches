import cx from "classnames";
import { ReactNode, useState } from "react";
import { ColorSwatches, MouseScrollable, ObserveResize } from "./components";
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
  const [containerWidth, setContainerWidth] = useState(0);
  const [swatchesWidth, setSwatchesWidth] = useState(0);

  return (
    <ObserveResize
      className={cx("size-full")}
      onResize={({ width }) => setContainerWidth(width)}
    >
      <MouseScrollable
        className={cx(
          "size-full",
          "bg-[#000000]",

          "grid",
          "place-items-center",

          "overflow-auto",

          "select-none",
        )}
        circularScrollSizeX={swatchesWidth > 0 ? swatchesWidth + 20 : undefined}
      >
        <div className={cx("flex", "flex-row", "p-[20px]", "gap-[20px]")}>
          <ObserveResize onResize={({ width }) => setSwatchesWidth(width)}>
            {children}
          </ObserveResize>

          {swatchesWidth + 40 > containerWidth && (
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
