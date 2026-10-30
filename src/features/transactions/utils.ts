import { formatDayLabel } from "@/shared/lib/format";

import {
  SortOption,
  Transaction,
  TransactionFormValues,
  TransactionInput,
  TransactionsSummary,
  TransactionType,
  TypeFilter,
} from "./types";

const comparators: Record<
  SortOption,
  (a: Transaction, b: Transaction) => number
> = {
  "date-desc": (a, b) => b.date.localeCompare(a.date),
  "date-asc": (a, b) => a.date.localeCompare(b.date),
  "amount-desc": (a, b) => b.amount - a.amount,
  "amount-asc": (a, b) => a.amount - b.amount,
};

export const filterAndSort = (
  transactions: Transaction[],
  type: TypeFilter,
  sort: SortOption,
) =>
  transactions
    .filter((transaction) => type === "all" || transaction.type === type)
    .sort(comparators[sort]);

export interface TransactionSection {
  title: string | null;
  data: Transaction[];
}

export const groupByDay = (
  transactions: Transaction[],
  sort: SortOption,
): TransactionSection[] => {
  if (!sort.startsWith("date")) {
    return transactions.length ? [{ title: null, data: transactions }] : [];
  }

  return transactions.reduce<TransactionSection[]>((sections, transaction) => {
    const title = formatDayLabel(transaction.date);
    const last = sections[sections.length - 1];

    if (last?.title === title) {
      last.data.push(transaction);
    } else {
      sections.push({ title, data: [transaction] });
    }
    return sections;
  }, []);
};

export const summarize = (
  transactions: Pick<Transaction, "amount" | "type">[],
): TransactionsSummary => {
  const totals = transactions.reduce(
    (acc, { amount, type }) => {
      acc[type] += amount;
      return acc;
    },
    { income: 0, expense: 0 },
  );
  return { ...totals, balance: totals.income - totals.expense };
};

export const toFormValues = (
  transaction?: Transaction | null,
): TransactionFormValues => ({
  name: transaction?.name ?? "",
  amount: transaction?.amount.toString() ?? "",
  description: transaction?.description ?? "",
  date: transaction?.date ?? "",
  type: transaction?.type ?? "expense",
  category: transaction?.category ?? "",
});

export const toTransactionInput = (
  values: TransactionFormValues,
  userId: string,
): TransactionInput => ({
  user_id: userId,
  name: values.name.trim(),
  amount: Number.parseFloat(values.amount),
  description: values.description.trim() || null,
  date: values.date,
  type: values.type as TransactionType,
  category: values.category,
});
