import { CSSProperties, HTMLAttributes, memo, ReactNode } from 'react';
import cls from './P.module.scss';
import { classNames } from '../../lib/classNames/classNames';

export type pTypes = 'P1' | 'P2' | 'P3' | 'desc';

const PClass: Record<pTypes, string> = {
  P1: cls.Pf,
  P2: cls.Ps,
  P3: cls.Pth,
  desc: cls.desc,
};

export interface PProps extends HTMLAttributes<HTMLParagraphElement> {
  tage: pTypes;
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
}

export const PTag = memo((props: PProps) => {
  const { className, children, tage = 'P1', style } = props;
  const classess = [className, PClass[tage]];
  return (
    <p style={style} className={classNames('', {}, classess)}>
      {children}
    </p>
  );
});
