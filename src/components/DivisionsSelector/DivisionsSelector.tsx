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
          <SelectorValue divisionsLabel={`${selectedDivisions}`} divisions={selectedDivisions} />
        }
        options={(closePopup) => (
          <>
            <SelectorHeader>HEX11 Base</SelectorHeader>

            {[1, 3, 5, 15].map((divisions) => (
              <SelectorItem
                key={divisions}
                divisionsLabel={`${divisions}`}
                divisions={divisions}
                isSelected={divisions === selectedDivisions}
                onClick={() => onItemClick(closePopup, divisions)}
              />
            ))}

            <SelectorHeader>HEX10 Base</SelectorHeader>

            {[2, 4, 8, 16].map((divisions) => (
              <SelectorItem
                key={divisions}
                divisionsLabel={`${divisions}`}
                divisions={divisions}
                isSelected={divisions === selectedDivisions}
                onClick={() => onItemClick(closePopup, divisions)}
              />
            ))}
          </>
        )}
      />
    </div>
  );
}
