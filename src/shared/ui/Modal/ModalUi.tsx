import { ReactNode } from "react";
import { classNames, Mods } from "../../lib/classNames/classNames";
import cls from "./Modal.module.scss";
import { Portal } from "../Portal/Portal";
import { useModal } from "@/shared/lib/hooks/useModal/useModal";
import { Overlay } from "../Overlay";
import CrossIcon from "../../assets/icons/cross.svg";

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
    onClose,
    isOpen,
  });
  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div className={classNames(cls.Modal, mods, [className, "app_modal"])}>
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
