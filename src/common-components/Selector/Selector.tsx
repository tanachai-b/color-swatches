import cx from "classnames";
import { ReactNode, useState } from "react";
import { SelectorBackdrop } from "./SelectorBackdrop";
import { SelectorButton } from "./SelectorButton";
import { SelectorPopup } from "./SelectorPopup";

export function Selector({
  label,
  value,
  options,
}: {
  label: string;
  value: ReactNode;
  options: (closePopup: () => void) => ReactNode;
}) {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  return (
    <div className={cx("leading-none", "grid", "relative")}>
      <SelectorBackdrop isOpen={isPopupOpen} onClick={() => setIsPopupOpen(false)} />

      <SelectorButton label={label} onClick={() => setIsPopupOpen((isPopupOpen) => !isPopupOpen)}>
        {value}
      </SelectorButton>

      <SelectorPopup isOpen={isPopupOpen}>{options(() => setIsPopupOpen(false))}</SelectorPopup>
    </div>
  );
}
