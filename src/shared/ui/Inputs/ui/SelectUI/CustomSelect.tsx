/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  memo,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import cls from './CustomSelect.module.scss';
import { CustomSelectProps } from './Select.async';
import { PTag } from '../../../Paragraph/P';
import { HStack } from '../../../Stack';
import { Input } from '../Input/Input';
import { classNames } from '@/shared/lib/classNames/classNames';

const Icon = memo(({ iconClass }: { iconClass: string }) => (
  <svg
    viewBox='0 0 20 20'
    width='14'
    height='14'
    stroke='#222'
    strokeWidth='1.5'
    fill='none'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={iconClass}
  >
    <polyline points='6 9 12 15 18 9' />
  </svg>
));

const CustomSelect = memo((props: CustomSelectProps) => {
  const {
    className,
    onChose,
    options,
    placeholder,
    align,
    isSearchable = false,
    isVirtually,
    value,
    isDisabled,
    name,
    style,
    label,
    required,
    errorMessage,
  } = props;
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState<
    Autocomplete<string> | undefined
  >(value);
  const [searchValue, setSearchValue] = useState('');
  const searchRef = useRef() as MutableRefObject<HTMLInputElement>;
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  const handleInputClick = useCallback(() => {
    if (isDisabled) return null;
    setShowMenu(!showMenu);
  }, [isDisabled, showMenu]);

  const getDisplay = useCallback(() => {
    if (!selectedValue) return placeholder;
    return selectedValue.label;
  }, [placeholder, selectedValue]);

  const onItemClick = useCallback(
    (option: Autocomplete<string>) => {
      setSelectedValue(option);
      onChose(option);
    },
    [onChose],
  );

  const isSelected = useCallback(
    (option: Autocomplete<string>) => {
      if (!selectedValue) return false;

      return selectedValue.value === option.value;
    },
    [selectedValue],
  );

  const onSearch = useCallback((search: string | number) => {
    setSearchValue(search as string);
  }, []);

  const getOptions = useCallback(() => {
    if (!searchValue) return options;

    return options.filter(
      option =>
        option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0,
    );
  }, [options, searchValue]);

  const rowList = ({ index, style: styles }: ListChildComponentProps) => (
    <div style={styles} onClick={() => onItemClick(getOptions()[index])}>
      <HStack
        align='center'
        className={classNames(cls.dropdownItem, {
          [cls.selected]: selectedValue?.value === getOptions()[index].label,
        })}
      >
        {getOptions()[index].label}
      </HStack>
    </div>
  );

  useEffect(() => {
    setSearchValue('');
    if (showMenu && searchRef.current) searchRef.current.focus();
  }, [showMenu]);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  useEffect(() => {
    const handler = (e: any) => {
      if (inputRef.current && !inputRef.current.contains(e.target))
        setShowMenu(false);
    };

    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('click', handler);
    };
  });
  return (
    <div style={style} className={classNames(cls.wrapper, {}, [className])}>
      {!!label && (
        <PTag tage='P3' className={cls.Label}>
          {`${label} ${required ? '*' : ''}`}
        </PTag>
      )}
      <div
        className={classNames(
          cls.CustomSelect,
          {
            [cls.isDisabled]: !!isDisabled,
            [cls.errors]: Boolean(errorMessage),
          },
          [className],
        )}
      >
        <div
          ref={inputRef}
          className={cls.dropdownInput}
          onClick={handleInputClick}
        >
          <div
            className={classNames(
              cls.dropdownSelectedValue,
              { [cls.placeholder]: !selectedValue },
              [],
            )}
          >
            {getDisplay()}
          </div>
          <div className={cls.dropdownTools}>
            <div className={cls.dropdownTool}>
              <Icon iconClass={showMenu ? cls.translate : ''} />
            </div>
          </div>
        </div>
        {!!showMenu && (
          <div
            className={classNames(cls.dropdownMenu, { [cls.auto]: !align }, [
              align,
            ])}
          >
            {!!isSearchable && (
              <div className={cls.searchBox}>
                <Input
                  ref={searchRef}
                  style={{ height: '40px' }}
                  name={name}
                  placeholder='Search'
                  className={cls.formControl}
                  value={searchValue}
                  onChange={onSearch}
                />
              </div>
            )}
            {isVirtually ? (
              <FixedSizeList
                useIsScrolling
                height={200}
                width='100%'
                className={cls.List}
                itemCount={getOptions().length}
                itemSize={40}
              >
                {rowList}
              </FixedSizeList>
            ) : (
              getOptions().map(option => (
                <div
                  key={option.value}
                  className={classNames(
                    cls.dropdownItem,
                    { [cls.selected]: isSelected(option) },
                    [],
                  )}
                  onClick={() => onItemClick(option)}
                >
                  {option.label}
                </div>
              ))
            )}
          </div>
        )}
      </div>
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
  );
});

export default CustomSelect;
