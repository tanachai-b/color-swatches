import cx from "classnames";
import { ReactNode, useMemo, useState } from "react";
import { ColorSwatches, Copyright, DetailPopup, PrecisionSelector, ScrollArea } from "./components";
import { getColorRows } from "./functions";

export default function App() {
  const [precision, setPrecision] = useState<number>(8);

  const colorRows = useMemo(() => getColorRows(precision), [precision]);

  const [selectedColor, setSelectedColor] = useState<string>();

  return (
    <Container>
      <ScrollArea onClick={() => setSelectedColor(undefined)}>
        <ColorSwatches
          colorRows={colorRows}
          selected={selectedColor}
          onClick={(e, color) => {
            setSelectedColor(color);
            e.stopPropagation();
          }}
        />
      </ScrollArea>

      <DetailPopup color={selectedColor} />

      <PrecisionSelector selectedPrecision={precision} onSelect={setPrecision} />

      <Copyright />
    </Container>
  );
}

function Container({ children }: { children: ReactNode }) {
  return (
    <div
      className={cx(
        "size-full",

        "grid",
        "relative",

        "select-none",
      )}
    >
      {children}
    </div>
  );
}
