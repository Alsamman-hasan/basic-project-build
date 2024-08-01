import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useMediaQuery } from '../useMediaQuery/useMediaQuery';

interface UseModalProps {
  onClose?: () => void;
  isOpen?: boolean;
  animationDelay: number;
}

export function useModal({ animationDelay, isOpen, onClose }: UseModalProps) {
  const mobile = useMediaQuery('(max-width: 768px)');
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      document.body.style.overflow = 'hidden';
      if (!mobile) document.body.style.paddingRight = '7px';
    } else document.body.style.overflow = 'unset';
  }, [isOpen, mobile]);

  const close = useCallback(() => {
    if (onClose) {
      setIsClosing(true);
      timerRef.current = setTimeout(() => {
        onClose();
        setIsClosing(false);
        setIsMounted(false);
      }, animationDelay);
    }
  }, [animationDelay, onClose]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    },
    [close],
  );

  useEffect(() => {
    if (isOpen) window.addEventListener('keydown', onKeyDown);

    return () => {
      clearTimeout(timerRef.current);
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0px';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  return {
    close,
    isClosing,
    isMounted,
  };
}
