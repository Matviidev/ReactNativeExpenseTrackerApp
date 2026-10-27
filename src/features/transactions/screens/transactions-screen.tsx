import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { EmptyState, LoadingState, Screen, ScreenHeader } from "@/shared/ui";
import { spacing } from "@/shared/theme";

import { TransactionItem } from "../components/transaction-item";
import { TransactionsFilters } from "../components/transactions-filters";
import { useTransactions } from "../hooks/use-transactions";
import { SortOption, TypeFilter } from "../types";
import { filterAndSort } from "../utils";

export const TransactionsScreen = () => {
  const router = useRouter();
  const { data, loading, error } = useTransactions();
  const [type, setType] = useState<TypeFilter>("all");
  const [sort, setSort] = useState<SortOption>("date-desc");

  const transactions = useMemo(
    () => filterAndSort(data ?? [], type, sort),
    [data, type, sort],
  );

  const renderContent = () => {
    if (loading && !data) {
      return <LoadingState />;
    }
    if (error) {
      return (
        <EmptyState
          icon="alert-circle-outline"
          title="Something went wrong"
          message={error}
        />
      );
    }
    return (
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <TransactionItem
            transaction={item}
            onPress={() => router.push(`/transactions/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            title="No transactions"
            message="Nothing matches the selected filter yet."
          />
        }
      />
    );
  };

  return (
    <Screen>
      <ScreenHeader title="Transactions" />
      <TransactionsFilters
        type={type}
        sort={sort}
        onTypeChange={setType}
        onSortChange={setSort}
      />
      {renderContent()}
    </Screen>
  );
};

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
    padding: spacing.lg,
    paddingTop: spacing.sm,
  },
  separator: {
    height: spacing.sm,
  },
});
