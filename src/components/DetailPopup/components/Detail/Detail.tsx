import cx from "classnames";
import { useState } from "react";
import { toHcl, toHcv, toHsl, toHsv, toRgb } from "src/common-functions";
import { Bar, BarChart, Label, Value } from "./BarChart";
import { Tabs } from "./Tabs";

export function Detail({ color = "#000000" }: { color?: string }) {
  const options = ["RGB", "HCL", "HCV", "HSL", "HSV"];

  const [selected, setSelected] = useState<string>("RGB");

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
        {selected === "RGB" && getRgbBarChart(color)}

        {selected === "HCL" && getHclBarChart(color)}

        {selected === "HCV" && getHcvBarChart(color)}

        {selected === "HSL" && getHslBarChart(color)}

        {selected === "HSV" && getHsvBarChart(color)}
      </div>
    </div>
  );
}

function getRgbBarChart(color: string) {
  const rgb = toRgb(color);

  return (
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
  );
}

function getHclBarChart(color: string) {
  const hcl = toHcl(color);

  return (
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
  );
}

function getHcvBarChart(color: string) {
  const hcv = toHcv(color);

  return (
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
  );
}

function getHslBarChart(color: string) {
  const hsl = toHsl(color);

  return (
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
  );
}

function getHsvBarChart(color: string) {
  const hsv = toHsv(color);

  return (
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
  );
}
