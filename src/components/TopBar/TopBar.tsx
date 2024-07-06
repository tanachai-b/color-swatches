import cx from "classnames";
import { ReactNode } from "react";

export function TopBar({ children }: { children: ReactNode }) {
  return (
    <div
      className={cx(
        "absolute",

        "place-self-center",
        "top-[50px]",

        "flex",
        "flex-row",
        "gap-[10px]",
      )}
    >
      {children}
    </div>
  );
}
