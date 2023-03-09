/* eslint-disable react/jsx-no-useless-fragment */
import { CircularProgress } from "@mui/material";
import { ButtonHTMLAttributes, memo, ReactNode, SVGProps } from "react";
import { classNames } from "../../lib/classNames/classNames";
import cls from "./Button.module.scss";

export type ButtonTheme = "primary" | "Quaternary" | "secondary";
export type ButtonSize = "M" | "L";
export type ButtonLayout = "TextOnly" | "IconOnly" | "IconBefor";

const themesClass: Record<ButtonTheme, string> = {
  Quaternary: cls.Quaternary,
  primary: cls.primary,
  secondary: cls.secondary,
};

const sizeClass: Record<ButtonSize, string> = {
  L: cls.large,
  M: cls.medium,
};

const layoutClass: Record<ButtonLayout, string> = {
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
  isLoading?: boolean;
  children: ReactNode | string;
  name: string;
}

export const ButtonUi = memo((props: ButtonProps) => {
  const {
    className,
    children,
    theme = "primary",
    layOut = "TextOnly",
    size = "M",
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
      {...otherProps}
      id={`${name}`}
      aria-label={`${name}-${new Date()}`}
      className={classNames(cls.Button, {}, classes)}
    >
      <>
        {layOut === "IconBefor" && icon}
        {children && layOut !== "IconOnly" ? <span> {children}</span> : icon}
        {isLoading && <CircularProgress size={17} color="info" />}
      </>
    </button>
  );
});
