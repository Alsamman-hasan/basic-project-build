import { memo, useCallback, useMemo } from 'react';
import { Select } from '../../Inputs';

export interface StepsSelectProps {
  className?: string;
  value?: string;
  onChange: (value: string) => void;
}

const items: Autocomplete<string>[] = [
  { label: '10', value: '10' },
  { label: '50', value: '50' },
  { label: '100', value: '100' },
];

export const StepsSelect = memo((props: StepsSelectProps) => {
  const { className, onChange, value } = props;
  const values = useMemo(
    () => ({ label: value ?? '10', value: value ?? '10' }),
    [value],
  );
  const onChangeSelect = useCallback(
    (selectedValue: Autocomplete<string>) => {
      onChange(selectedValue.label);
    },
    [onChange],
  );
  return (
    <Select
      className={className}
      style={{ width: '86px' }}
      isSearchable={false}
      value={values}
      name='category'
      options={items || []}
      placeholder=''
      onChose={onChangeSelect}
    />
  );
});
