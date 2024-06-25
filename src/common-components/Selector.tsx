import cx from "classnames";
import { MouseEventHandler, ReactNode, useState } from "react";
import { Icon } from "src/common-components";

export function Selector({
  label,
  value,
  options,
}: {
  label: string;
  value: ReactNode;
  options: (closePopup: () => void) => ReactNode;
}) {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  return (
    <div className={cx("leading-none", "grid", "relative")}>
      <SelectorBackdrop isOpen={isPopupOpen} onClick={() => setIsPopupOpen(false)} />

      <SelectorButton label={label} onClick={() => setIsPopupOpen((isPopupOpen) => !isPopupOpen)}>
        {value}
      </SelectorButton>

      <SelectorPopup isOpen={isPopupOpen}>{options(() => setIsPopupOpen(false))}</SelectorPopup>
    </div>
  );
}

function SelectorBackdrop({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div
      className={cx(
        "fixed",

        "inset-0",

        isOpen ? "bg-[#00000040]" : "bg-[#00000000]",
        isOpen ? "backdrop-blur-[10px]" : "backdrop-blur-[0px]",
        { "pointer-events-none": !isOpen },

        "transition-all",
      )}
      onClick={onClick}
    />
  );
}

function SelectorButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: MouseEventHandler<HTMLDivElement>;
  children: ReactNode;
}) {
  return (
    <div
      className={cx(
        "bg-[#101010c0]",
        "hover:bg-[#202020c0]",

        "rounded-[10px]",
        "backdrop-blur-[20px]",

        "shadow-[0_20px_50px_0_#000000ff]",

        "flex",
        "flex-row",
        "items-center",

        "p-[20px]",
        "gap-[20px]",

        "cursor-pointer",

        "overflow-auto",

        "transition-all",
      )}
      onClick={onClick}
    >
      <div
        className={cx(
          "shrink-0",

          "text-[#ffffff60]",
          "text-[15px]",
          "tracking-[1px]",
        )}
      >
        {label}
      </div>

      <div className={cx("grow")}>{children}</div>

      <div className={cx("text-[#ffffff60]", "text-[20px]", "grid")}>
        <Icon icon={"keyboard_arrow_down"} />
      </div>
    </div>
  );
}

function SelectorPopup({ isOpen, children }: { isOpen: boolean; children: ReactNode }) {
  return (
    <div
      className={cx(
        "absolute",

        "w-full",

        "top-full",
        "mt-[10px]",

        "bg-[#101010c0]",
        "rounded-[10px]",
        "backdrop-blur-[20px]",

        "shadow-[0_20px_50px_0_#000000ff]",

        isOpen ? "opacity-100" : "opacity-0",
        { "pointer-events-none": !isOpen },

        "transition-all",
      )}
    >
      {children}
    </div>
  );
}
