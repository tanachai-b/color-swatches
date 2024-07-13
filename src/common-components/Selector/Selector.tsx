import cx from "classnames";
import { ReactNode, useState } from "react";
import { SelectorBackdrop } from "./SelectorBackdrop";
import { SelectorButton } from "./SelectorButton";
import { SelectorPopup } from "./SelectorPopup";

export function Selector({
  label,
  value,
  popup,
}: {
  label: string;
  value: ReactNode;
  popup: (closePopup: () => void) => ReactNode;
}) {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  return (
    <div
      className={cx(
        "size-full",

        { "z-[999]": isPopupOpen },

        "relative",

        "leading-none",
      )}
    >
      <SelectorBackdrop isOpen={isPopupOpen} onClick={() => setIsPopupOpen(false)} />

      <SelectorButton
        label={label}
        value={value}
        onClick={() => setIsPopupOpen((isPopupOpen) => !isPopupOpen)}
      />

      <SelectorPopup isOpen={isPopupOpen}>{popup(() => setIsPopupOpen(false))}</SelectorPopup>
    </div>
  );
}
