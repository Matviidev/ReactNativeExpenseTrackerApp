import { useCallback } from "react";

import { useCurrentUser } from "@/features/auth";
import { fetchTransactions, summarize } from "@/features/transactions";
import { useFocusQuery } from "@/shared/hooks/use-focus-query";

const RECENT_LIMIT = 5;

export const useOverview = () => {
  const { id: userId } = useCurrentUser();

  const query = useCallback(async () => {
    const result = await fetchTransactions(userId);
    if (!result.ok) {
      return result;
    }
    return {
      ok: true as const,
      data: {
        summary: summarize(result.data),
        recent: result.data.slice(0, RECENT_LIMIT),
      },
    };
  }, [userId]);

  return useFocusQuery(query);
};
