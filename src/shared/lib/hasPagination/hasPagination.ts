export const hasPagination = (total: number, size: number) => {
  const totals = Math.ceil(total / size);
  return totals > 1;
};
