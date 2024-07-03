import cx from "classnames";
import { useState } from "react";
import { toHcl, toHcv, toHsl, toHsv, toRgb } from "src/common-functions";
import { Bar, BarChart, Label, Value } from "./BarChart";
import { Tabs } from "./Tabs";

export function Detail({ color }: { color?: string }) {
  const options = ["RGB", "HCL", "HCV", "HSL", "HSV"];
  const [selected, setSelected] = useState<string>("RGB");

  const rgb = toRgb(color ?? "#000000");
  const hcl = toHcl(color ?? "#000000");
  const hcv = toHcv(color ?? "#000000");
  const hsl = toHsl(color ?? "#000000");
  const hsv = toHsv(color ?? "#000000");

  return (
    <div
      className={cx(
        "grow",

        "flex",
        "flex-col",
      )}
    >
      <Tabs
        options={options}
        selected={options.indexOf(selected)}
        onSelect={(index) => setSelected(options[index])}
      />

      <div className={cx("p-[30px]")}>
        {selected === "RGB" && (
          <BarChart key="bar-chart">
            <Label>Red</Label>
            <Bar value={rgb.r / 255} />
            <Value value={rgb.r} isInteger={true} />

            <Label>Green</Label>
            <Bar value={rgb.g / 255} />
            <Value value={rgb.g} isInteger={true} />

            <Label>Blue</Label>
            <Bar value={rgb.b / 255} />
            <Value value={rgb.b} isInteger={true} />
          </BarChart>
        )}

        {selected === "HCL" && (
          <BarChart key="bar-chart">
            <Label>Hue</Label>
            <Bar value={hcl.h / 360} />
            <Value value={hcl.h} unit={"°"} />

            <Label>Chroma</Label>
            <Bar value={hcl.c / 100} />
            <Value value={hcl.c} unit={"%"} />

            <Label>Lightness</Label>
            <Bar value={hcl.l / 100} />
            <Value value={hcl.l} unit={"%"} />
          </BarChart>
        )}

        {selected === "HCV" && (
          <BarChart key="bar-chart">
            <Label>Hue</Label>
            <Bar value={hcv.h / 360} />
            <Value value={hcv.h} unit={"°"} />

            <Label>Chroma</Label>
            <Bar value={hcv.c / 100} />
            <Value value={hcv.c} unit={"%"} />

            <Label>Value</Label>
            <Bar value={hcv.l / 100} />
            <Value value={hcv.l} unit={"%"} />
          </BarChart>
        )}

        {selected === "HSL" && (
          <BarChart key="bar-chart">
            <Label>Hue</Label>
            <Bar value={hsl.h / 360} />
            <Value value={hsl.h} unit={"°"} />

            <Label>Saturation</Label>
            <Bar value={hsl.s / 100} />
            <Value value={hsl.s} unit={"%"} />

            <Label>Lightness</Label>
            <Bar value={hsl.l / 100} />
            <Value value={hsl.l} unit={"%"} />
          </BarChart>
        )}

        {selected === "HSV" && (
          <BarChart key="bar-chart">
            <Label>Hue</Label>
            <Bar value={hsv.h / 360} />
            <Value value={hsv.h} unit={"°"} />

            <Label>Saturation</Label>
            <Bar value={hsv.s / 100} />
            <Value value={hsv.s} unit={"%"} />

            <Label>Value</Label>
            <Bar value={hsv.v / 100} />
            <Value value={hsv.v} unit={"%"} />
          </BarChart>
        )}
      </div>
    </div>
  );
}
