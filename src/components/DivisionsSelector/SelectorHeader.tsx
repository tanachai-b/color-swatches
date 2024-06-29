import cx from "classnames";
import { ReactNode } from "react";

export function SelectorHeader({ children }: { children: ReactNode }) {
  return (
    <div
      className={cx(
        "px-[20px]",
        "pt-[20px]",
        "pb-[10px]",

        "text-[#ffffff60]",
        "text-[10px]",
        "text-center",

        "tracking-[2px]",
        "uppercase",
      )}
    >
      {children}
    </div>
  );
}
