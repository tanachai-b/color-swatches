import cx from "classnames";
import { MouseEventHandler, ReactNode } from "react";
import { Icon } from "src/common-components";

export function SelectorButton({
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
        "transition-all",

        "cursor-pointer",

        "rounded-[10px]",
        "backdrop-blur-[20px]",
        "shadow-[0_20px_50px_0_#000000ff]",

        "flex",
        "flex-row",
        "items-center",

        "p-[15px]",
        "gap-[20px]",
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

      <div className={cx("text-[#ffffff60]", "text-[25px]", "grid")}>
        <Icon icon={"keyboard_arrow_down"} />
      </div>
    </div>
  );
}
