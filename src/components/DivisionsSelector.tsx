import cx from "classnames";
import { MouseEventHandler, ReactNode, useState } from "react";
import { Icon } from "src/common-components";

export function DivisionsSelector({
  divisionOptions,
  selectedDivisions,
  onSelect,
}: {
  divisionOptions: number[];
  selectedDivisions: number;
  onSelect: (division: number) => void;
}) {
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
            {divisionOptions.map((division, index) => (
              <SelectorItem
                label={`${division}`}
                onClick={() => {
                  closePopup();
                  onSelect(divisionOptions[index]);
                }}
              />
            ))}
          </div>
        )}
      />
    </div>
  );
}

function SelectorItem({
  label,
  onClick,
}: {
  label: string;
  onClick: MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div
      className={cx(
        "px-[20px]",
        "py-[15px]",

        "text-[#ffffff80]",
        "text-[15px]",
        "text-center",

        "cursor-pointer",
      )}
      onClick={onClick}
    >
      {label}
    </div>
  );
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

        "bg-[#10101040]",
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
