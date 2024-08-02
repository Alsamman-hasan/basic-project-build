import { memo } from 'react';
import cls from './InfoMessage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

type infoType = 'desc' | 'P3';

const infoClass: Record<infoType, string> = {
  P3: cls.P3,
  desc: cls.desc,
};
export interface InfoMessageProps {
  className?: string;
  text: string;
  type: infoType;
}
export const InfoMessage = memo((props: InfoMessageProps) => {
  const { className, text, type } = props;
  const classess = [className, infoClass[type]];
  return (
    <span className={classNames(cls.InfoMessages, {}, classess)}>{text}</span>
  );
});
