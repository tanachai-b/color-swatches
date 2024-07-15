import cx from "classnames";
import { useEffect, useMemo, useState } from "react";
import { Tabs, ToggleButton } from "src/common-components";
import { getShade, toHcl, toHcv, toHsl, toHsv } from "src/common-functions";
import { useTrigger } from "src/common-hooks";
import {
  Body,
  Card,
  CloseButton,
  ColorBlock,
  ColorWheel,
  Container,
  CopyButton,
  Detail,
  Field,
  Label,
  Preview,
  Value,
} from "./components";
import { getColor, getCoordinate } from "./functions";

export type ColorSystems = "HCL" | "HCL_V" | "HCV" | "HCV_V" | "HSL" | "HSL_V" | "HSV" | "HSV_V";

export function ColorPicker({
  appPrecision,
  appColor,
  onChange,
  onClose,
}: {
  appPrecision: number;
  appColor?: string;
  onChange: (color?: string) => void;
  onClose: () => void;
}) {
  const {
    tabs,
    tab,
    setTab,

    isStep,
    setIsStep,
    precision,

    isFlipped,
    setIsFlipped,
    system,

    angle,
    radius,
    height,

    previewColor,
    colorDetails,

    onDragWheel,
    onDragBlock,
  } = useColorPicker({
    appPrecision,
    appColor,
  });

  const triggerOnChange = useTrigger(() => onChange(previewColor));

  return (
    <Container>
      <Card isOpen={appColor != null}>
        <CloseButton theme={getShade(previewColor)} onClose={onClose} />

        <Preview color={previewColor} />

        <Tabs options={tabs} selected={tab} onSelect={setTab} />

        <Body>
          <div className={cx("relative", "grid")}>
            <ColorWheel
              system={system}
              precision={precision}
              height={height}
              pointer={{ angle, radius }}
              onDrag={onDragWheel}
              onDragStop={() => onChange(previewColor)}
            />

            <div className={cx("absolute")}>
              <ToggleButton
                icon="stairs_2"
                isActive={isStep}
                onClick={async () => {
                  setIsStep(!isStep);
                  triggerOnChange();
                }}
              />
            </div>

            <div className={cx("absolute", "self-end")}>
              <ToggleButton
                icon="sync"
                isActive={isFlipped}
                onClick={() => setIsFlipped(!isFlipped)}
              />
            </div>
          </div>

          <div className={cx("grid", "grid-cols-2")}>
            <ColorBlock
              system={system}
              precision={precision}
              angle={angle}
              pointer={{ radius, height }}
              onDrag={onDragBlock}
              onDragStop={() => onChange(previewColor)}
            />

            <Detail>
              <Field>
                <Label>{colorDetails[1].label}</Label>
                <Value>{colorDetails[1].value}</Value>
              </Field>

              <Field>
                <Label>{colorDetails[2].label}</Label>
                <Value>{colorDetails[2].value}</Value>
              </Field>

              <Field>
                <Label>{colorDetails[3].label}</Label>
                <Value>{colorDetails[3].value}</Value>
              </Field>
            </Detail>
          </div>
        </Body>

        <CopyButton previewColor={previewColor} />
      </Card>
    </Container>
  );
}

function useColorPicker({ appPrecision, appColor }: { appPrecision: number; appColor?: string }) {
  const tabs: ColorSystems[] = ["HCL", "HCV", "HSL", "HSV"];
  const [tab, setTab] = useState(0);

  const [isStep, setIsStep] = useState(false);
  const precision = isStep ? appPrecision : 255;

  const [isFlipped, setIsFlipped] = useState(false);
  const flippedSystem: { [system: string]: ColorSystems } = {
    HCL: "HCL_V",
    HCV: "HCV_V",
    HSL: "HSL_V",
    HSV: "HSV_V",
  };

  const system = useMemo(
    () => (isFlipped ? flippedSystem[tabs[tab]] : tabs[tab]),
    [tab, isFlipped],
  );

  const [angle, setAngle] = useState(0);
  const [radius, setRadius] = useState(0);
  const [height, setHeight] = useState(0);

  const previewColor = useMemo(
    () => getColor(system, angle, radius, height, precision),
    [angle, radius, height, precision],
  );
  const colorDetails = useMemo(() => getColorDetails(system, previewColor), [system, previewColor]);

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

    isStep,
    setIsStep,
    precision,

    isFlipped,
    setIsFlipped,
    system,

    angle,
    radius,
    height,

    previewColor,
    colorDetails,

    onDragWheel,
    onDragBlock,
  };
}

function getColorDetails(system: ColorSystems, color: string) {
  const detailSystems: { [system in ColorSystems]: string } = {
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
