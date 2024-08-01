import { CSSProperties, memo, ReactNode, Suspense, useCallback } from 'react';
import cls from './SuspenseWrapper.module.scss';
import { LoaderUi } from '../Loader/LoaderUi';
import { VStack } from '../Stack';
import { classNames } from '@/shared/lib/classNames/classNames';

export interface SuspenseWrapperProps {
  children: ReactNode;
  loader?: ReactNode;
  className?: string;
  loaderStyle?: CSSProperties;
}
export const SuspenseWrapper = memo((props: SuspenseWrapperProps) => {
  const { children, loader, className, loaderStyle } = props;
  const loaderUI = useCallback(
    () => (
      <VStack
        max
        style={{ ...loaderStyle }}
        justify='center'
        align='center'
        className={classNames(cls.loader, {}, [className])}
      >
        <LoaderUi />
      </VStack>
    ),
    [className, loaderStyle],
  );
  return <Suspense fallback={loader ?? loaderUI()}>{children}</Suspense>;
});
