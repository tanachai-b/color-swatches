import { toHcl, toHsl, toHsv } from "src/common-functions";
import { ColorSystems } from "../ColorPicker";

const converters: {
  [system in ColorSystems]: (color: string) => { angle: number; radius: number; height: number };
} = {
  HCL: hcl,
  HCL_V: hcl_v,
  HCV: hcl,
  HCV_V: hcl_v,
  HSL: hsl,
  HSL_V: hsl_v,
  HSV: hsv,
  HSV_V: hsv_v,
};

export function getCoordinate(system: keyof typeof converters, color: string) {
  const converter = converters[system];

  return converter(color);
}

function hcl(initialColor: string) {
  const { h, c, l } = toHcl(initialColor);

  const angle = h / 360;
  const radius = c / 100;

  const height0 = 1 - (100 - l - c / 2) / (100 - c || 1);
  const height = Math.round(height0 * 10 ** 10) / 10 ** 10;

  return { angle, radius, height };
}

function hcl_v(initialColor: string) {
  const { h, c, l } = toHcl(initialColor);

  const angle = h / 360;

  const radius0 = 1 - (l - c / 2) / (100 - c || 1);
  const radius = Math.round(radius0 * 10 ** 10) / 10 ** 10;

  const height = c / 100;

  return { angle, radius, height };
}

function hsl(initialColor: string) {
  const { h, s, l } = toHsl(initialColor);

  const angle = h / 360;
  const radius = s / 100;
  const height = l / 100;

  return { angle, radius, height };
}

function hsl_v(initialColor: string) {
  const { h, s, l } = toHsl(initialColor);

  const angle = h / 360;
  const radius = 1 - l / 100;
  const height = s / 100;

  return { angle, radius, height };
}

function hsv(initialColor: string) {
  const { h, s, v } = toHsv(initialColor);

  const angle = h / 360;
  const radius = s / 100;
  const height = v / 100;

  return { angle, radius, height };
}

function hsv_v(initialColor: string) {
  const { h, s, v } = toHsv(initialColor);

  const angle = h / 360;
  const radius = v / 100;
  const height = s / 100;

  return { angle, radius, height };
}
