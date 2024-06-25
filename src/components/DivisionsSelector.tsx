import cx from "classnames";
import { MouseEventHandler, ReactNode, useState } from "react";
import { Icon } from "src/common-components";

export function DivisionsSelector({
  selectedDivisions,
  onSelect,
}: {
  selectedDivisions: number;
  onSelect: (division: number) => void;
}) {
  function onItemClick(closePopup: () => void, division: number) {
    closePopup();
    onSelect(division);
  }

  return (
    <div
      className={cx(
        "absolute",

        "place-self-center",
        "top-[50px]",
        "w-[200px]",
      )}
    >
      <Selector
        label="Divisions"
        value={`${selectedDivisions}`}
        options={(closePopup) => (
          <div className={cx("py-[10px]", "flex", "flex-col")}>
            <SelectorHeader>Divisible by HEX11</SelectorHeader>

            {[1, 3, 5, 15].map((divisions) => (
              <SelectorItem
                key={divisions}
                divisions={divisions}
                isSelected={selectedDivisions === divisions}
                onClick={() => onItemClick(closePopup, divisions)}
              />
            ))}

            <SelectorHeader>Divisible by HEX10</SelectorHeader>

            {[2, 4, 8, 16].map((divisions) => (
              <SelectorItem
                key={divisions}
                divisions={divisions}
                isSelected={selectedDivisions === divisions}
                onClick={() => onItemClick(closePopup, divisions)}
              />
            ))}
          </div>
        )}
      />
    </div>
  );
}

function SelectorHeader({ children }: { children: ReactNode }) {
  return (
    <div
      className={cx(
        "px-[20px]",
        "pt-[20px]",
        "pb-[10px]",

        "text-[#ffffff60]",
        "text-[10px]",
        "text-center",

        "tracking-[2px]",
        "uppercase",
      )}
    >
      {children}
    </div>
  );
}

function SelectorItem({
  divisions,
  isSelected,
  onClick,
}: {
  divisions: number;
  isSelected: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
}) {
  const colorCount = countColors(divisions);

  return (
    <div
      className={cx(
        "px-[20px]",
        "py-[15px]",

        { "bg-[#ffffff10]": isSelected },

        "flex",
        "flex-row",

        "items-center",
        "gap-[10px]",

        "cursor-pointer",
      )}
      onClick={onClick}
    >
      <div
        className={cx(
          "w-[30%]",

          "text-[#ffffffc0]",
          "text-[15px]",
          "text-right",
        )}
        onClick={onClick}
      >
        {divisions}
      </div>

      <div className={cx("text-[#ffffff60]", "text-[12px]", "text-right")} onClick={onClick}>
        ({colorCount.toLocaleString()} Colors)
      </div>
    </div>
  );
}

function countColors(divisions: number) {
  const colorCount = Array.from({ length: divisions }).reduce<number>(
    (colorCount, _, index) => colorCount + (divisions - index) * (index + 1) * 6,
    0,
  );

  return colorCount;
}

function Selector({
  label,
  value,
  options,
}: {
  label: string;
  value: string;
  options: (closePopup: () => void) => ReactNode;
}) {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  return (
    <div className={cx("leading-none", "grid", "relative")}>
      {isPopupOpen && <SelectorBackdrop onClick={() => setIsPopupOpen(false)} />}

      <SelectorButton
        label={label}
        value={value}
        onClick={() => setIsPopupOpen((isPopupOpen) => !isPopupOpen)}
      />

      {isPopupOpen && <SelectorPopup>{options(() => setIsPopupOpen(false))}</SelectorPopup>}
    </div>
  );
}

function SelectorBackdrop({ onClick }: { onClick: MouseEventHandler<HTMLDivElement> }) {
  return (
    <div
      className={cx(
        "fixed",

        "inset-0",

        "bg-[#00000040]",
        "backdrop-blur-[1px]",
      )}
      onClick={onClick}
    />
  );
}

function SelectorButton({
  label,
  value,
  onClick,
}: {
  label: string;
  value: string;
  onClick: MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div
      className={cx(
        "bg-[#101010c0]",
        "rounded-[10px]",
        "backdrop-blur-[10px]",

        "shadow-[0_20px_50px_0_#000000ff]",

        "flex",
        "flex-row",
        "items-center",

        "p-[20px]",
        "gap-[20px]",

        "cursor-pointer",
      )}
      onClick={onClick}
    >
      <div
        className={cx(
          "shrink-0",

          "text-[#ffffff60]",
          "text-[15px]",
          "tracking-[1px]",

          "text-nowrap",
          "overflow-hidden",
          "overflow-ellipsis",
        )}
      >
        {label}
      </div>

      <div
        className={cx(
          "grow",

          "text-[#ffffff]",
          "text-[20px]",
          "text-right",

          "text-nowrap",
          "overflow-hidden",
          "overflow-ellipsis",
        )}
      >
        {value}
      </div>

      <div className={cx("text-[#ffffff60]", "text-[20px]", "grid")}>
        <Icon icon={"keyboard_arrow_down"} />
      </div>
    </div>
  );
}

function SelectorPopup({ children }: { children: ReactNode }) {
  return (
    <div
      className={cx(
        "absolute",

        "w-full",

        "top-full",
        "mt-[10px]",

        "bg-[#101010c0]",
        "rounded-[10px]",
        "backdrop-blur-[10px]",

        "shadow-[0_20px_50px_0_#000000ff]",
      )}
    >
      {children}
    </div>
  );
}
