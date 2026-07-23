type DateInput = Date | number | string;

const padNumber = (value: number) => String(value).padStart(2, "0");

export const formatDateTime = (input: DateInput, time = "00:00:00") => {
  const date = input instanceof Date ? input : new Date(input);
  const year = date.getFullYear();
  const month = padNumber(date.getMonth() + 1);
  const day = padNumber(date.getDate());

  return `${year}-${month}-${day} ${time}`;
};
