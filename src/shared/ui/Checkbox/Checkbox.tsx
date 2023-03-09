import { CSSProperties, InputHTMLAttributes, memo, ReactNode } from "react";
import { classNames } from "../../lib/classNames/classNames";
import cls from "./Checkbox.module.scss";
import { PTag } from "../Paragraph/P";

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "checked" | "onChange" | "readOnly"
>;

export interface CheckboxProps extends HTMLInputProps {
  className?: string;
  checked?: boolean;
  onChange?: (value: boolean) => void;
  readonly?: boolean;
  label?: string | ReactNode;
  name: string;
  style?: CSSProperties;
}

export const Checkbox = memo((props: CheckboxProps) => {
  const {
    className,
    checked,
    onChange,
    readonly,
    disabled,
    label,
    name,
    style,
    ...otherProps
  } = props;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  return (
    <div className={classNames(cls.checkbox, {}, [className])}>
      <input
        readOnly={readonly}
        style={style}
        onChange={onChangeHandler}
        type="checkbox"
        id={name}
        disabled={disabled}
        checked={checked}
        {...otherProps}
      />
      <label htmlFor={name}>
        <PTag className={cls.label} tage="P3">
          {label}
        </PTag>
      </label>
    </div>
  );
});
