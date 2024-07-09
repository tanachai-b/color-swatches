import cx from "classnames";
import { ReactNode } from "react";

export function Detail({ children }: { children: ReactNode }) {
  return (
    <div
      className={cx(
        "grid",
        "grid-rows-3",

        "rounded-r-[10px]",

        "border",
        "border-[#ffffff10]",

        "divide-y",
        "divide-[#ffffff10]",

        "leading-none",
      )}
    >
      {children}
    </div>
  );
}

export function Field({ children }: { children: ReactNode }) {
  return (
    <div
      className={cx(
        "flex",
        "flex-col",

        "p-[5px]",
      )}
    >
      {children}
    </div>
  );
}

export function Label({ children }: { children: ReactNode }) {
  return (
    <div
      className={cx(
        "text-[#ffffff60]",
        "text-[11px]",

        "flex",
        "justify-start",
        "items-center",
      )}
    >
      {children}
    </div>
  );
}

export function Value({ children }: { children: ReactNode }) {
  return (
    <div
      className={cx(
        "flex-grow",

        "text-[#ffffffc0]",
        "text-[13px]",

        "flex",
        "justify-end",
        "items-center",
      )}
    >
      {children}
    </div>
  );
}
