/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

export const useWatermark = () => {
  const [Watermark, setWatermark] = useState<any | null>(null);

  useEffect(() => {
    import('@uiw/react-watermark').then(module => {
      setWatermark(() => module.default);
    });
  }, []);
  return Watermark;
};
