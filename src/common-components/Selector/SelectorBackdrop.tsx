import cx from "classnames";
import { MouseEventHandler } from "react";

export function SelectorBackdrop({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div
      className={cx(
        "fixed",

        "inset-0",

        isOpen ? "bg-[#00000040]" : "bg-[#00000000]",
        isOpen ? "backdrop-blur-[10px]" : "backdrop-blur-[0px]",
        { "pointer-events-none": !isOpen },

        "transition-all",
      )}
      onClick={onClick}
    />
  );
}
