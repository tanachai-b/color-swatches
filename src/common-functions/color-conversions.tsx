export function rgb(hex: string) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  return { r, g, b };
}

export function hsv(hex: string) {
  const { r, g, b } = rgb(hex);

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  let h = 0;
  if (r === g && g === b) {
    h = 0;
  } else if (r === max) {
    h = hsvSection(r, b, g);
  } else if (g === max) {
    h = 120 + hsvSection(g, r, b);
  } else if (b === max) {
    h = 240 + hsvSection(b, g, r);
  }
  h = (h + 360) % 360;

  const s = ((max - min) / (max || 1)) * 100;
  const v = (max / 255) * 100;

  return { h, s, v };

  function hsvSection(max: number, desc: number, asc: number) {
    if (desc > asc) {
      return ((desc - asc) / (max - asc)) * -60;
    } else {
      return ((asc - desc) / (max - desc)) * 60;
    }
  }
}
