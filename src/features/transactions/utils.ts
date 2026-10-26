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
  type: transaction?.type ?? "",
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
