/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

export const useSlider = () => {
  const [Slider, setSlider] = useState<any | null>(null);

  useEffect(() => {
    import('react-slick').then(module => {
      setSlider(() => module.default);
    });
  }, []);
  if (!Slider) return null;
  return Slider;
};
