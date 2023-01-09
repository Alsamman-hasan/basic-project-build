import { CSSProperties, memo, ReactNode } from 'react';
import { classNames } from '../../lib/classNames/classNames';
import cls from './P.module.scss';

export type pTypes = '14Reg' | '14SemiBold' | '12SemiBold' | '12Reg';

const PClass: Record<pTypes, string> = {
  '12Reg': cls.Reg12,
  '12SemiBold': cls.SemiBold12,
  '14Reg': cls.Reg14,
  '14SemiBold': cls.SemiBold14,
};

export interface PProps {
  tage: pTypes;
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
}

export const PTag = memo((props: PProps) => {
  const { className, children, tage = '14Reg', style } = props;
  const classess = [className, PClass[tage]];
  return (
    <p style={style} className={classNames('', {}, classess)}>
      {children}
    </p>
  );
});
