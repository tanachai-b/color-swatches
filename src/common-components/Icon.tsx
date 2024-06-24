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
        style={{ fontSize: "inherit" }}
      >
        {icon}
      </span>
    </>
  );
}
