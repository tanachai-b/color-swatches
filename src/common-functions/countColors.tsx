export function countColors(divisions: number) {
  const colorCount = Array.from({ length: divisions }).reduce<number>(
    (colorCount, _, index) => colorCount + (divisions - index) * (index + 1) * 6,
    0,
  );

  return colorCount;
}
