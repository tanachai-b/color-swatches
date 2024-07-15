import { useEffect, useMemo, useState } from "react";
import { ColorSystems } from "./ColorPicker";
import { getColor, getCoordinate } from "./functions";

export function useColorPicker({
  appPrecision,
  appColor,
}: {
  appPrecision: number;
  appColor?: string;
}) {
  const tabs: ColorSystems[] = ["HCL", "HCV", "HSL", "HSV"];
  const flippedSystem: { [system: string]: ColorSystems } = {
    HCL: "HCL_V",
    HCV: "HCV_V",
    HSL: "HSL_V",
    HSV: "HSV_V",
  };

  const [tab, setTab] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const system = useMemo(
    () => (isFlipped ? flippedSystem[tabs[tab]] : tabs[tab]),
    [tab, isFlipped],
  );

  const [angle, setAngle] = useState(0);
  const [radius, setRadius] = useState(0);
  const [height, setHeight] = useState(0);

  const [isStep, setIsStep] = useState(false);
  const precision = isStep ? appPrecision : 255;

  const previewColor = useMemo(
    () => getColor(system, angle, radius, height, precision),
    [angle, radius, height, precision],
  );

  useEffect(() => {
    if (appColor == null) return;

    const { angle, radius, height } = getCoordinate(system, appColor);

    setAngle(angle);
    setRadius(radius);
    setHeight(height);
  }, [appColor]);

  useEffect(() => {
    const { angle, radius, height } = getCoordinate(system, previewColor);

    setAngle(angle);
    setRadius(radius);
    setHeight(height);
  }, [system]);

  function onDragWheel(angle: number, radius: number) {
    setAngle(angle);
    setRadius(radius);
  }

  function onDragBlock(radius: number, height: number) {
    setRadius(radius);
    setHeight(height);
  }

  return {
    tabs,
    tab,
    setTab,

    isFlipped,
    setIsFlipped,
    system,

    angle,
    radius,
    height,

    isStep,
    setIsStep,
    precision,

    previewColor,

    onDragWheel,
    onDragBlock,
  };
}
