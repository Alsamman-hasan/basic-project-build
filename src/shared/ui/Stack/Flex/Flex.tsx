import { memo, ReactNode } from 'react';
import { classNames, Mods } from '../../../lib/classNames/classNames';
import cls from './Flex.module.scss';

export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';

const justifyClass: Record<FlexJustify, string> = {
  start: cls.justifyStart,
  center: cls.justifyCenter,
  end: cls.justifyEnd,
  between: cls.justifyBetween,
};

const alignClass: Record<FlexAlign, string> = {
  start: cls.alignStart,
  center: cls.alignCenter,
  end: cls.alignEnd,
};

const directionClass: Record<FlexDirection, string> = {
  column: cls.derictionColumn,
  row: cls.derictionRow,
};

export interface FlexProps {
  className?: string;
  children: ReactNode;
  justify?: FlexJustify;
  align?: FlexAlign;
  direction: FlexDirection;
  gap?: number | string;
  max?: boolean;
}

export const Flex = memo((props: FlexProps) => {
  const {
    className,
    children,
    direction = 'row',
    align = 'center',
    justify = 'start',
    gap = 0,
    max,
  } = props;

  const classess = [className, justifyClass[justify], alignClass[align], directionClass[direction]];
  const mods: Mods = {
    [cls.max]: max,
  };
  return (
    <div style={{ gap }} className={classNames(cls.Flex, mods, classess)}>
      {children}
    </div>
  );
});
