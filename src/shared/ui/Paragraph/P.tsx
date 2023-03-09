import { CSSProperties, memo, ReactNode } from "react";
import { classNames } from "../../lib/classNames/classNames";
import cls from "./P.module.scss";

export type pTypes = "P1" | "P2" | "P3" | "desc";

const PClass: Record<pTypes, string> = {
  P1: cls.P1,
  P2: cls.P2,
  P3: cls.P3,
  desc: cls.desc,
};

export interface PProps {
  tage: pTypes;
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
}

export const PTag = memo((props: PProps) => {
  const { className, children, tage = "P1", style } = props;
  const classess = [className, PClass[tage]];
  return (
    <p style={style} className={classNames("", {}, classess)}>
      {children}
    </p>
  );
});
