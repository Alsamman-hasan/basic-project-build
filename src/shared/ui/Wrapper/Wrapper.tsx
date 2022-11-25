import { classNames } from 'shared/lib/classNames/classNames';
import { CSSProperties, memo, ReactNode } from 'react';
import cls from './Wrapper.module.scss';

export interface WrapperProps {
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
}

export const Wrapper = memo((props: WrapperProps) => {
  const { className, children, style } = props;
  return (
    <div style={style} className={classNames(cls.Wrapper, {}, [className])}>
      {children}
    </div>
  );
});
