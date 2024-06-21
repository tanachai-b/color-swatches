import cx from "classnames";
import { ReactNode } from "react";
import { MouseScrollable } from "./MouseScrollable";
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
    >
      {children}
    </MouseScrollable>
  );
}

function ColorSwatches({ colorRows }: { colorRows: string[][] }) {
  return (
    <div className={cx("p-[10px]", "flex", "flex-col", "gap-[10px]")}>
      {colorRows.map((colorRow) => (
        <div className={cx("flex", "flex-row", "gap-[10px]", "justify-around")}>
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
