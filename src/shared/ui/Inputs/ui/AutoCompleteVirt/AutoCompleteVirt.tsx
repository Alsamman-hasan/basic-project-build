// import './Autocomplete.scss';
// import { Typography } from '@mui/material';
// import Autocomplete from '@mui/material/Autocomplete';
// import TextField from '@mui/material/TextField';
// import {
//   createContext,
//   forwardRef,
//   HTMLAttributes,
//   ReactElement,
//   ReactNode,
//   SyntheticEvent,
//   useContext,
//   useEffect,
//   useRef,
//   useState,
// } from 'react';
// import { VariableSizeList, ListChildComponentProps } from 'react-window';
// import { typedMemo } from '../../../../types/TypedMemo';
// import { PTag } from '../../../Paragraph/P';

// interface AutocompleteUiProps<T extends string> {
//   className?: string;
//   label: string;
//   value?: T;
//   onChange?: (value: T | null) => void;
//   items: AutocompleteUiItem<T>[];
//   placeholder?: string;
//   name: string;
//   required?: boolean;
// }
// const LISTBOX_PADDING = 8; // px

// function renderRow(props: ListChildComponentProps) {
//   const { data, index, style } = props;
//   const dataSet = data[index];
//   const inlineStyle = {
//     ...style,
//     top: (style.top as number) + LISTBOX_PADDING,
//   };

//   return (
//     <Typography
//       className='menuItem'
//       component='li'
//       {...dataSet[0]}
//       style={inlineStyle}
//     >
//       {dataSet[1]}
//     </Typography>
//   );
// }

// const OuterElementContext = createContext({});

// const OuterElementType = forwardRef<HTMLDivElement>((props, ref) => {
//   const outerProps = useContext(OuterElementContext);
//   return <div ref={ref} {...props} {...outerProps} />;
// });

// function useResetCache(data: number) {
//   const ref = useRef<VariableSizeList>(null);
//   useEffect(() => {
//     if (ref.current != null) ref.current.resetAfterIndex(0, true);
//   }, [data]);
//   return ref;
// }

// const ListboxComponent = forwardRef<
//   HTMLDivElement,
//   HTMLAttributes<HTMLElement>
// >((props, ref) => {
//   const { children, ...other } = props;
//   const itemData: ReactElement[] = [];
//   (children as ReactElement[]).forEach(
//     (item: ReactElement & { children?: ReactElement[] }) => {
//       itemData.push(item);
//       itemData.push(...(item.children || []));
//     },
//   );

//   const itemCount = itemData.length;
//   const itemSize = 42;

//   const getChildSize = () => itemSize;

//   const getHeight = () => {
//     if (itemCount > 8) return 8 * itemSize;

//     return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
//   };

//   const gridRef = useResetCache(itemCount);

//   return (
//     <div ref={ref}>
//       <OuterElementContext.Provider value={other}>
//         <VariableSizeList
//           ref={gridRef}
//           itemData={itemData}
//           height={getHeight() + 2 * LISTBOX_PADDING}
//           width='100%'
//           outerElementType={OuterElementType}
//           innerElementType='ul'
//           itemSize={() => getChildSize()}
//           overscanCount={5}
//           itemCount={itemCount}
//         >
//           {renderRow}
//         </VariableSizeList>
//       </OuterElementContext.Provider>
//     </div>
//   );
// });

// const AutoCompleteUI = <T extends string>(props: AutocompleteUiProps<T>) => {
//   const { label, onChange, value, items, placeholder, name, required } = props;
//   const [open, setOpen] = useState(false);
//   const options = items.map(item => item.title);
//   const onChangeHandler = (event: SyntheticEvent, valueInput: T | null) => {
//     onChange?.(valueInput);
//   };
//   return (
//     <div className='Autocomplete'>
//       <Autocomplete
//         disableListWrap
//         open={open}
//         id={`${name}input`}
//         value={value}
//         ListboxComponent={ListboxComponent}
//         options={options}
//         isOptionEqualToValue={(option, values) => option === value}
//         getOptionLabel={option => option || ''}
//         renderInput={params => (
//           <div className='AutocompleteInputUi'>
//             {!!label && (
//               <label htmlFor={`${name}input`}>
//                 <PTag tage='P3' className='Label'>
//                   {`${label} ${required ? '*' : ''}`}
//                 </PTag>
//               </label>
//             )}
//             <TextField
//               {...params}
//               type='text'
//               name={`${name}input`}
//               id={`${name}input`}
//               placeholder={placeholder}
//               onClick={() => setOpen(true)}
//             />
//           </div>
//         )}
//         renderOption={(prop, option, state) =>
//           [prop, option, state.index] as ReactNode
//         }
//         onClose={() => setOpen(false)}
//         onChange={onChangeHandler}
//       />
//     </div>
//   );
// };

// export const AutoCompleteVirt = typedMemo(AutoCompleteUI);
