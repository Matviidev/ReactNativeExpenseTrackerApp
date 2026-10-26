import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

import { Result } from "@/shared/lib/result";

interface QueryState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export const useFocusQuery = <T>(
  query: () => Promise<Result<T>>,
  enabled = true,
) => {
  const [state, setState] = useState<QueryState<T>>({
    data: null,
    error: null,
    loading: enabled,
  });

  useFocusEffect(
    useCallback(() => {
      if (!enabled) {
        return;
      }

      let active = true;
      setState((prev) => ({ ...prev, loading: true }));

      query().then((result) => {
        if (!active) {
          return;
        }
        setState(
          result.ok
            ? { data: result.data, error: null, loading: false }
            : { data: null, error: result.error, loading: false },
        );
      });

      return () => {
        active = false;
      };
    }, [query, enabled]),
  );

  return state;
};
