import cx from "classnames";
import { ReactNode } from "react";

export function Container({ isOpen, children }: { isOpen: boolean; children: ReactNode }) {
  return (
    <div
      className={cx(
        "absolute",

        "place-self-center",
        "right-[50px]",

        "w-[300px]",

        "bg-[#101010c0]",
        "rounded-[10px]",
        "backdrop-blur-[20px]",

        "shadow-[0_20px_50px_0_#000000ff]",

        isOpen ? "opacity-100" : "opacity-0",
        { "pointer-events-none": !isOpen },

        "transition-all",

        "overflow-auto",

        "flex",
        "flex-col",
      )}
    >
      {children}
    </div>
  );
}
