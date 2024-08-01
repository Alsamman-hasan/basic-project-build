// import { FormHelperText, MenuItem, FormControl } from '@mui/material';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import { ReactNode, useMemo } from 'react';
// import ArrowLineDown from '../../../../assets/icons/ArrowLineDown.svg';
// import { classNames } from '../../../../lib/classNames/classNames';
// import './SelectInput.scss';
// import { filterSelectValue } from '../../../../lib/filterSelectValue/filterSelectValue';
// import { typedMemo } from '../../../../types/TypedMemo';
// import { PTag } from '../../../Paragraph/P';

// export interface SelectUiProps<T extends string> {
//   className?: string;
//   value?: T;
//   onSelect?: (value: T) => void;
//   label?: ReactNode;
//   errorMessage?: string | undefined;
//   error?: boolean;
//   items?: SelectItems<T>[];
//   required?: boolean;
//   placeholder?: string;
// }

// const SelectInput = <T extends string>(props: SelectUiProps<T>) => {
//   const {
//     className,
//     error,
//     errorMessage,
//     label,
//     onSelect,
//     value = '',
//     items,
//     required = false,
//     placeholder,
//   } = props;
//   const handleChange = (event: SelectChangeEvent) => {
//     onSelect?.(event.target.value as T);
//   };

//   const selectValue = useMemo(
//     () => filterSelectValue(items, value),
//     [items, value],
//   );

//   return (
//     <div className={classNames('select', {}, [className])}>
//       {!!label && <PTag tage='P3'>{`${label} ${required ? '*' : ''}`}</PTag>}
//       <FormControl fullWidth>
//         <Select
//           displayEmpty
//           required={required}
//           id='select'
//           value={selectValue}
//           inputProps={{ 'aria-label': 'Without label' }}
//           IconComponent={ArrowLineDown}
//           renderValue={selected => {
//             if (selected.length === 0) {
//               if (placeholder) return <PTag tage='P3'>{placeholder}</PTag>;

//               return null;
//             }
//             return selected;
//           }}
//           onChange={handleChange}
//         >
//           {!!items &&
//             items.map(item => (
//               <MenuItem
//                 key={item.id}
//                 id={`item-${item.id}`}
//                 className='select__menu-item'
//                 value={item?.name}
//               >
//                 {item?.name}
//               </MenuItem>
//             ))}
//         </Select>
//         {!!error && <FormHelperText>{errorMessage}</FormHelperText>}
//       </FormControl>
//     </div>
//   );
// };

// export const SelectUi = typedMemo(SelectInput);
