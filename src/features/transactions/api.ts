import { supabase } from "@/shared/lib/supabase";
import { toResult, unwrap } from "@/shared/lib/result";

import { Transaction, TransactionInput } from "./types";

const TABLE = "transactions";

export const fetchTransactions = (userId: string) =>
  toResult(
    async () =>
      unwrap(
        await supabase
          .from(TABLE)
          .select("*")
          .eq("user_id", userId)
          .order("date", { ascending: false })
          .order("created_at", { ascending: false }),
      ) as Transaction[],
    "Unable to load transactions.",
  );

export const fetchTransaction = (id: number) =>
  toResult(
    async () =>
      unwrap(
        await supabase.from(TABLE).select("*").eq("id", id).single(),
      ) as Transaction,
    "Unable to load transaction.",
  );

export const createTransaction = (input: TransactionInput) =>
  toResult(async () => {
    unwrap(await supabase.from(TABLE).insert(input));
  }, "Unable to add transaction.");

export const updateTransaction = (id: number, input: TransactionInput) =>
  toResult(async () => {
    unwrap(await supabase.from(TABLE).update(input).eq("id", id));
  }, "Unable to update transaction.");

export const deleteTransaction = (id: number) =>
  toResult(async () => {
    unwrap(await supabase.from(TABLE).delete().eq("id", id));
  }, "Unable to delete transaction.");
