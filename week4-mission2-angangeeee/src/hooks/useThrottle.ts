import { useEffect, useRef, useState } from "react";

export default function useThrottle<T>(value: T, interval: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);

  const lastExecuted = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const now = Date.now();

    if (lastExecuted.current === 0) {
      lastExecuted.current = now;
      setThrottledValue(value);
      return;
    }

    const remaining = interval - (now - lastExecuted.current);

    if (remaining <= 0) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      setThrottledValue(value);
      lastExecuted.current = now;
    } else {
      timerRef.current = setTimeout(() => {
        setThrottledValue(value);
        lastExecuted.current = Date.now();
      }, remaining);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, interval]);

  return throttledValue;
}
