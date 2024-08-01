import { memo } from 'react';
import { lazyRetry } from '../../../lib/lazyRetry/lazyWithRetry';
import { SuspenseWrapper } from '../../SuspenseWrapper/SuspenseWrapper';

export const Content = lazyRetry(() => import('./Paginations'));

export interface PaginationsProps {
  className?: string;
  totalCount: number;
  currentPage: number;
  pageSize: number;
  siblingCount?: number;
  onPageChange: (page: number | string) => void;
}
export const Paginations = memo((props: PaginationsProps) => (
  <SuspenseWrapper>
    <Content {...props} />
  </SuspenseWrapper>
));
