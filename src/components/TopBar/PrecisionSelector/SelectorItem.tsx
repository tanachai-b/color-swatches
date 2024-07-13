import cx from "classnames";
import { MouseEventHandler, ReactNode } from "react";

export function SelectorItem({
  isSelected,
  onClick,
  children,
}: {
  isSelected: boolean;
  onClick: MouseEventHandler;
  children: ReactNode;
}) {
  return (
    <button
      className={cx(
        "hover:bg-[#ffffff10]",
        { "bg-[#ffffff10]": isSelected },
        "transition-all",

        "py-[15px]",
        "px-[20px]",
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
