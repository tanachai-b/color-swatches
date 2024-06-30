import cx from "classnames";
import { ReactNode } from "react";

export function SelectorPopup({ isOpen, children }: { isOpen: boolean; children: ReactNode }) {
  return (
    <div
      className={cx(
        "absolute",

        "w-full",
        "top-full",

        "bg-[#101010c0]",
        "rounded-[10px]",
        "backdrop-blur-[20px]",
        "shadow-[0_20px_50px_0_#000000ff]",

        "mt-[10px]",
        "py-[10px]",

        "flex",
        "flex-col",

        isOpen ? "opacity-100" : "opacity-0",
        { "pointer-events-none": !isOpen },

        "transition-all",
      )}
    >
      {children}
    </div>
  );
}
