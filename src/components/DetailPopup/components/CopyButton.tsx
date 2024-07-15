import cx from "classnames";
import { MouseEventHandler } from "react";
import { Icon } from "src/common-components";

export function CopyButton({
  isCopied,
  onClick,
}: {
  isCopied: boolean;
  onClick: MouseEventHandler;
}) {
  return (
    <button
      className={cx(
        "shrink-0",

        "flex",
        "flex-row",

        "justify-center",
        "items-center",

        "p-[10px]",
        "gap-[5px]",

        "bg-[#ffffff08]",
        "hover:bg-[#ffffff10]",

        "text-[#ffffff60]",
        "hover:text-[#ffffffc0]",

        "transition-all",
      )}
      onClick={onClick}
    >
      <div className={cx("text-[20px]", "grid")}>
        <Icon icon={!isCopied ? "content_copy" : "check"} />
      </div>

      <div className={cx("text-[15px]", "tracking-[1px]")}>{!isCopied ? "COPY" : "COPIED"}</div>
    </button>
  );
}
