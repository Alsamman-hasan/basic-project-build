import { memo, useCallback } from 'react';
import cls from './Burger.module.scss';
import { classNames, Mods } from '../../lib/classNames/classNames';

export interface BurgerProps {
  className?: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const BurgerUI = (props: BurgerProps) => {
  const { className, open, onOpen, onClose, ...otherProps } = props;

  const mods: Mods = {
    [cls.opened]: open,
  };

  const onClickHandle = useCallback(() => {
    if (open) onClose();

    onOpen();
  }, [onClose, onOpen, open]);

  return (
    // eslint-disable-next-line react/button-has-type
    <button
      name='burger'
      aria-label={`burger-${new Date()}`}
      className={classNames(cls.Burger, mods, [className])}
      onClick={onClickHandle}
      {...otherProps}
    >
      <span />
      <span />
      <span />
    </button>
  );
};

export const Burger = memo(BurgerUI);
