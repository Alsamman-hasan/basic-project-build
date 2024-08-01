import { memo } from 'react';
import cls from './Breadcrumbs.module.scss';
import Separator from '../../assets/icons/Separater/separator.svg';
import { AppLink } from '../AppLinks/AppLinks';
import { PTag } from '../Paragraph/P';
import { HStack } from '../Stack';

export interface Paths {
  to: string;
  name: string;
}
interface BreadcrumbsProps {
  pathItems: Paths[];
}
export const BreadcrumbsUi = memo((props: BreadcrumbsProps) => {
  const { pathItems } = props;
  return (
    <HStack gap={1} aria-label='breadcrumb' className={cls.breadcrumb}>
      <HStack gap={1}>
        <AppLink className={cls.Links} to='/'>
          <PTag tage='P3'>Главная</PTag>
        </AppLink>
        <Separator />
      </HStack>
      {pathItems.map((value, index) => {
        const last = index === pathItems.length - 1;
        return last ? (
          <PTag key={`${value.to}-${index}`} className={cls.lastLink} tage='P3'>
            {value.name}
          </PTag>
        ) : (
          <HStack key={`${value.to}-${index}`} gap={1}>
            <AppLink className={cls.Links} to={value.to}>
              <PTag tage='P3'>{value.name}</PTag>
            </AppLink>
            <Separator />
          </HStack>
        );
      })}
    </HStack>
  );
});
