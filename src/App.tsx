import cx from "classnames";
import { useMemo, useState } from "react";
import { ColorSwatches, DivisionsSelector, ScrollArea } from "./components";
import { getColorRows } from "./functions";

export default function App() {
  const divisionOptions = [1, 2, 3, 4, 5, 6, 8, 12, 15, 16];

  const [divisions, setDivisions] = useState<number>(8);

  const colorRows = useMemo(() => getColorRows(divisions), [divisions]);

  return (
    <div className={cx("size-full", "grid", "relative")}>
      <ScrollArea>
        <ColorSwatches colorRows={colorRows} />
      </ScrollArea>

      <DivisionsSelector
        divisionOptions={divisionOptions}
        selectedDivisions={divisions}
        onSelect={setDivisions}
      />
    </div>
  );
}
