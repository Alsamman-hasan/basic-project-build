import { memo } from 'react';
import cls from './LoaderUi.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

export interface LoaderUiProps {
  className?: string;
}
export const LoaderUi = memo((props: LoaderUiProps) => {
  const { className } = props;
  return <div className={classNames(cls.loaderUI, {}, [className])} />;
});
