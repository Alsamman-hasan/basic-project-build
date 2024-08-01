import { memo } from 'react';
import cls from './ProductSkeleton.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

export interface ProductSkeletonProps {
  className?: string;
}
export const ProductSkeleton = memo((props: ProductSkeletonProps) => {
  const { className } = props;
  return (
    <div className={classNames(cls.ProductSkeleton, {}, [className])}>
      <div />
    </div>
  );
});
