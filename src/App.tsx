import cx from "classnames";
import { ReactNode } from "react";

export default function App() {
  const colorRows = [
    Array.from({ length: 5 }, () => "#0000ff"),
    Array.from({ length: 7 }, () => "#0000ff"),
    Array.from({ length: 9 }, () => "#0000ff"),
    Array.from({ length: 3 }, () => "#0000ff"),
  ];

  return (
    <Container>
      <ColorSwatches colorRows={colorRows} />
    </Container>
  );
}

function Container({ children }: { children: ReactNode }) {
  return (
    <div
      className={cx(
        "h-full",
        "bg-[#000000]",

        "grid",
        "place-items-center",

        "overflow-auto",
      )}
    >
      {children}
    </div>
  );
}

function ColorSwatches({ colorRows }: { colorRows: string[][] }) {
  return (
    <div className={cx("p-[5px]", "flex", "flex-col", "gap-[5px]")}>
      {colorRows.map((colorRow) => (
        <div className={cx("flex", "flex-row", "gap-[5px]")}>
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

        "w-[20px]",
        "h-[20px]",
      )}
      style={{ backgroundColor: color }}
    />
  );
}
