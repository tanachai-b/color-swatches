import cx from "classnames";
import { MouseEventHandler, ReactNode } from "react";
import { Selector } from "src/common-components";

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
        "w-[300px]",
      )}
    >
      <Selector
        label="Steps"
        value={<SelectorValue divisions={selectedDivisions} />}
        options={(closePopup) => (
          <div className={cx("py-[10px]", "flex", "flex-col")}>
            <SelectorHeader>HEX10 Divisble Colors</SelectorHeader>

            {[1, 2, 4, 8, 16].map((divisions) => (
              <SelectorItem
                key={divisions}
                divisions={divisions}
                isSelected={divisions === selectedDivisions}
                onClick={() => onItemClick(closePopup, divisions)}
              />
            ))}

            <SelectorHeader>HEX11 Divisble Colors</SelectorHeader>

            {[3, 5, 15].map((divisions) => (
              <SelectorItem
                key={divisions}
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

function SelectorValue({ divisions }: { divisions: number }): ReactNode {
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
          "w-[30px]",

          "text-[#ffffff]",
          "text-[20px]",
          "text-right",
        )}
      >
        {divisions}
      </div>

      <div
        className={cx(
          "w-[90px]",

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
          "w-[30px]",

          "text-[#ffffffc0]",
          "text-[15px]",
          "text-right",
        )}
      >
        {divisions}
      </div>

      <div
        className={cx(
          "w-[90px]",

          "text-[#ffffff60]",
          "text-[12px]",
        )}
      >
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
