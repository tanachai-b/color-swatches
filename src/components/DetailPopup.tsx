import cx from "classnames";
import { MouseEventHandler, ReactNode, useEffect, useState } from "react";
import { Icon } from "src/common-components";
import { getTextColor } from "src/functions";

export function DetailPopup({ color }: { color?: string }) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => setIsCopied(false), [color]);

  function onClickCopy() {
    setIsCopied(true);
    navigator.clipboard.writeText(color ?? "");
  }

  return (
    <DetailPopupContainer isOpen={color != null}>
      <Preview color={color} />

      <Detail color={color} />

      <CopyButton isCopied={isCopied} onClick={onClickCopy} />
    </DetailPopupContainer>
  );
}

function DetailPopupContainer({ isOpen, children }: { isOpen: boolean; children: ReactNode }) {
  return (
    <div
      className={cx(
        "absolute",

        "place-self-center",
        "right-[50px]",

        "w-[300px]",

        "bg-[#101010c0]",
        "rounded-[10px]",
        "backdrop-blur-[20px]",

        "shadow-[0_20px_50px_0_#000000ff]",

        isOpen ? "opacity-100" : "opacity-0",
        { "pointer-events-none": !isOpen },

        "transition-all",

        "overflow-auto",

        "flex",
        "flex-col",
      )}
    >
      {children}
    </div>
  );
}

function Preview({ color }: { color?: string }) {
  return (
    <div
      className={cx(
        "h-[150px]",

        "grid",
        "place-items-center",

        "transition-all",
      )}
      style={{ background: color }}
    >
      <div
        className={cx(
          "font-mono",
          "text-[30px]",

          "opacity-50",

          "transition-all",
        )}
        style={{ color: getTextColor(color ?? "#000000") }}
      >
        {color}
      </div>
    </div>
  );
}

function Detail({ color }: { color?: string }) {
  const { r, g, b } = rgb(color ?? "#000000");
  const { h, s, v } = hsv(color ?? "#000000");

  return (
    <div
      className={cx(
        "p-[20px]",
        "py-[30px]",
        "gap-[30px]",

        "flex",
        "flex-col",

        "text-[#ffffff80]",
        "text-[13px]",
      )}
    >
      <div className={cx("grid", "grid-flow-row", "grid-cols-[auto,1fr,auto]", "gap-[10px]")}>
        <Label>Red</Label>
        <Bar value={r / 255} />
        <Value value={r} isInteger={true} />

        <Label>Green</Label>
        <Bar value={g / 255} />
        <Value value={g} isInteger={true} />

        <Label>Blue</Label>
        <Bar value={b / 255} />
        <Value value={b} isInteger={true} />
      </div>

      <div className={cx("grid", "grid-flow-row", "grid-cols-[auto,1fr,auto]", "gap-[10px]")}>
        <Label>Hue</Label>
        <Bar value={h / 360} />
        <Value value={h} unit={"°"} />

        <Label>Saturation</Label>
        <Bar value={s / 100} />
        <Value value={s} unit={"%"} />

        <Label>Brightness</Label>
        <Bar value={v / 100} />
        <Value value={v} unit={"%"} />
      </div>
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <div className={cx("w-[9ch]", "text-right")}>{children}</div>;
}

function Bar({ value }: { value: number }) {
  return (
    <div className={cx("grid", "items-center", "relative")}>
      <div className={cx("w-full", "h-[5px]", "bg-[#ffffff10]", "rounded-full")} />
      <div
        className={cx(
          "absolute",
          "w-full",
          "h-[5px]",
          "bg-[#ffffff60]",
          "rounded-full",
          "transition-all",
        )}
        style={{ width: `${value * 100}%` }}
      />
    </div>
  );
}

function Value({ value, isInteger, unit }: { value: number; isInteger?: boolean; unit?: string }) {
  const fix = value.toFixed(1).split(".");
  const num = fix[0];
  const dec = fix[1];

  return (
    <div className={cx("flex", "flex-row")}>
      <div className={cx("w-[3ch]", "text-right")}>{num}</div>

      <div className={cx("w-[2ch]", "text-left")}>{!isInteger ? `.${dec}` : ""}</div>

      <div className={cx("w-[1.5ch]")}>{unit}</div>
    </div>
  );
}

function rgb(hex: string) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  return { r, g, b };
}

function hsv(hex: string) {
  const { r, g, b } = rgb(hex);

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  let h = 0;
  if (r === g && g === b) {
    h = 0;
  } else if (r === max) {
    h = hsvSection(r, b, g);
  } else if (g === max) {
    h = 120 + hsvSection(g, r, b);
  } else if (b === max) {
    h = 240 + hsvSection(b, g, r);
  }
  h = (h + 360) % 360;

  const s = ((max - min) / (max || 1)) * 100;
  const v = (max / 255) * 100;

  return { h, s, v };

  function hsvSection(max: number, desc: number, asc: number) {
    if (desc > asc) {
      return ((desc - asc) / (max - asc)) * -60;
    } else {
      return ((asc - desc) / (max - desc)) * 60;
    }
  }
}

function CopyButton({
  isCopied,
  onClick,
}: {
  isCopied: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div
      className={cx(
        "flex",
        "flex-row",

        "justify-center",
        "items-center",

        "p-[10px]",
        "gap-[5px]",

        "bg-[#ffffff08]",
        "hover:bg-[#ffffff10]",
        "cursor-pointer",

        "text-[#ffffff60]",
        "hover:text-[#ffffffc0]",

        "tracking-[1px]",

        "transition-all",
      )}
      onClick={onClick}
    >
      <div className={cx("text-[25px]", "grid")}>
        <Icon icon={!isCopied ? "content_copy" : "check"} />
      </div>
      <div className={cx("text-[15px]")}>{!isCopied ? "COPY" : "COPIED"}</div>
    </div>
  );
}
