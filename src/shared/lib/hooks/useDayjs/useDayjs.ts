/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

export const useDayjs = () => {
  const [dayjs, setDayjs] = useState<any | null>(null);

  useEffect(() => {
    import('dayjs').then(module => {
      setDayjs(() => module.default);
    });
  }, []);
  return dayjs;
};
