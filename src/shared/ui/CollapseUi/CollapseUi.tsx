import { memo, ReactNode } from 'react';
import Collapse from './Collapse';
import cls from './CollapseUi.module.scss';
import { Htag } from '../Htage/Htage';
import { HStack } from '../Stack';
import ArrowLineDown from '@/shared/assets/icons/ArrowLineDown.svg';
import { classNames } from '@/shared/lib/classNames/classNames';

export interface CollapseUiProps {
  className?: string;
  children: ReactNode;
  open: boolean;
  head?: boolean;
  label?: string;
  onToggle?: () => void;
}
export const CollapseUi = memo((props: CollapseUiProps) => {
  const { className, children, label, open, head, onToggle } = props;

  return (
    <div className={classNames(cls.collapse, {}, [className])}>
      {!!head && (
        <HStack
          max
          align='start'
          justify='between'
          className={cls.collapseHeader}
          onClick={onToggle}
        >
          <Htag tage='h3'>{label}</Htag>
          <ArrowLineDown className={cls.collapse__header_icon} />
        </HStack>
      )}
      <Collapse lazy open={open}>
        {children}
      </Collapse>
    </div>
  );
});
