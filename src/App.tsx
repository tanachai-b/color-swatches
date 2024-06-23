import cx from "classnames";
import { ColorSwatches, ScrollArea } from "./components";
import { getColorRows } from "./getColorRows";

export default function App() {
  const colorRows = getColorRows(8);

  return (
    <div className={cx("size-full", "grid", "relative")}>
      <ScrollArea>
        <ColorSwatches colorRows={colorRows} />
      </ScrollArea>
    </div>
  );
}
