import { Link, useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

import { useCurrentUser } from "@/features/auth";
import { AddTransactionFab, TransactionItem } from "@/features/transactions";
import { AppText, Avatar, EmptyState, Screen } from "@/shared/ui";
import { colors, spacing } from "@/shared/theme";

import { BalanceCard } from "../components/balance-card";
import { useOverview } from "../hooks/use-overview";

export const DashboardScreen = () => {
  const router = useRouter();
  const user = useCurrentUser();
  const { data, loading } = useOverview();
  const firstName = user.name.split(" ")[0];

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Avatar name={user.name} uri={user.profile_picture} />
          <View>
            <AppText variant="caption" color={colors.textMuted}>
              Welcome back
            </AppText>
            <AppText variant="heading">{firstName}</AppText>
          </View>
        </View>

        <BalanceCard summary={data?.summary ?? null} loading={loading} />

        <View style={styles.sectionHeader}>
          <AppText variant="heading">Recent transactions</AppText>
          <Link href="/transactions">
            <AppText variant="label" color={colors.primary}>
              See all
            </AppText>
          </Link>
        </View>

        {data && data.recent.length === 0 ? (
          <EmptyState
            icon="wallet-outline"
            title="No transactions yet"
            message="Tap the + button to add your first one."
          />
        ) : (
          <View style={styles.list}>
            {data?.recent.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                onPress={() => router.push(`/transactions/${transaction.id}`)}
              />
            ))}
          </View>
        )}
      </ScrollView>
      <AddTransactionFab />
    </Screen>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: 96,
    gap: spacing.xl,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: -spacing.sm,
  },
  list: {
    gap: spacing.sm,
  },
});
