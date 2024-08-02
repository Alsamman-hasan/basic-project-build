import { CSSProperties, memo } from 'react';
import cls from './ErrorMessages.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

type ErrorType = 'desc' | 'P3';
type TextAlign = 'center' | 'left' | 'right';

export interface ErrorMessagesProps {
  className?: string;
  text: string;
  type: ErrorType;
  textAlign?: TextAlign;
  style?: CSSProperties;
}

const errorClass: Record<ErrorType, string> = {
  P3: cls.P3,
  desc: cls.desc,
};

const AlignClass: Record<TextAlign, string> = {
  center: cls.center,
  left: cls.left,
  right: cls.right,
};

export const ErrorMessage = memo((props: ErrorMessagesProps) => {
  const { className, text, type, textAlign = 'center', style } = props;
  const classess = [className, errorClass[type], AlignClass[textAlign]];
  return (
    <span style={style} className={classNames(cls.ErrorMessages, {}, classess)}>
      {text}
    </span>
  );
});
