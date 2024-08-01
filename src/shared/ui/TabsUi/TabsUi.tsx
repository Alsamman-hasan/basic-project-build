import { memo, useMemo, useState } from 'react';
import cls from './TabsUi.module.scss';
import { HStack, VStack } from '../Stack';
import { classNames } from '@/shared/lib/classNames/classNames';

interface TabsType {
  tab?: string;
  element?: JSX.Element;
  id?: string | number;
}
export interface TabsUiProps {
  className?: string;
  tabs?: TabsType[];
  onChooseTab?: (id: number | string) => void;
  defaultTab?: TabsType;
  selectedTab?: TabsType;
  itemClass?: string;
}

export const TabsUi = memo((props: TabsUiProps) => {
  const { className, defaultTab, tabs, onChooseTab, selectedTab, itemClass } =
    props;

  const [localTab, setLocalTab] = useState<TabsType | undefined>(
    defaultTab || tabs?.[0],
  );

  const onSelectTab = (t: TabsType) => {
    setLocalTab(t);
    onChooseTab?.(t.id || '');
  };

  const select = useMemo(() => {
    if (!selectedTab) return localTab;
    return selectedTab;
  }, [localTab, selectedTab]);

  return (
    <VStack
      max
      gap={0.5}
      justify='start'
      align='start'
      className={classNames(cls.TabsUi, {}, [className])}
    >
      <HStack max className={cls.tabsWrapper}>
        {tabs?.map(tab => (
          <HStack
            key={tab.id}
            align='center'
            justify='center'
            className={classNames(
              cls.btn,
              {
                [cls.active]: tab.id === select?.id,
              },
              [itemClass],
            )}
            onClick={() => onSelectTab(tab)}
          >
            {tab.tab}
          </HStack>
        ))}
      </HStack>
      <div className={cls.element}>{localTab?.element}</div>
    </VStack>
  );
});
