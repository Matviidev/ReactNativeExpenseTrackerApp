import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Icon } from "react-native-paper";

import { TransactionsSummary } from "@/features/transactions";
import { formatCurrency } from "@/shared/lib/format";
import { AppText } from "@/shared/ui";
import { colors, radius, spacing } from "@/shared/theme";

interface BalanceCardProps {
  summary: TransactionsSummary | null;
  loading: boolean;
}

const Stat = ({
  icon,
  label,
  value,
  color,
}: {
  icon: string;
  label: string;
  value: number;
  color: string;
}) => (
  <View style={styles.stat}>
    <View style={styles.statLabel}>
      <Icon source={icon} size={16} color={color} />
      <AppText variant="caption" color={colors.onInkMuted}>
        {label}
      </AppText>
    </View>
    <AppText variant="heading" color={colors.onInk} numberOfLines={1}>
      {formatCurrency(value)}
    </AppText>
  </View>
);

export const BalanceCard = ({ summary, loading }: BalanceCardProps) => (
  <View style={styles.card}>
    <AppText variant="label" color={colors.onInkMuted}>
      Total balance
    </AppText>

    {loading && !summary ? (
      <ActivityIndicator color={colors.onInk} style={styles.loader} />
    ) : (
      <>
        <AppText variant="display" color={colors.onInk} numberOfLines={1}>
          {formatCurrency(summary?.balance ?? 0)}
        </AppText>
        <View style={styles.stats}>
          <Stat
            icon="arrow-down-circle"
            label="Income"
            value={summary?.income ?? 0}
            color={colors.primarySoft}
          />
          <Stat
            icon="arrow-up-circle"
            label="Expense"
            value={summary?.expense ?? 0}
            color={colors.expenseSoft}
          />
        </View>
      </>
    )}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.ink,
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.sm,
  },
  loader: {
    marginVertical: spacing.xxl,
  },
  stats: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.md,
  },
  stat: {
    flex: 1,
    gap: spacing.xs,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.inkOverlay,
  },
  statLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
});
