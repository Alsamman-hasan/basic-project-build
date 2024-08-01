import { ReactNode, memo, useCallback } from 'react';
import cls from './Content.module.scss';
import { EmptyState } from '../EmptyState/EmptyState';
import { ErrorMessage } from '../Messages';
import { VStack } from '../Stack';

export interface ErrorMessage {
  error?: string[] | string;
  text?: string;
}

export interface ContentProps {
  className?: string;
  isEmpty: boolean;
  isLoading?: boolean;
  LoadingContent?: ReactNode;
  children?: ReactNode;
  emptyText: string;
  errorMessage?: ErrorMessage;
}
export const Content = memo((props: ContentProps) => {
  const {
    className,
    isEmpty,
    isLoading,
    LoadingContent,
    emptyText,
    children,
    errorMessage,
  } = props;
  const content = useCallback(() => {
    if (isLoading) return LoadingContent;
    if (isEmpty) return <EmptyState message={emptyText} />;
    if (errorMessage?.error?.length)
      return (
        <VStack className={cls.error} gap={1.5}>
          <ErrorMessage
            text={errorMessage.text || ''}
            type='P3'
            textAlign='center'
          />
        </VStack>
      );
    return children;
  }, [LoadingContent, children, emptyText, errorMessage, isEmpty, isLoading]);
  return content();
});
