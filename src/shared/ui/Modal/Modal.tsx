import React, {
  ReactNode,
  useRef,
  useState,
  useEffect,
  useCallback,
  MutableRefObject,
} from 'react';
import { classNames, Mods } from '../../lib/classNames/classNames';
import CrossIcon from '../../assets/icons/Close.svg';
import cls from './Modal.module.scss';
import { Portal } from '../Portal/Portal';
import { PTag } from '../Paragraph/P';
import { HStack } from '../Stack';

export interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
  closeTitle?: string;
}

const ANIMATION_DELAY = 300;

export const CustomModal = (props: ModalProps) => {
  const { children, className, isOpen, onClose, lazy, closeTitle } = props;
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const timeRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true);
      timeRef.current = setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, ANIMATION_DELAY);
    }
  }, [onClose]);

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeHandler();
      }
    },
    [closeHandler]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      clearTimeout(timeRef.current);
    };
  }, [isOpen, onKeyDown]);

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div className={classNames(cls.Modal, mods, [className, 'app_modal'])}>
        <div className={cls.overlay} onClick={closeHandler}>
          <div className={cls.contetn} onClick={onContentClick}>
            <HStack gap={0.125} className={cls.icon} onClick={closeHandler}>
              <CrossIcon />
              {closeTitle && <PTag tage="12Reg">{closeTitle}</PTag>}
            </HStack>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
