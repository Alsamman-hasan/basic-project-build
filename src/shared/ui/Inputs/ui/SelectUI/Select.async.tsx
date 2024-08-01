import { CSSProperties, memo } from 'react';
import { SuspenseWrapper } from '../../../SuspenseWrapper/SuspenseWrapper';
import { lazyRetry } from '@/shared/lib/lazyRetry/lazyWithRetry';

export interface CustomSelectProps {
  className?: string;
  placeholder?: string;
  options: Autocomplete<string>[];
  isSearchable?: boolean;
  onChose: (value: Autocomplete<string>) => void;
  align?: string;
  value?: Autocomplete<string>;
  isDisabled?: boolean;
  name: string;
  label?: string;
  style?: CSSProperties;
  required?: boolean;
  errorMessage?: string;
  isVirtually?: boolean;
}

export const Content = lazyRetry(() => import('./CustomSelect'));

export const Select = memo((props: CustomSelectProps) => (
  <SuspenseWrapper>
    <Content {...props} />
  </SuspenseWrapper>
));
