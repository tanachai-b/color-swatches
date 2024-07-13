import cx from "classnames";

export function SelectorValue({ distance, colorCount }: { distance: number; colorCount: number }) {
  return (
    <div
      className={cx(
        "flex",
        "flex-row",

        "gap-[10px]",
        "items-center",
      )}
    >
      <div
        className={cx(
          "flex",
          "flex-row",

          "gap-[5px]",
          "items-center",
        )}
      >
        <div className={cx("text-[#ffffff60]", "text-[10px]")}>HEX</div>

        <div
          className={cx(
            "w-[2ch]",

            "text-[#ffffffc0]",
            "text-[20px]",
          )}
        >
          {distance.toString(16).toUpperCase()}
        </div>
      </div>

      <div
        className={cx(
          "flex",
          "flex-row",

          "gap-[5px]",
          "items-center",
        )}
      >
        <div className={cx("text-[#ffffff60]", "text-[10px]")}>DEC</div>

        <div
          className={cx(
            "w-[3ch]",

            "text-[#ffffffc0]",
            "text-[12px]",
            "text-left",
          )}
        >
          {distance}
        </div>
      </div>

      <div
        className={cx(
          "grow",

          "text-[#ffffff60]",
          "text-[12px]",
          "text-right",
        )}
      >
        {colorCount.toLocaleString()} colors
      </div>
    </div>
  );
}
