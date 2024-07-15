import cx from "classnames";
import { useEffect, useState } from "react";
import { Icon } from "src/common-components";

export function CopyButton({ previewColor }: { previewColor: string }) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => setIsCopied(false), [previewColor]);

  function onClickCopy() {
    setIsCopied(true);
    navigator.clipboard.writeText(previewColor);
  }

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
      onClick={onClickCopy}
    >
      <div className={cx("text-[20px]", "grid")}>
        <Icon icon={!isCopied ? "content_copy" : "check"} />
      </div>

      <div className={cx("text-[15px]", "tracking-[1px]")}>{!isCopied ? "COPY" : "COPIED"}</div>
    </button>
  );
}
