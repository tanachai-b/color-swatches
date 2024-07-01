export function toRgb(hex: string) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  return { r, g, b };
}

export function toHcl(hex: string) {
  const { r, g, b } = toRgb(hex);

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  const h = hue(r, g, b, max);
  const c = ((max - min) / 255) * 100;
  const l = ((min + max) / 2 / 255) * 100;

  return { h, c, l };
}

export function toHcv(hex: string) {
  const { r, g, b } = toRgb(hex);

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  const h = hue(r, g, b, max);
  const c = ((max - min) / 255) * 100;
  const l = (max / 255) * 100;

  return { h, c, l };
}

export function toHsl(hex: string) {
  const { r, g, b } = toRgb(hex);

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  const h = hue(r, g, b, max);
  const s = ((max - min) / (Math.min(min + max, 255 - min + 255 - max) || 1)) * 100;
  const l = ((min + max) / 2 / 255) * 100;

  return { h, s, l };
}

export function toHsv(hex: string) {
  const { r, g, b } = toRgb(hex);

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  const h = hue(r, g, b, max);
  const s = ((max - min) / (max || 1)) * 100;
  const v = (max / 255) * 100;

  return { h, s, v };
}

function hue(r: number, g: number, b: number, max: number) {
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

  return (h + 360) % 360;

  function hsvSection(max: number, desc: number, asc: number) {
    if (desc > asc) {
      return ((desc - asc) / (max - asc)) * -60;
    } else {
      return ((asc - desc) / (max - desc)) * 60;
    }
  }
}
