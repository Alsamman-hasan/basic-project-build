/* eslint-disable react/jsx-no-useless-fragment */
import { ButtonHTMLAttributes, memo, ReactNode, SVGProps } from 'react';
import { classNames } from '../../lib/classNames/classNames';
import cls from './Button.module.scss';

export type ButtonTheme = 'ghost' | 'primary' | 'outline' | 'secondary';
export type ButtonSize = 'M' | 'L';
export type ButtonLayout = 'TextOnly' | 'IconOnly' | 'IconBefor' | 'IconAfter';

const themesClass: Record<ButtonTheme, string> = {
  ghost: cls.ghost,
  outline: cls.outline,
  primary: cls.primary,
  secondary: cls.secondary,
};

const sizeClass: Record<ButtonSize, string> = {
  L: cls.large,
  M: cls.medium,
};

const layoutClass: Record<ButtonLayout, string> = {
  IconAfter: cls.iconAfter,
  IconBefor: cls.iconBefor,
  IconOnly: cls.iconOnly,
  TextOnly: cls.textOnly,
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  size?: ButtonSize;
  layOut: ButtonLayout;
  icon?: SVGProps<SVGSVGElement>;
  children: ReactNode | string;
}

export const ButtonUi = memo((props: ButtonProps) => {
  const {
    className,
    children,
    theme = 'primary',
    layOut = 'TextOnly',
    size = 'M',
    icon,
    ...otherProps
  } = props;

  const classes = [
    className,
    themesClass[theme],
    sizeClass[size],
    layoutClass[layOut],
  ];

  return (
    <button {...otherProps} className={classNames(cls.Button, {}, classes)}>
      <>
        {layOut === 'IconBefor' && icon}
        {children && layOut !== 'IconOnly' ? <span> {children}</span> : icon}
        {layOut === 'IconAfter' && icon}
      </>
    </button>
  );
});
