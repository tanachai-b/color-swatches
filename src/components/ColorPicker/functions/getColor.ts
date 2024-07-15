import { add, convertToHex, convertToRgb, multiply, round } from "src/common-functions";
import { ColorSystems } from "../ColorPicker";

const converters: {
  [system in ColorSystems]: (
    angle: number,
    radius: number,
    height: number,
    precision: number,
  ) => string;
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

export function getColor(
  system: keyof typeof converters,
  angle: number,
  radius: number,
  height: number,
  precision: number,
) {
  const converter = converters[system];

  return converter(angle, radius, height, precision);
}

function hcl(angle: number, radius: number, height: number, precision: number) {
  return convertToHex(
    round(add(multiply(convertToRgb(angle), radius), (1 - radius) * height), precision),
    precision,
  );
}

function hcl_v(angle: number, radius: number, height: number, precision: number) {
  return convertToHex(
    round(add(multiply(convertToRgb(angle), height), (1 - radius) * (1 - height)), precision),
    precision,
  );
}

function hsl(angle: number, radius: number, height: number, precision: number) {
  return convertToHex(
    round(
      add(
        multiply(
          add(multiply(convertToRgb(angle), radius), (1 - radius) / 2),
          1 - Math.abs(height - 0.5) * 2,
        ),
        Math.max(height * 2 - 1, 0),
      ),
      precision,
    ),
    precision,
  );
}

function hsl_v(angle: number, radius: number, height: number, precision: number) {
  return convertToHex(
    round(
      add(
        multiply(
          add(multiply(convertToRgb(angle), height), (1 - height) / 2),
          1 - Math.abs(radius - 0.5) * 2,
        ),
        Math.max(-radius * 2 + 1, 0),
      ),
      precision,
    ),
    precision,
  );
}

function hsv(angle: number, radius: number, height: number, precision: number) {
  return convertToHex(
    round(multiply(add(multiply(convertToRgb(angle), radius), 1 - radius), height), precision),
    precision,
  );
}

function hsv_v(angle: number, radius: number, height: number, precision: number) {
  return convertToHex(
    round(multiply(add(multiply(convertToRgb(angle), height), 1 - height), radius), precision),
    precision,
  );
}
