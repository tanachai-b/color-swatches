import { useEffect, useState } from "react";

export function useTrigger(callback: () => void) {
  const [triggered, trigger] = useState<object>();

  useEffect(callback, [triggered]);

  return () => trigger({});
}
