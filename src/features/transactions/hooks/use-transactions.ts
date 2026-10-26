import { useCallback } from "react";

import { useCurrentUser } from "@/features/auth";
import { useFocusQuery } from "@/shared/hooks/use-focus-query";

import { fetchTransaction, fetchTransactions } from "../api";

export const useTransactions = () => {
  const { id: userId } = useCurrentUser();
  const query = useCallback(() => fetchTransactions(userId), [userId]);
  return useFocusQuery(query);
};

export const useTransaction = (id: number) => {
  const query = useCallback(() => fetchTransaction(id), [id]);
  return useFocusQuery(query, Number.isFinite(id));
};
