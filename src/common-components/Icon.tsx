import cx from "classnames";

export function Icon({ icon }: { icon: string }) {
  return (
    <span
      className={cx("material-symbols-rounded")}
      style={{
        fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
        fontSize: "inherit",
        width: "1ch",
      }}
    >
      {icon}
    </span>
  );
}
