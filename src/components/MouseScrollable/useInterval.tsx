import { useEffect, useState } from "react";

export function useInterval(handler: () => void, timeout: number) {
  const [triggered, triggers] = useState({});

  useEffect(() => {
    const interval = setInterval(() => triggers({}), timeout);
    return () => clearInterval(interval);
  }, []);

  useEffect(handler, [triggered]);
}
