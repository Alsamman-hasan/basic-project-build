// import { CSSProperties, useMemo } from 'react';
// import Select, { SingleValue } from 'react-select';
// import * as cls from'./AutoComplete.module.scss';
// import { PTag } from '../../../Paragraph/P';
// import { classNames } from '@/shared/lib/classNames/classNames';
// import { filterValue } from '@/shared/lib/filterSelectValue/filterSelectValue';
// import { typedMemo } from '@/shared/types/TypedMemo';

// export interface AutoCompleteProps<T> {
//   className?: string;
//   options: Autocomplete<T>[];
//   value?: string;
//   onChose: (value: Autocomplete<T>) => void;
//   label?: string | undefined | null;
//   errorMessage?: string;
//   name: string;
//   placeholder?: string;
//   required?: boolean;
//   isClearable?: boolean;
//   isSearchable?: boolean;
//   isDisabled?: boolean;
//   style?: CSSProperties;
// }
// const AutoCompleteUI = <T extends string>(props: AutoCompleteProps<T>) => {
//   const {
//     className,
//     onChose,
//     options,
//     value,
//     name,
//     errorMessage,
//     label,
//     required,
//     isClearable,
//     placeholder,
//     isDisabled,
//     isSearchable,
//     style,
//   } = props;

//   const onChangeHandler = (newValue: SingleValue<Autocomplete<T>>) => {
//     onChose(newValue as Autocomplete<T>);
//   };

//   const selectValue = useMemo(
//     () => filterValue(options, value),
//     [options, value],
//   );
//   return (
//     <div
//       style={style}
//       className={classNames(cls.AutoComplete, {}, [className])}
//     >
//       <div
//         className={classNames(
//           cls.wrapper,
//           { [cls.error]: Boolean(errorMessage) },
//           [],
//         )}
//       >
//         <Select
//           placeholder={placeholder}
//           required={required}
//           aria-label={`${name}inputUI`}
//           defaultValue={selectValue}
//           isDisabled={isDisabled}
//           isClearable={isClearable}
//           isSearchable={isSearchable}
//           name={name}
//           options={options}
//           className={classNames(cls.Input, {}, [])}
//           theme={theme => ({
//             ...theme,
//             colors: {
//               ...theme.colors,
//               primary: '#4481DB',
//               primary25: '#D7D7D7',
//             },
//           })}
//           styles={{
//             control: (baseStyles, state) => ({
//               ...baseStyles,
//               background: '#ffff',
//               backgroundColor: 'inherit',
//               borderColor: state.isFocused ? '#B3B3B3' : '#D7D7D7',
//               borderRadius: '4px',
//               boxShadow: 'none',
//             }),
//           }}
//           onChange={onChangeHandler}
//         />
//       </div>
//       {!!label && (
//         <label htmlFor={`${name}inputUI`}>
//           <PTag tage='P3' className={cls.Label}>
//             {`${label} ${required ? '*' : ''}`}
//           </PTag>
//         </label>
//       )}
//       {!!errorMessage && (
//         <PTag tage='desc' className={cls.errorMessage}>
//           {errorMessage}
//         </PTag>
//       )}
//     </div>
//   );
// };

// export const AutoComplete = typedMemo(AutoCompleteUI);
