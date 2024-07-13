import cx from "classnames";
import { MouseEventHandler, ReactNode } from "react";
import { Icon } from "src/common-components";

export function SelectorButton({
  label,
  value,
  onClick,
}: {
  label: ReactNode;
  value: ReactNode;
  onClick: MouseEventHandler;
}) {
  return (
    <button
      className={cx(
        "size-full",

        "bg-[#101010c0]",
        "hover:bg-[#202020c0]",
        "transition-all",

        "rounded-[10px]",
        "backdrop-blur-[20px]",
        "shadow-[0_20px_50px_0_#000000ff]",

        "flex",
        "flex-row",
        "items-center",

        "p-[15px]",
        "py-[10px]",
        "gap-[15px]",
      )}
      onClick={onClick}
    >
      <div
        className={cx(
          "grow",

          "flex",
          "flex-col",

          "gap-[10px]",
        )}
      >
        <div
          className={cx(
            "text-left",
            "text-[#ffffff60]",
            "text-[11px]",

            "tracking-[1px]",
          )}
        >
          {label}
        </div>

        <div>{value}</div>
      </div>

      <div className={cx("text-[#ffffff60]", "text-[25px]", "grid")}>
        <Icon icon={"keyboard_arrow_down"} />
      </div>
    </button>
  );
}
