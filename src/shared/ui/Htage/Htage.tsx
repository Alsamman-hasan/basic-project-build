import { CSSProperties, memo, ReactNode } from "react";
import { classNames } from "../../lib/classNames/classNames";
import cls from "./Htage.module.scss";

export type hTypes = "h1" | "h2" | "h3";

const HClass: Record<hTypes, string> = {
  h1: cls.h1,
  h2: cls.h2,
  h3: cls.h3,
};

export interface HtageProps {
  className?: string;
  tage: hTypes;
  children: ReactNode;
  style?: CSSProperties;
}

export const Htag = memo((props: HtageProps): JSX.Element => {
  const { children, tage = "h1", className, style, ...othreProps } = props;
  const classess = [className, HClass[tage]];
  return (
    <span
      style={style}
      {...othreProps}
      className={classNames("", {}, classess)}
    >
      {children}
    </span>
  );
});
