import cx from "classnames";

export function Icon({ icon }: { icon: string }) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />

      <span
        className={cx("material-symbols-rounded")}
        style={{
          fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
          fontSize: "inherit",
        }}
      >
        {icon}
      </span>
    </>
  );
}
