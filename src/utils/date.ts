type DateInput = Date | number | string;

const padNumber = (value: number) => String(value).padStart(2, "0");

export const parseDateTime = (input: DateInput) => {
  if (input instanceof Date) return new Date(input);
  const value = typeof input === "string" && !input.includes("T")
    ? input.replace(/-/g, "/")
    : input;
  return new Date(value);
};

export const formatDateTime = (input: DateInput, time = "00:00:00") => {
  const date = input instanceof Date ? input : new Date(input);
  const year = date.getFullYear();
  const month = padNumber(date.getMonth() + 1);
  const day = padNumber(date.getDate());

  return `${year}-${month}-${day} ${time}`;
};

export const formatFullDateTime = (input: DateInput) => {
  const date = parseDateTime(input);
  if (Number.isNaN(date.getTime())) return "--";

  const time = `${padNumber(date.getHours())}:${padNumber(date.getMinutes())}:${padNumber(date.getSeconds())}`;
  return formatDateTime(date, time);
};

export const formatMonthDayTime = (input: DateInput) => {
  const date = parseDateTime(input);
  if (Number.isNaN(date.getTime())) return "--";

  return `${date.getMonth() + 1}月${date.getDate()}日 ${padNumber(date.getHours())}:${padNumber(date.getMinutes())}`;
};
