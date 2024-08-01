import React, { CSSProperties, memo, ReactNode, useMemo } from 'react';
import cls from './badge.module.scss';

export interface BadgeProps {
  count: number;
  hideZero?: boolean;
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
}

export const Badge = memo(
  ({
    children,
    count,
    style,
    className,
    hideZero = true,
    ...props
  }: BadgeProps) => {
    const hide = useMemo(() => hideZero && count === 0, [hideZero, count]);
    return (
      <div className={cls.container}>
        <div>{children}</div>
        {!hide && (
          <span
            className={cls.badge}
            style={{
              ...style,
            }}
            {...props}
          >
            {count}
          </span>
        )}
      </div>
    );
  },
);
