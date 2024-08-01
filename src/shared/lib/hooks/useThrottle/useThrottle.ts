/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef } from 'react';

export const useThrottle = (callback: (args: any) => void, delay: number) => {
  const isThrottled = useRef(false);

  const throttledCallback = useCallback(
    (...args: any) => {
      if (isThrottled.current) return;

      callback(args);
      isThrottled.current = true;
      setTimeout(() => {
        isThrottled.current = false;
      }, delay);
    },
    [callback, delay],
  );
  return throttledCallback;
};
