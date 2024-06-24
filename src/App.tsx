import cx from "classnames";
import { useMemo, useState } from "react";
import { ColorSwatches, DivisionsSelector, ScrollArea } from "./components";
import { getColorRows } from "./functions";

export default function App() {
  const [divisions, setDivisions] = useState<number>(8);

  const colorRows = useMemo(() => getColorRows(divisions), [divisions]);

  return (
    <div className={cx("size-full", "grid", "relative")}>
      <ScrollArea>
        <ColorSwatches colorRows={colorRows} />
      </ScrollArea>

      <DivisionsSelector selectedDivisions={divisions} onSelect={setDivisions} />
    </div>
  );
}
