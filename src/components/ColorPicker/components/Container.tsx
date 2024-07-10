import cx from "classnames";
import { ReactNode } from "react";

export function Container({ isOpen, children }: { isOpen: boolean; children: ReactNode }) {
  return (
    <div
      className={cx(
        "absolute",
        "size-full",

        isOpen ? "pointer-events-auto" : "pointer-events-none",

        "grid",
      )}
    >
      {children}
    </div>
  );
}

export function Backdrop({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <div
      className={cx(
        "fixed",
        "inset-0",

        isOpen ? "bg-[#00000040]" : "bg-[#00000000]",
        isOpen ? "backdrop-blur-[10px]" : "backdrop-blur-[0px]",

        "transition-all",
      )}
      onClick={onClick}
    />
  );
}

export function Card({ isOpen, children }: { isOpen: boolean; children: ReactNode }) {
  return (
    <div
      className={cx(
        "justify-self-center",
        "self-center",

        "bg-[#101010c0]",
        "rounded-[10px]",

        "backdrop-blur-[20px]",
        "shadow-[0_20px_50px_0_#000000ff]",

        isOpen ? "opacity-100" : "opacity-0",
        "transition-all",

        "relative",
        !isOpen ? "top-[100px]" : "top-0",

        "flex",
        "flex-col",

        "overflow-hidden",
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
