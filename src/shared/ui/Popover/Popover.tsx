/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect, ReactNode, useCallback } from 'react';
import cls from './Popover.module.scss';
import { ButtonUi } from '../Buttons/ButtonUi';
import CatalogIcon from '@/shared/assets/icons/GroupCatalog.svg';
import Cross from '@/shared/assets/icons/cross.svg';

interface PopoverProps {
  children: ReactNode;
  onHandleOpen: (open: boolean) => void;
  open: boolean;
}

export const Popover = (props: PopoverProps) => {
  const { children, onHandleOpen, open } = props;
  const popoverRef = useRef<any>(null);
  const triggerRef = useRef<any>(null);

  const toggleVisibility = useCallback(() => {
    onHandleOpen(!open);
  }, [onHandleOpen, open]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current?.contains(event.target) &&
        !triggerRef?.current?.contains(event.target)
      )
        onHandleOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onHandleOpen]);

  return (
    <div className={cls.container}>
      <ButtonUi
        ref={triggerRef}
        name='test'
        style={{ padding: '0' }}
        theme='secondary'
        size='L'
        layOut='IconBefore'
        aria-haspopup='true'
        aria-expanded={open}
        aria-controls={cls.content}
        className={cls.menuBtn}
        icon={open ? <Cross /> : <CatalogIcon />}
        onClick={toggleVisibility}
      >
        КАТАЛОГ
      </ButtonUi>
      {!!open && (
        <div
          ref={popoverRef}
          id={cls.content}
          className={cls.content}
          role='dialog'
          aria-modal='true'
        >
          {children}
        </div>
      )}
    </div>
  );
};
