import cx from "classnames";

export function SelectorValue({
  precision,
  colorCount,
}: {
  precision: number;
  colorCount: number;
}) {
  return (
    <div
      className={cx(
        "flex",
        "flex-row",

        "justify-center",
        "items-center",
        "gap-[10px]",
      )}
    >
      <div
        className={cx(
          "w-[2ch]",

          "text-[#ffffff]",
          "text-[20px]",
          "text-right",
        )}
      >
        {precision}
      </div>

      <div
        className={cx(
          "w-[11ch]",

          "text-[#ffffff60]",
          "text-[12px]",
          "text-right",
        )}
      >
        {colorCount.toLocaleString()} Colors
      </div>
    </div>
  );
}
