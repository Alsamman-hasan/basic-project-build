import { memo, useMemo } from 'react';
import cls from './Tags.module.scss';
import { classNames } from '../../lib/classNames/classNames';
import { PTag } from '../Paragraph/P';

export type TagsType = 'Новинка' | 'Акция' | 'Бестселлер';

const TagsClass: Record<TagsType, string> = {
  Акция: cls.promotion,
  Бестселлер: cls.Bestseller,
  Новинка: cls.new,
};

export interface TagsProps {
  className?: string;
  isPromo: boolean;
  isBestseller: boolean;
  isNew: boolean;
}

export const Tags = memo((props: TagsProps) => {
  const { className, isBestseller, isNew, isPromo } = props;
  const labels: TagsType = useMemo(() => {
    if (isBestseller) return 'Бестселлер';
    if (isNew) return 'Новинка';
    return 'Акция';
  }, [isBestseller, isNew]);
  const classes = [className, TagsClass[labels]];
  return (
    <div className={classNames(cls.Tags, {}, classes)}>
      <PTag tage='desc'>{labels}</PTag>
    </div>
  );
});
