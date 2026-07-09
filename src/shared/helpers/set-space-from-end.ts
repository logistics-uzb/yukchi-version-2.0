export const setSpaceFromEnd = (value: number | string): string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
