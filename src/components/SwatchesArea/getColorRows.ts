import { add, convertToHex, convertToRgb, multiply } from "src/common-functions";

export function getColorRows(precision: number) {
  const rgbColorRows = factorArray(precision + 1, (chroma, rowIndex) =>
    factorArray((precision - rowIndex) * 6 + 1, (hue) =>
      factorArray(rowIndex + 1, (lightness) =>
        add(multiply(convertToRgb(hue), 1 - chroma), lightness * chroma),
      ),
    )
      .slice(0, -1)
      .flat(),
  ).slice(0, -1);

  const colorRows = rgbColorRows.map((colorRow) =>
    colorRow.map((rgbColor) => convertToHex(rgbColor, precision)),
  );

  return colorRows;
}

function factorArray<T>(length: number, onGetValues: (factor: number, index: number) => T) {
  return Array.from({ length }, (_, i) => {
    const factor = i / (length - 1 || 1);

    return onGetValues(factor, i);
  });
}
