import cx from "classnames";
import { ReactNode } from "react";

export function Container({ isOpen, children }: { isOpen: boolean; children: ReactNode }) {
  return (
    <div
      className={cx(
        "absolute",
        "size-full",
        "pointer-events-none",

        "p-[50px]",

        "grid",
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
          isOpen ? "pointer-events-auto" : "pointer-events-none",

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
