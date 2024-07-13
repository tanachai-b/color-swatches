import { useEffect, useState } from "react";
import { Container, CopyButton, Detail, Preview } from "./components";

export function DetailPopup({ color }: { color?: string }) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => setIsCopied(false), [color]);

  function onClickCopy() {
    setIsCopied(true);
    navigator.clipboard.writeText(color ?? "");
  }

  return (
    <Container isOpen={color != null}>
      <Preview color={color ?? "#808080"} />

      <Detail color={color ?? "#808080"} />

      <CopyButton isCopied={isCopied} onClick={onClickCopy} />
    </Container>
  );
}
