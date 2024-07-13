import cx from "classnames";
import { ReactNode, useMemo, useState } from "react";
import {
  ColorPicker,
  ColorPickerButton,
  Copyright,
  DetailPopup,
  PrecisionSelector,
  ScrollArea,
  TopBar,
} from "./components";
import { getColorRows } from "./functions";

export default function App() {
  const [precision, setPrecision] = useState<number>(8);

  const colorRows = useMemo(() => getColorRows(precision), [precision]);

  const [selectedColor, setSelectedColor] = useState<string>();

  const [isOpenPicker, setIsOpenPicker] = useState<boolean>(false);

  return (
    <Container>
      <ScrollArea
        colorRows={colorRows}
        selectedColor={selectedColor}
        onSelectColor={setSelectedColor}
      />

      <DetailPopup color={selectedColor} />

      <TopBar>
        <PrecisionSelector selectedPrecision={precision} onSelect={setPrecision} />

        <ColorPickerButton onClick={() => setIsOpenPicker(true)} />
      </TopBar>

      <ColorPicker
        isOpen={isOpenPicker}
        appPrecision={precision}
        appColor={selectedColor ?? "#808080"}
        onClose={(color) => {
          setSelectedColor(color);
          setIsOpenPicker(false);
        }}
      />

      <Copyright />
    </Container>
  );
}

function Container({ children }: { children: ReactNode }) {
  return (
    <div
      className={cx(
        "size-full",

        "bg-[#000000]",

        "grid",
        "relative",

        "select-none",
      )}
    >
      {children}
    </div>
  );
}
