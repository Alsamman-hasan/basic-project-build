import { CSSProperties, HTMLAttributes, memo, ReactNode } from 'react';
import cls from './Flex.module.scss';
import { classNames, Mods } from '../../../lib/classNames/classNames';

export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';

const justifyClass: Record<FlexJustify, string> = {
  around: cls.justifyAround,
  between: cls.justifyBetween,
  center: cls.justifyCenter,
  end: cls.justifyEnd,
  start: cls.justifyStart,
};

const alignClass: Record<FlexAlign, string> = {
  center: cls.alignCenter,
  end: cls.alignEnd,
  start: cls.alignStart,
};

const directionClass: Record<FlexDirection, string> = {
  column: cls.depictionColumn,
  row: cls.depictionRow,
};

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  justify?: FlexJustify;
  align?: FlexAlign;
  direction: FlexDirection;
  gap?: number | string;
  max?: boolean;
  style?: CSSProperties;
}

export const Flex = memo((props: FlexProps) => {
  const {
    className,
    children,
    direction = 'row',
    align = 'center',
    justify = 'start',
    gap = 0,
    style,
    max,
    ...otherProps
  } = props;

  const classess = [
    className,
    justifyClass[justify],
    alignClass[align],
    directionClass[direction],
  ];
  const mods: Mods = {
    [cls.max]: max,
  };
  return (
    <div
      style={{ ...style, gap: `${Number(gap) * 10}px` }} // значение gap  вычитывается из файла rest.scss свойство  font-size: 0.85vw; // ( 13.6 / 16) * 100, один rem  = 13,6px
      className={classNames(cls.Flex, mods, classess)}
      {...otherProps}
    >
      {children}
    </div>
  );
});
