import cx from "classnames";
import { MouseEventHandler } from "react";
import { Icon } from "src/common-components";

export function ToggleButton({
  icon,
  isActive,
  onClick,
}: {
  icon: string;
  isActive: boolean;
  onClick: MouseEventHandler;
}) {
  return (
    <button
      className={cx(
        "grid",

        "text-[25px]",
        isActive ? "text-[#ffffffc0]" : "text-[#ffffff30]",

        "transition-all",
      )}
      onClick={onClick}
    >
      <Icon icon={icon} />
    </button>
  );
}
