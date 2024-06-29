import cx from "classnames";
import { Selector } from "src/common-components";
import { SelectorHeader } from "./SelectorHeader";
import { SelectorItem } from "./SelectorItem";
import { SelectorValue } from "./SelectorValue";

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
