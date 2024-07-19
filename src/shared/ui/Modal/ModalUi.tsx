import { ReactNode } from 'react';
import cls from './Modal.module.scss';
import CrossIcon from '../../assets/icons/cross.svg';
import { classNames, Mods } from '../../lib/classNames/classNames';
import { Overlay } from '../Overlay';
import { Portal } from '../Portal/Portal';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';

export interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

const ANIMATION_DELAY = 250;

export const CustomModal = (props: ModalProps) => {
  const { children, className, isOpen, onClose, lazy } = props;

  const { close, isClosing, isMounted } = useModal({
    animationDelay: ANIMATION_DELAY,
    isOpen,
    onClose,
  });
  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  if (lazy && !isMounted) return null;

  return (
    <Portal>
      <div className={classNames(cls.Modal, mods, [className])}>
        <Overlay onClick={close} />
        <div className={cls.content}>
          <div className={cls.cross} onClick={close}>
            <CrossIcon />
          </div>
          {children}
        </div>
      </div>
    </Portal>
  );
};
