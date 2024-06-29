import cx from "classnames";
import { MouseEventHandler } from "react";
import { Icon } from "src/common-components";

export function CopyButton({
  isCopied,
  onClick,
}: {
  isCopied: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div
      className={cx(
        "flex",
        "flex-row",

        "justify-center",
        "items-center",

        "p-[10px]",
        "gap-[5px]",

        "bg-[#ffffff08]",
        "hover:bg-[#ffffff10]",
        "cursor-pointer",

        "text-[#ffffff60]",
        "hover:text-[#ffffffc0]",

        "tracking-[1px]",

        "transition-all",
      )}
      onClick={onClick}
    >
      <div className={cx("text-[25px]", "grid")}>
        <Icon icon={!isCopied ? "content_copy" : "check"} />
      </div>

      <div className={cx("text-[15px]")}>{!isCopied ? "COPY" : "COPIED"}</div>
    </div>
  );
}
