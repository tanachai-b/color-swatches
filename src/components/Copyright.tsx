import cx from "classnames";

export function Copyright() {
  return (
    <div
      className={cx(
        "absolute",

        "place-self-center",
        "bottom-[10px]",

        "bg-[#00000080]",
        "backdrop-blur-[10px]",

        "p-[5px]",

        "text-[#ffffff80]",
        "text-[11px]",
        "leading-none",

        "z-1",
      )}
    >
      Copyright © 2024 Tanachai Bunlutangtum. All rights reserved.
    </div>
  );
}
