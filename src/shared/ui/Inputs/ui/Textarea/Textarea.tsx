import { CSSProperties, TextareaHTMLAttributes, memo, useState } from 'react';
import cls from './Textarea.module.scss';

import { classNames } from '../../../../lib/classNames/classNames';
import { PTag } from '../../../Paragraph/P';

type HTMLTextAreaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'value' | 'onChange' | 'readOnly'
>;

export interface TextAreaProps extends HTMLTextAreaProps {
  className?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  label?: string | undefined | null;
  errorMessage?: string;
  style?: CSSProperties;
  name: string;
}

export const Textarea = memo((props: TextAreaProps) => {
  const {
    className,
    label,
    value,
    onChange,
    // type = 'text',
    required = false,
    errorMessage,
    style,
    name,
    ...otherProps
  } = props;
  const [focused, setFocused] = useState(false);
  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <div className={classNames(cls.TextArea, {}, [className])}>
      <div className={cls.TextAreaWrapper}>
        <textarea
          style={style}
          id={`${name}TextAreaUI`}
          value={value}
          name={`${name}TextAreaUI`}
          required={required}
          aria-invalid={Boolean(errorMessage)}
          className={classNames('', {
            [cls.errors]: Boolean(errorMessage),
          })}
          onChange={onChangeHandler}
          onBlur={handleFocus}
          onFocus={() => setFocused(true)}
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
        <label htmlFor={`${name}TextAreaUI`}>
          <PTag tage='P3' className={cls.Label}>
            {`${label} ${required ? '*' : ''}`}
          </PTag>
        </label>
      )}
    </div>
  );
});
