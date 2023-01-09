import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Wrapper } from '@/shared/ui/Wrapper/Wrapper';
import cls from './NotfoundPage.module.scss';

export interface NotfoundPageProps {
  className?: string;
}
export const NotfoundPage = memo(({ className }: NotfoundPageProps) => {
  return (
    <Wrapper className={classNames(cls.NotfoundPage, {}, [className])}>
      Страница не найдена
    </Wrapper>
  );
});
