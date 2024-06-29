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
        "text-[12px]",
        "leading-none",
      )}
    >
      © 2024 Tanachai Bunlutangtum. All Rights Reserved.
    </div>
  );
}
