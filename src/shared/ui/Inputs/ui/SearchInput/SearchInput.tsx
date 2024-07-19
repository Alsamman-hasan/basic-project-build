import {
  CSSProperties,
  ChangeEvent,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
} from 'react';
import cls from './SearchInput.module.scss';
import { HStack } from '../../../Stack';
import SearchIcon from '@/shared/assets/icons/SearchIcon.svg';
import { typedMemo } from '@/shared/types/TypedMemo';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly'
>;

export interface InputProps<T extends string> extends HTMLInputProps {
  className?: string;
  value?: string;
  onChange?: (value: T) => void;
  label?: string | undefined | null;
  errorMessage?: string;
  style?: CSSProperties;
  name: string;
  endIcon?: ReactNode;
  onSearch?: () => void;
}

const Search = <T extends string>(
  props: InputProps<T>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: React.Ref<any>,
) => {
  const {
    className,
    label,
    value,
    onChange,
    type = 'text',
    required = false,
    errorMessage,
    style,
    name,
    onSearch,
    endIcon,
    ...otherProps
  } = props;

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const values = event.target.value.toLowerCase();
    onChange?.(values as T);
  };

  return (
    <div className={cls.Input}>
      <div className={cls.inputWrapper}>
        <input
          ref={ref}
          type='text'
          value={value}
          style={style}
          id={`${name}inputUI`}
          name={`${name}inputUI`}
          required={required}
          autoComplete='off'
          onChange={onChangeHandler}
          {...otherProps}
        />
        {!!endIcon && !!value && (
          <div className={cls.clearIcon}>
            <HStack max className={cls.corse} align='center' justify='center'>
              {endIcon}
            </HStack>
          </div>
        )}
        <SearchIcon className={cls.icon} onClick={onSearch} />
      </div>
    </div>
  );
};

export const InputSearch = typedMemo(forwardRef(Search));
