import cx from "classnames";
import { color_wheel_icon } from "src/assets";

export function ColorPickerButton({ onClick: onClickPicker }: { onClick: () => void }) {
  return (
    <div
      className={cx(
        "bg-[#101010c0]",
        "hover:bg-[#202020c0]",
        "transition-all",

        "cursor-pointer",

        "rounded-[10px]",
        "backdrop-blur-[20px]",
        "shadow-[0_20px_50px_0_#000000ff]",

        "p-[15px]",
        "gap-[15px]",
      )}
      onClick={onClickPicker}
    >
      <img src={color_wheel_icon} />
    </div>
  );
}
