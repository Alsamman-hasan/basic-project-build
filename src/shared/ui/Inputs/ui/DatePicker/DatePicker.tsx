// import { TextField, TextFieldProps } from '@mui/material';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import dayjs, { Dayjs } from 'dayjs';
// import { memo, useCallback } from 'react';
// import { classNames } from '../../../../lib/classNames/classNames';
// import './DatePicker.scss';
// import { PTag } from '../../../Paragraph/P';

// export interface DatePickerProps {
//   className?: string;
//   label: string;
//   value: Dayjs | null | undefined;
//   name: string;
//   onChange?: (value: Dayjs | null) => void;
//   required?: boolean;
//   errorMessage?: string;
// }

// export const DatePickerUi = memo((props: DatePickerProps) => {
//   const { className, label, onChange, value, name, required, errorMessage } =
//     props;
//   const handleChange = (newValue: Dayjs | null) => {
//     onChange?.(newValue);
//   };
//   const CustomInput = useCallback(
//     (textFieldProps: TextFieldProps) => (
//       <div className={classNames('InputUi', {}, [className])}>
//         {!!label && (
//           <label htmlFor={`${label}-input`}>
//             <PTag tage='P3' className='Label'>
//               {`${label} ${required ? '*' : ''}`}
//             </PTag>
//           </label>
//         )}
//         <TextField
//           error={!!errorMessage}
//           {...textFieldProps}
//           type='text'
//           variant='outlined'
//           name={name}
//           aria-controls={`${name}-input`}
//           className={classNames('', { errorClass: !!errorMessage })}
//           id={`${name}-input`}
//           inputProps={{
//             ...textFieldProps.inputProps,
//           }}
//         />
//       </div>
//     ),
//     [className, errorMessage, label, name, required],
//   );
//   return (
//     <div className={classNames('DataPicker', {}, [className])}>
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <DatePicker
//           format='YYYY-MM-DD'
//           value={dayjs(value) || null}
//           slots={{
//             textField: textFieldProps => CustomInput(textFieldProps),
//           }}
//           onChange={handleChange}
//         />
//       </LocalizationProvider>
//       {!!errorMessage && (
//         <PTag tage='desc' className='error'>
//           {errorMessage}
//         </PTag>
//       )}
//     </div>
//   );
// });
