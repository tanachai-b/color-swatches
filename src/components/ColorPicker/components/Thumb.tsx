import cx from "classnames";

export function Thumb({ x, y }: { x: number; y: number }) {
  return (
    <div
      className={cx(
        "absolute",

        "size-[10px]",
        "rounded-full",

        "border",
        "border-[white]",
        "border-[1px]",

        "outline",
        "outline-[black]",
        "outline-[1px]",
      )}
      style={{ left: x, top: y }}
    />
  );
}
