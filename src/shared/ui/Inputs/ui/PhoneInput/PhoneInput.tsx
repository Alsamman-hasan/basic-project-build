/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSProperties, InputHTMLAttributes, memo, useRef } from 'react';
import { IMaskInput } from 'react-imask';
import cls from './PhoneInput.module.scss';
import { PTag } from '../../../Paragraph/P';
import { classNames } from '@/shared/lib/classNames/classNames';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly'
>;

export interface PhoneMaskProps extends HTMLInputProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  label: string;
  style?: CSSProperties;
  name: string;
  error?: boolean;
  errorMessage?: string;
}
export const PhoneInput = memo((props: PhoneMaskProps) => {
  const {
    className,
    label,
    onChange,
    value,
    name,
    style,
    errorMessage,
    error,
    required = false,
    ...otherProps
  } = props;
  const ref = useRef(null);
  const inputRef = useRef(null);
  const onChangeV = (phone: any) => {
    onChange?.(`+${phone.unmaskedValue}`);
  };
  return (
    <div className={classNames(cls.Input, {}, [className])}>
      <div className={cls.inputWrapper}>
        <IMaskInput
          ref={ref}
          style={style}
          id={`${name}-input`}
          label={label}
          mask='+{7}(000)000-00-00'
          radix='.'
          value={value}
          required={required}
          aria-invalid={Boolean(errorMessage)}
          inputRef={inputRef}
          className={classNames('', {
            [cls.errors]: Boolean(errorMessage),
          })}
          onAccept={(t, e) => onChangeV?.(e)}
          {...otherProps}
        />
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
        <label htmlFor={`${name}-input`}>
          <p className={cls.Label}>{`${label} ${required ? '*' : ''}`}</p>
          <PTag tage='P3' className={cls.Label}>
            {`${label} ${required ? '*' : ''}`}
          </PTag>
        </label>
      )}
    </div>
  );
});
