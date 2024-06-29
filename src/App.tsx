import cx from "classnames";
import { useMemo, useState } from "react";
import { getColorRows } from "./common-functions";
import { ColorSwatches, Copyright, DetailPopup, DivisionsSelector, ScrollArea } from "./components";

export default function App() {
  const [divisions, setDivisions] = useState<number>(8);

  const colorRows = useMemo(() => getColorRows(divisions), [divisions]);

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

      <DivisionsSelector selectedDivisions={divisions} onSelect={setDivisions} />

      <Copyright />
    </div>
  );
}
