import dayjs from "dayjs";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const formatCurrency = (amount: number) =>
  currencyFormatter.format(amount);

export const formatDate = (date: string | Date, pattern = "MMM D, YYYY") =>
  dayjs(date).format(pattern);

export const toISODate = (date: Date) => dayjs(date).format("YYYY-MM-DD");

export const parseDate = (date: string) => dayjs(date).toDate();
