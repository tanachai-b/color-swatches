export function getColorRows(precision: number) {
  const rgbColorRows = factorArray(precision + 1, (saturation, rowIndex) =>
    factorArray((precision - rowIndex) * 6 + 1, (hue) =>
      factorArray(rowIndex + 1, (brightness) =>
        add(multiply(convertToRgb(hue), 1 - saturation), brightness * saturation),
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

function convertToRgb(hue: number) {
  const section = Math.floor(hue * 6) % 6;
  const gradient = -Math.abs((hue % (1 / 3)) * 3 * 2 - 1) + 1;

  if (section === 0) {
    return { red: 1, green: gradient, blue: 0 };
  } else if (section === 1) {
    return { red: gradient, green: 1, blue: 0 };
  } else if (section === 2) {
    return { red: 0, green: 1, blue: gradient };
  } else if (section === 3) {
    return { red: 0, green: gradient, blue: 1 };
  } else if (section === 4) {
    return { red: gradient, green: 0, blue: 1 };
  } else if (section === 5) {
    return { red: 1, green: 0, blue: gradient };
  }

  return { red: 0.5, green: 0.5, blue: 0.5 };
}

function add({ red, green, blue }: { red: number; green: number; blue: number }, value: number) {
  return {
    red: red + value,
    green: green + value,
    blue: blue + value,
  };
}

function multiply(
  { red, green, blue }: { red: number; green: number; blue: number },
  value: number,
) {
  return {
    red: red * value,
    green: green * value,
    blue: blue * value,
  };
}

function convertToHex(
  { red, green, blue }: { red: number; green: number; blue: number },
  precision: number = 255,
) {
  const isDivisible256 = Math.round(256 / precision) === 256 / precision;
  const maxValue = isDivisible256 ? 256 : 255;

  const red1 = Math.min(Math.round(red * maxValue), 255);
  const green1 = Math.min(Math.round(green * maxValue), 255);
  const blue1 = Math.min(Math.round(blue * maxValue), 255);

  return (
    "#" +
    red1.toString(16).padStart(2, "0") +
    green1.toString(16).padStart(2, "0") +
    blue1.toString(16).padStart(2, "0")
  );
}
