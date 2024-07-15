import cx from "classnames";
import { useMemo } from "react";
import { Tabs, ToggleButton } from "src/common-components";
import { getShade } from "src/common-functions";
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
import { getColorDetails } from "./functions";
import { useColorPicker } from "./useColorPicker";

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
  } = useColorPicker({
    appPrecision,
    appColor,
  });

  const colorDetails = useMemo(() => getColorDetails(system, previewColor), [system, previewColor]);

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
