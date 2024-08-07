import cx from "classnames";
import { ReactNode, useState } from "react";
import {
  ColorCodeButton,
  ColorPicker,
  Copyright,
  PrecisionSelector,
  SwatchesArea,
  TopBar,
} from "./components";

export default function App() {
  const [precision, setPrecision] = useState<number>(8);
  const [selectedColor, setSelectedColor] = useState<string>();
  const [pickerColor, setPickerColor] = useState<string>();
  const [isShowCode, setIsShowCode] = useState<boolean>(true);

  return (
    <Container>
      <SwatchesArea
        precision={precision}
        isShowCode={isShowCode}
        selectedColor={selectedColor}
        onSelectColor={(color) => {
          setSelectedColor(color);
          setPickerColor(color);
        }}
      />

      <TopBar>
        <PrecisionSelector selectedPrecision={precision} onSelect={setPrecision} />

        <ColorCodeButton isActive={isShowCode} onClick={() => setIsShowCode(!isShowCode)} />
      </TopBar>

      <ColorPicker
        appPrecision={precision}
        appColor={pickerColor}
        onChange={setSelectedColor}
        onClose={() => {
          setSelectedColor(undefined);
          setPickerColor(undefined);
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
        "touch-none",
        "overflow-clip",
      )}
    >
      {children}
    </div>
  );
}
