import { useEffect, useState } from "react";

export function useInterval(handler: () => void, timeout: number) {
  const [triggered, setTriggered] = useState({});

  useEffect(() => {
    const interval = setInterval(() => setTriggered({}), timeout);
    return () => clearInterval(interval);
  }, []);

  useEffect(handler, [triggered]);
}
