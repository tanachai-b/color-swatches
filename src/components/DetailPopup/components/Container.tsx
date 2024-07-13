import cx from "classnames";
import { ReactNode } from "react";

export function Container({ isOpen, children }: { isOpen: boolean; children: ReactNode }) {
  return (
    <div
      className={cx(
        "absolute",
        "size-full",
        "invisible",

        "p-[50px]",

        "grid",

        "overflow-hidden",
      )}
    >
      <div
        className={cx(
          "justify-self-end",
          "self-center",

          "w-[300px]",
          "max-h-full",

          "bg-[#101010c0]",
          "rounded-[10px]",
          "backdrop-blur-[20px]",

          "shadow-[0_20px_50px_0_#000000ff]",

          isOpen ? "opacity-100" : "opacity-0",
          { visible: isOpen },

          "relative",
          !isOpen ? "left-[100px]" : "left-0",

          "transition-all",

          "flex",
          "flex-col",

          "overflow-hidden",
        )}
      >
        {children}
      </div>
    </div>
  );
}
