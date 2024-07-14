import cx from "classnames";
import { MouseEventHandler } from "react";
import { Icon } from "src/common-components";

export function ColorCodeButton({
  isActive,
  onClick: onClickPicker,
}: {
  isActive: boolean;
  onClick: MouseEventHandler;
}) {
  return (
    <button
      className={cx(
        "bg-[#101010c0]",
        "hover:bg-[#202020c0]",
        "transition-all",

        "rounded-[10px]",
        "backdrop-blur-[20px]",
        "shadow-[0_20px_50px_0_#000000ff]",

        "p-[15px]",

        "grid",
        "items-center",

        "text-[25px]",
        isActive ? "text-[#ffffff80]" : "text-[#ffffff20]",
      )}
      onClick={onClickPicker}
    >
      <Icon icon="tag" />
    </button>
  );
}
