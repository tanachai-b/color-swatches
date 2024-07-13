import cx from "classnames";
import { Selector } from "src/common-components";
import { countColors } from "src/common-functions";
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
    <div className={cx("w-[250px]")}>
      <Selector
        label="Color Distance"
        value={
          <SelectorValue
            distance={getDistance(selectedPrecision)}
            colorCount={countColors(selectedPrecision)}
          />
        }
        popup={(closePopup) => (
          <>
            {[1, 2, 3, 4, 5, 8, 15, 16].map((precision) => (
              <SelectorItem
                key={precision}
                isSelected={precision === selectedPrecision}
                onClick={() => onItemClick(closePopup, precision)}
              >
                <SelectorValue
                  distance={getDistance(precision)}
                  colorCount={countColors(precision)}
                />
              </SelectorItem>
            ))}
          </>
        )}
      />
    </div>
  );
}

function getDistance(precision: number): number {
  const is255Divisible = 255 / precision === Math.floor(255 / precision);
  const max = is255Divisible ? 255 : 256;

  const distance = max / precision;

  return distance;
}
