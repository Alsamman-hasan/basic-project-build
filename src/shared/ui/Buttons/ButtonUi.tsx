/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-useless-fragment */
import {
  ButtonHTMLAttributes,
  forwardRef,
  memo,
  ReactNode,
  SVGProps,
} from 'react';
import cls from './Button.module.scss';
import { classNames } from '../../lib/classNames/classNames';
import { LoaderUi } from '../Loader/LoaderUi';

export type ButtonTheme = 'primary' | 'Quaternary' | 'secondary' | 'tertiary';
export type ButtonSize = 'M' | 'L';
export type ButtonLayout = 'TextOnly' | 'IconOnly' | 'IconBefore';

const themesClass: Record<ButtonTheme, string> = {
  Quaternary: cls.Quaternary,
  primary: cls.primary,
  secondary: cls.secondary,
  tertiary: cls.tertiary,
};

const sizeClass: Record<ButtonSize, string> = {
  L: cls.large,
  M: cls.medium,
};

const layoutClass: Record<ButtonLayout, string> = {
  IconBefore: cls.IconBefore,
  IconOnly: cls.iconOnly,
  TextOnly: cls.textOnly,
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  size?: ButtonSize;
  layOut: ButtonLayout;
  icon?: SVGProps<SVGSVGElement>;
  isLoading?: boolean;
  children?: ReactNode | string;
  name: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props: ButtonProps, ref) => {
    const {
      className,
      children,
      theme = 'primary',
      layOut = 'TextOnly',
      size = 'M',
      isLoading = false,
      name,
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
      <button
        ref={ref}
        {...otherProps}
        id={`${name}`}
        aria-label={`${name}-${new Date()}`}
        className={classNames(cls.Button, {}, classes)}
      >
        <>
          {layOut === 'IconBefore' && icon}
          {children && layOut !== 'IconOnly' ? <span> {children}</span> : icon}
          {!!isLoading && <LoaderUi className={cls.icon} />}
        </>
      </button>
    );
  },
);

export const ButtonUi = memo(Button);
