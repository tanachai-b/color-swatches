import cx from "classnames";
import { useMemo, useState } from "react";
import { ColorSwatches, Copyright, DetailPopup, PrecisionSelector, ScrollArea } from "./components";
import { getColorRows } from "./functions";

export default function App() {
  const [precision, setPrecision] = useState<number>(8);

  const colorRows = useMemo(() => getColorRows(precision), [precision]);

  const [selectedColor, setSelectedColor] = useState<string>();

  return (
    <div
      className={cx(
        "size-full",

        "grid",
        "relative",

        "select-none",
      )}
    >
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
    </div>
  );
}
