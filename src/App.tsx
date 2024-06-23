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
