import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { SectionList, StyleSheet, View } from "react-native";

import {
  AppText,
  EmptyState,
  LoadingState,
  Screen,
  ScreenHeader,
} from "@/shared/ui";
import { colors, spacing } from "@/shared/theme";

import { TransactionItem } from "../components/transaction-item";
import { TransactionsFilters } from "../components/transactions-filters";
import { useTransactions } from "../hooks/use-transactions";
import { SortOption, TypeFilter } from "../types";
import { filterAndSort, groupByDay } from "../utils";

export const TransactionsScreen = () => {
  const router = useRouter();
  const { data, loading, error } = useTransactions();
  const [type, setType] = useState<TypeFilter>("all");
  const [sort, setSort] = useState<SortOption>("date-desc");

  const sections = useMemo(
    () => groupByDay(filterAndSort(data ?? [], type, sort), sort),
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
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        stickySectionHeadersEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderSectionHeader={({ section }) =>
          section.title ? (
            <AppText
              variant="caption"
              color={colors.textMuted}
              style={styles.sectionTitle}
            >
              {section.title.toUpperCase()}
            </AppText>
          ) : null
        }
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
    paddingTop: 0,
  },
  separator: {
    height: spacing.sm,
  },
  sectionTitle: {
    letterSpacing: 0.6,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
});
