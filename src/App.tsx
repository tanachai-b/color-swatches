import cx from "classnames";
import { useMemo, useState } from "react";
import { ColorSwatches, DivisionsSelector, ScrollArea } from "./components";
import { getColorRows } from "./functions";

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

      <DivisionsSelector selectedDivisions={divisions} onSelect={setDivisions} />
    </div>
  );
}
