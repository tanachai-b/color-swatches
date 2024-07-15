export function countColors(precision: number) {
  const colorCount = Array.from({ length: precision }).reduce<number>(
    (colorCount, _, index) => colorCount + (precision - index) * (index + 1) * 6,
    0,
  );

  return colorCount;
}
