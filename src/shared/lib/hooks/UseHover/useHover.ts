/* eslint-disable consistent-return */

import { RefObject, useEffect, useState } from 'react';

export function useHover(ref: RefObject<HTMLElement>) {
  const [isHovering, setHovering] = useState(false);

  const on = () => setHovering(true);
  const off = () => setHovering(false);

  useEffect(() => {
    if (!ref.current) return;

    const node = ref.current;

    node.addEventListener('mouseenter', on);
    node.addEventListener('mousemove', on);
    node.addEventListener('mouseleave', off);

    return () => {
      node.removeEventListener('mouseenter', on);
      node.removeEventListener('mousemove', on);
      node.removeEventListener('mouseleave', off);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isHovering;
}
