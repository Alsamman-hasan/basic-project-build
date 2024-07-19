import {
  CSSProperties,
  InputHTMLAttributes,
  ReactNode,
  useMemo,
  useState,
} from 'react';
import cls from './Input.module.scss';

import EyeHide from '../../../../assets/icons/eye-hide.svg';
import EyeShow from '../../../../assets/icons/eye-show.svg';
import { classNames } from '../../../../lib/classNames/classNames';
import { PTag } from '../../../../ui/Paragraph/P';
import { HStack } from '../../../Stack';
import { typedMemo } from '@/shared/types/TypedMemo';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly'
>;

export interface InputProps<T extends string | number> extends HTMLInputProps {
  className?: string;
  value?: string | number;
  onChange?: (value: T) => void;
  label?: string | undefined | null;
  errorMessage?: string;
  style?: CSSProperties;
  name: string;
  endIcon?: ReactNode;
}

export const InputUI = <T extends string | number>(props: InputProps<T>) => {
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
    endIcon,
    ...otherProps
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const onShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value as T);
  };

  const Types = useMemo(() => {
    if (type === 'password' && showPassword) return 'text';

    return type;
  }, [showPassword, type]);

  return (
    <div className={classNames(cls.Input, {}, [className])}>
      <div className={cls.inputWrapper}>
        <input
          style={style}
          id={`${name}inputUI`}
          value={value}
          type={Types}
          name={`${name}inputUI`}
          required={required}
          className={classNames('', {
            [cls.errors]: Boolean(errorMessage),
          })}
          onChange={onChangeHandler}
          {...otherProps}
        />
        {type === 'password' && (
          <div className={cls.icon} onClick={onShowPassword}>
            {showPassword ? <EyeShow /> : <EyeHide />}
          </div>
        )}
        {!!endIcon && !!value && (
          <div className={cls.clearIcon}>
            <HStack max className={cls.corse} align='center' justify='center'>
              {endIcon}
            </HStack>
          </div>
        )}
        {!!errorMessage && (
          <PTag
            tage='desc'
            className={classNames(cls.error, {
              [cls.errorMessage]: Boolean(errorMessage),
            })}
          >
            {errorMessage}
          </PTag>
        )}
      </div>
      {!!label && (
        <label htmlFor={`${name}inputUI`}>
          <PTag tage='P3' className={cls.Label}>
            {`${label} ${required ? '*' : ''}`}
          </PTag>
        </label>
      )}
    </div>
  );
};

export const Input = typedMemo(InputUI);
