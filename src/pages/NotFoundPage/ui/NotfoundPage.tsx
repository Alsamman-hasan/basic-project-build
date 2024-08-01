import { memo } from 'react';
import cls from './NotfoundPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Wrapper } from '@/shared/ui/Wrapper/Wrapper';

export interface NotfoundPageProps {
  className?: string;
}
export const NotfoundPage = memo(({ className }: NotfoundPageProps) => (
  <Wrapper className={classNames(cls.NotfoundPage, {}, [className])}>
    Страница не найдена
  </Wrapper>
));
