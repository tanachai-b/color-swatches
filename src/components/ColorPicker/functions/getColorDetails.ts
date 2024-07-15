import { toHcl, toHcv, toHsl, toHsv } from "src/common-functions";
import { ColorSystems } from "../ColorPicker";

export function getColorDetails(system: ColorSystems, color: string) {
  const detailSystems: {
    [system in ColorSystems]: string;
  } = {
    HCL: "HCL",
    HCL_V: "HCL",
    HCV: "HCV",
    HCV_V: "HCV",
    HSL: "HSL",
    HSL_V: "HSL",
    HSV: "HSV",
    HSV_V: "HSV",
  };

  const getColorDetails: {
    [system: string]: (color: string) => {
      1: { label: string; value: string };
      2: { label: string; value: string };
      3: { label: string; value: string };
    };
  } = {
    HCL: (color: string) => {
      const hcl = toHcl(color);
      return {
        1: { label: "Hue", value: hcl.h.toFixed(1) + " °" },
        2: { label: "Chroma", value: hcl.c.toFixed(1) + " %" },
        3: { label: "Lightness", value: hcl.l.toFixed(1) + " %" },
      };
    },

    HCV: (color: string) => {
      const hcv = toHcv(color);
      return {
        1: { label: "Hue", value: hcv.h.toFixed(1) + " °" },
        2: { label: "Chroma", value: hcv.c.toFixed(1) + " %" },
        3: { label: "Value", value: hcv.v.toFixed(1) + " %" },
      };
    },

    HSL: (color: string) => {
      const hsl = toHsl(color);
      return {
        1: { label: "Hue", value: hsl.h.toFixed(1) + " °" },
        2: { label: "Saturation", value: hsl.s.toFixed(1) + " %" },
        3: { label: "Lightness", value: hsl.l.toFixed(1) + " %" },
      };
    },

    HSV: (color: string) => {
      const hsv = toHsv(color);
      return {
        1: { label: "Hue", value: hsv.h.toFixed(1) + " °" },
        2: { label: "Saturation", value: hsv.s.toFixed(1) + " %" },
        3: { label: "Value", value: hsv.v.toFixed(1) + " %" },
      };
    },
  };

  const detailSystem = detailSystems[system];
  const colorDetails = getColorDetails[detailSystem](color);

  return colorDetails;
}
