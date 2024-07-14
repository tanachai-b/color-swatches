import cx from "classnames";
import { ReactNode, useState } from "react";
import {
  ColorCodeButton,
  ColorPicker,
  ColorPickerButton,
  Copyright,
  DetailPopup,
  PrecisionSelector,
  ScrollArea,
  TopBar,
} from "./components";

export default function App() {
  const [precision, setPrecision] = useState<number>(8);
  const [selectedColor, setSelectedColor] = useState<string>();
  const [isOpenPicker, setIsOpenPicker] = useState<boolean>(false);
  const [isShowCode, setIsShowCode] = useState<boolean>(true);

  return (
    <Container>
      <ScrollArea
        precision={precision}
        isShowCode={isShowCode}
        selectedColor={selectedColor}
        onSelectColor={setSelectedColor}
      />

      <DetailPopup color={selectedColor} />

      <TopBar>
        <PrecisionSelector selectedPrecision={precision} onSelect={setPrecision} />

        <ColorCodeButton isActive={isShowCode} onClick={() => setIsShowCode(!isShowCode)} />

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
