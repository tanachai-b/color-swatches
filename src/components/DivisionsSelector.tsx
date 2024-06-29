import cx from "classnames";
import { MouseEventHandler, ReactNode } from "react";
import { Selector } from "src/common-components";
import { countColors } from "src/common-functions";

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

  const divisionLabels: { [key: number]: string } = {
    1: "256 / 1",
    2: "256 / 2",
    4: "256 / 4",
    8: "256 / 8",
    16: "256 / 16",
    3: "255 / 3",
    5: "255 / 5",
    15: "255 / 15",
  };

  return (
    <div
      className={cx(
        "absolute",

        "place-self-center",
        "top-[50px]",

        "w-[360px]",
      )}
    >
      <Selector
        label="Precisions"
        value={
          <SelectorValue
            divisionsLabel={divisionLabels[selectedDivisions]}
            divisions={selectedDivisions}
          />
        }
        options={(closePopup) => (
          <div className={cx("py-[10px]", "flex", "flex-col")}>
            <SelectorHeader>HEX10 Colors</SelectorHeader>

            {[1, 2, 4, 8, 16].map((divisions) => (
              <SelectorItem
                key={divisions}
                divisionsLabel={divisionLabels[divisions]}
                divisions={divisions}
                isSelected={divisions === selectedDivisions}
                onClick={() => onItemClick(closePopup, divisions)}
              />
            ))}

            <SelectorHeader>HEX11 Colors</SelectorHeader>

            {[3, 5, 15].map((divisions) => (
              <SelectorItem
                key={divisions}
                divisionsLabel={divisionLabels[divisions]}
                divisions={divisions}
                isSelected={divisions === selectedDivisions}
                onClick={() => onItemClick(closePopup, divisions)}
              />
            ))}
          </div>
        )}
      />
    </div>
  );
}

function SelectorValue({
  divisionsLabel,
  divisions,
}: {
  divisionsLabel: string;
  divisions: number;
}): ReactNode {
  const colorCount = countColors(divisions);

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
          "w-[80px]",

          "text-[#ffffff]",
          "text-[20px]",
        )}
      >
        {divisionsLabel}
      </div>

      <div
        className={cx(
          "w-[80px]",

          "text-[#ffffff60]",
          "text-[12px]",
        )}
      >
        ({colorCount.toLocaleString()} Colors)
      </div>
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
  divisionsLabel,
  divisions,
  isSelected,
  onClick,
}: {
  divisionsLabel: string;
  divisions: number;
  isSelected: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
}) {
  const colorCount = countColors(divisions);

  return (
    <div
      className={cx(
        "hover:bg-[#ffffff10]",
        { "bg-[#ffffff10]": isSelected },

        "px-[30px]",
        "py-[15px]",

        "flex",
        "flex-row",

        "justify-center",
        "items-center",
        "gap-[10px]",

        "cursor-pointer",

        "transition-all",
      )}
      onClick={onClick}
    >
      <div
        className={cx(
          "w-[60px]",

          "text-[#ffffffc0]",
          "text-[15px]",
        )}
      >
        {divisionsLabel}
      </div>

      <div
        className={cx(
          "w-[80px]",

          "text-[#ffffff60]",
          "text-[12px]",
        )}
      >
        ({colorCount.toLocaleString()} Colors)
      </div>
    </div>
  );
}
