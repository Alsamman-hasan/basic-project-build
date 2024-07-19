import dayjs, { Dayjs } from 'dayjs';

export const validateAge = (birthday: Dayjs | null | undefined) => {
  if (!birthday) return false;
  const today = dayjs();
  const eighteenYearsAgo = today.subtract(18, 'years');
  if (!dayjs(birthday).isBefore(eighteenYearsAgo)) return false;
  return true;
};
