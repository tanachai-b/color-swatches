import cx from "classnames";
import { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return (
    <div
      className={cx(
        "absolute",
        "size-full",
        "invisible",

        "p-[50px]",
        "grid",
        "overflow-clip",
      )}
    >
      {children}
    </div>
  );
}

export function Card({ isOpen, children }: { isOpen: boolean; children: ReactNode }) {
  return (
    <div
      className={cx(
        { visible: isOpen },

        "justify-self-end",
        "self-center",

        "bg-[#101010c0]",
        "rounded-[10px]",

        "backdrop-blur-[20px]",
        "shadow-[0_20px_50px_0_#000000ff]",

        isOpen ? "opacity-100" : "opacity-0",
        "transition-all",

        "relative",
        !isOpen ? "-right-[100px]" : "right-0",

        "flex",
        "flex-col",

        "overflow-clip",
      )}
    >
      {children}
    </div>
  );
}

export function Body({ children }: { children: ReactNode }) {
  return (
    <div
      className={cx(
        "flex",
        "flex-col",

        "p-[30px]",
        "gap-[30px]",
      )}
    >
      {children}
    </div>
  );
}
