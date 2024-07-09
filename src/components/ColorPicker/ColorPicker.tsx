import cx from "classnames";
import { useEffect, useMemo, useState } from "react";
import { add, convertToHex, convertToRgb, multiply, round, toHcl } from "src/common-functions";
import {
  Backdrop,
  Body,
  Card,
  ColorBlock,
  ColorWheel,
  Container,
  Detail,
  Field,
  Label,
  Preview,
  Value,
} from "./components";

export function ColorPicker({
  isOpen,
  precision,
  initialColor,
  onChange,
  onClickBackdrop,
}: {
  isOpen: boolean;
  precision: number;
  initialColor?: string;
  onChange: (color: string) => void;
  onClickBackdrop: () => void;
}) {
  const {
    angle,
    radius,
    height,

    previewColor,
    hcl,

    onDragWheel,
    onDragBlock,

    handleClickBackdrop,
  } = useColorPicker({
    isOpen,
    precision,
    initialColor,
    onChange,
    onClickBackdrop,
  });

  return (
    <Container isOpen={isOpen}>
      <Backdrop isOpen={isOpen} onClick={handleClickBackdrop} />

      <Card isOpen={isOpen}>
        <Preview color={previewColor} />

        <Body>
          <ColorWheel
            precision={precision}
            height={height}
            pointer={{ angle, radius }}
            onDrag={onDragWheel}
          />

          <div className={cx("grid", "grid-cols-2")}>
            <ColorBlock
              precision={precision}
              angle={angle}
              pointer={{ radius, height }}
              onDrag={onDragBlock}
            />

            <Detail>
              <Field>
                <Label>Hue</Label>
                <Value>{hcl.h.toFixed(1) + " °"}</Value>
              </Field>

              <Field>
                <Label>Chroma</Label>
                <Value>{hcl.c.toFixed(1) + " %"}</Value>
              </Field>

              <Field>
                <Label>Lightness</Label>
                <Value>{hcl.l.toFixed(1) + " %"}</Value>
              </Field>
            </Detail>
          </div>
        </Body>
      </Card>
    </Container>
  );
}

function useColorPicker({
  isOpen,
  precision,
  initialColor,
  onChange,
  onClickBackdrop,
}: {
  isOpen: boolean;
  precision: number;
  initialColor?: string;
  onChange: (color: string) => void;
  onClickBackdrop: () => void;
}) {
  const [angle, setAngle] = useState(0);
  const [radius, setRadius] = useState(0);
  const [height, setHeight] = useState(0);

  const previewColor = useMemo(() => getColor(angle, radius, height), [angle, radius, height]);
  const hcl = useMemo(() => toHcl(previewColor), [previewColor]);

  function getColor(angle: number, radius: number, height: number) {
    return convertToHex(
      round(add(multiply(convertToRgb(angle), radius), height * (1 - radius)), precision),
      precision,
    );
  }

  useEffect(() => {
    if (!isOpen) return;

    const { h, c, l } = toHcl(initialColor ?? "#000000");

    const angle = h / 360;
    const radius = c / 100;

    const height0 = 1 - (100 - l - c / 2) / (100 - c || 1);
    const height = Math.round(height0 * 10 ** 10) / 10 ** 10;

    setAngle(angle);
    setRadius(radius);
    setHeight(height);
  }, [isOpen]);

  function onDragWheel(angle: number, radius: number): void {
    setAngle(angle);
    setRadius(radius);
  }

  function onDragBlock(radius: number, height: number): void {
    setRadius(radius);
    setHeight(height);
  }

  function handleClickBackdrop() {
    onChange(previewColor);
    onClickBackdrop();
  }

  return {
    angle,
    radius,
    height,

    previewColor,
    hcl,

    onDragWheel,
    onDragBlock,

    handleClickBackdrop,
  };
}
