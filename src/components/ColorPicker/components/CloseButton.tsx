import cx from "classnames";
import { Icon } from "src/common-components";

export function CloseButton({ theme, onClose }: { theme: "light" | "dark"; onClose: () => void }) {
  return (
    <button
      className={cx(
        "absolute",
        "top-[5px]",
        "right-[5px]",

        "rounded-full",
        "grid",
        "p-[2px]",

        "text-[20px]",

        theme === "light"
          ? ["bg-[#00000020]", "hover:bg-[#00000040]", "text-[#000000c0]"]
          : ["bg-[#ffffff20]", "hover:bg-[#ffffff40]", "text-[#ffffffc0]"],

        "transition-all",
      )}
      onClick={onClose}
    >
      <Icon icon="close" />
    </button>
  );
}
