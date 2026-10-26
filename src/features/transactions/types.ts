export type TransactionType = "income" | "expense";

export type TypeFilter = TransactionType | "all";

export type SortOption =
  "date-desc" | "date-asc" | "amount-desc" | "amount-asc";

export interface Transaction {
  id: number;
  user_id: string;
  name: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
  description?: string | null;
  created_at: string;
}

export type TransactionInput = Pick<
  Transaction,
  "user_id" | "name" | "amount" | "type" | "category" | "date" | "description"
>;

export interface TransactionFormValues {
  name: string;
  amount: string;
  description: string;
  date: string;
  type: string;
  category: string;
}

export interface TransactionsSummary {
  income: number;
  expense: number;
  balance: number;
}
