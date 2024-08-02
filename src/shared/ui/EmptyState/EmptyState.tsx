import { ReactNode, memo } from 'react';
import cls from './EmptyState.module.scss';
import { Htag } from '../Htage/Htage';
import { VStack } from '../Stack';
import { classNames } from '@/shared/lib/classNames/classNames';

export interface EmptyStateProps {
  className?: string;
  message: string;
  children?: ReactNode;
}
export const EmptyState = memo((props: EmptyStateProps) => {
  const { className, children, message } = props;
  return (
    <VStack
      max
      justify='center'
      align='center'
      className={classNames(cls.EmptyState, {}, [className])}
    >
      <Htag tage='h2'>{message}</Htag>
      {children || null}
    </VStack>
  );
});
