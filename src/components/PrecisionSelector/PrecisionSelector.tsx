import cx from "classnames";
import { Selector } from "src/common-components";
import { countColors } from "src/common-functions";
import { SelectorHeader } from "./SelectorHeader";
import { SelectorItem } from "./SelectorItem";
import { SelectorValue } from "./SelectorValue";

export function PrecisionSelector({
  selectedPrecision,
  onSelect,
}: {
  selectedPrecision: number;
  onSelect: (precision: number) => void;
}) {
  function onItemClick(closePopup: () => void, precision: number) {
    closePopup();
    onSelect(precision);
  }

  return (
    <div
      className={cx(
        "absolute",

        "place-self-center",
        "top-[50px]",
      )}
    >
      <Selector
        label="Precision"
        value={
          <SelectorValue
            precision={selectedPrecision}
            colorCount={countColors(selectedPrecision)}
          />
        }
        popup={(closePopup) => (
          <>
            <SelectorHeader>HEX11 Base</SelectorHeader>

            {[1, 3, 5, 15].map((precision) => (
              <SelectorItem
                key={precision}
                precision={precision}
                colorCount={countColors(precision)}
                isSelected={precision === selectedPrecision}
                onClick={() => onItemClick(closePopup, precision)}
              />
            ))}

            <SelectorHeader>HEX10 Base</SelectorHeader>

            {[2, 4, 8, 16].map((precision) => (
              <SelectorItem
                key={precision}
                precision={precision}
                colorCount={countColors(precision)}
                isSelected={precision === selectedPrecision}
                onClick={() => onItemClick(closePopup, precision)}
              />
            ))}
          </>
        )}
      />
    </div>
  );
}
