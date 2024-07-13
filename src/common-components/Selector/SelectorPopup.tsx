import cx from "classnames";
import { ReactNode } from "react";

export function SelectorPopup({ isOpen, children }: { isOpen: boolean; children: ReactNode }) {
  return (
    <div
      className={cx(
        "absolute",

        "w-full",
        "top-full",
        "mt-[10px]",

        { invisible: !isOpen },
        { "pointer-events-none": !isOpen },
      )}
    >
      <div
        className={cx(
          "bg-[#101010c0]",
          "rounded-[10px]",
          "backdrop-blur-[20px]",
          "shadow-[0_20px_50px_0_#000000ff]",

          "flex",
          "flex-col",
          "py-[10px]",

          isOpen ? "opacity-100" : "opacity-0",

          "relative",
          !isOpen ? "top-[-100px]" : "top-0",

          "transition-all",
        )}
      >
        {children}
      </div>
    </div>
  );
}
