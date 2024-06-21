import cx from "classnames";
import { ReactNode, useState } from "react";
import { MouseScrollable } from "./MouseScrollable";
import { ObserveResize } from "./ObserveResize";
import { useColorRows } from "./useColorRows";

export default function App() {
  const { colorRows } = useColorRows(6);

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
      circularScrollSize={circularScrollSize}
    >
      <div className={cx("flex", "flex-col", "p-[10px]", "gap-[10px]")}>
        <ObserveResize
          onResize={({ height }) => setCircularScrollSize(height + 10)}
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
    <div className={cx("flex", "flex-row", "gap-[10px]")}>
      {colorRows.map((colorRow) => (
        <div className={cx("flex", "flex-col", "gap-[10px]", "justify-around")}>
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
        // "flex-grow",

        "w-[20px]",
        "h-[20px]",

        "rounded-full",
      )}
      style={{ backgroundColor: color }}
    />
  );
}
