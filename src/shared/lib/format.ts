import dayjs from "dayjs";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const formatCurrency = (amount: number) =>
  currencyFormatter.format(amount);

export const formatDate = (date: string | Date, pattern = "MMM D, YYYY") =>
  dayjs(date).format(pattern);

export const formatDayLabel = (date: string) => {
  const day = dayjs(date);
  const today = dayjs().startOf("day");

  if (day.isSame(today, "day")) {
    return "Today";
  }
  if (day.isSame(today.subtract(1, "day"), "day")) {
    return "Yesterday";
  }
  return day.format(day.isSame(today, "year") ? "dddd, MMM D" : "MMM D, YYYY");
};

export const toISODate = (date: Date) => dayjs(date).format("YYYY-MM-DD");

export const parseDate = (date: string) => dayjs(date).toDate();
