import { colors } from "@/shared/theme";

import { SortOption, TransactionType, TypeFilter } from "./types";

export const TRANSACTION_TYPES: { label: string; value: TransactionType }[] = [
  { label: "Income", value: "income" },
  { label: "Expense", value: "expense" },
];

export const TYPE_FILTERS: { label: string; value: TypeFilter }[] = [
  { label: "All", value: "all" },
  ...TRANSACTION_TYPES,
];

export const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Newest first", value: "date-desc" },
  { label: "Oldest first", value: "date-asc" },
  { label: "Highest amount", value: "amount-desc" },
  { label: "Lowest amount", value: "amount-asc" },
];

export const CATEGORIES = [
  { label: "Food", value: "food", icon: "silverware-fork-knife" },
  { label: "Transport", value: "transport", icon: "car-outline" },
  { label: "Shopping", value: "shopping", icon: "shopping-outline" },
  { label: "Bills", value: "bills", icon: "receipt-text-outline" },
  {
    label: "Entertainment",
    value: "entertainment",
    icon: "movie-open-outline",
  },
  { label: "Health", value: "health", icon: "heart-pulse" },
  { label: "Salary", value: "salary", icon: "briefcase-outline" },
  { label: "Other", value: "other", icon: "shape-outline" },
];

export const getCategory = (value: string) =>
  CATEGORIES.find((category) => category.value === value) ??
  CATEGORIES[CATEGORIES.length - 1];

export const TYPE_COLORS: Record<
  TransactionType,
  { color: string; background: string }
> = {
  income: { color: colors.income, background: colors.incomeSoft },
  expense: { color: colors.expense, background: colors.expenseSoft },
};
