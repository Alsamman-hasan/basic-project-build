/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

export const useDompurify = () => {
  const [dompurify, setDompurify] = useState<any | null>(null);

  useEffect(() => {
    import('dompurify').then(module => {
      setDompurify(() => module.default);
    });
  }, []);
  return dompurify;
};
