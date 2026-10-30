import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { TransactionsSummary } from "@/features/transactions";
import { formatCurrency } from "@/shared/lib/format";
import { AppText, IconCircle } from "@/shared/ui";
import { colors, radius, shadow, spacing } from "@/shared/theme";

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
    <IconCircle
      icon={icon}
      color={color}
      background={colors.inkOverlay}
      size={32}
    />
    <View style={styles.statText}>
      <AppText variant="caption" color={colors.onInkMuted}>
        {label}
      </AppText>
      <AppText variant="label" color={colors.onInk} numberOfLines={1}>
        {formatCurrency(value)}
      </AppText>
    </View>
  </View>
);

export const BalanceCard = ({ summary, loading }: BalanceCardProps) => (
  <View style={styles.card}>
    <View style={[styles.glow, styles.glowTop]} />
    <View style={[styles.glow, styles.glowBottom]} />

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
            icon="arrow-down"
            label="Income"
            value={summary?.income ?? 0}
            color={colors.primarySoft}
          />
          <Stat
            icon="arrow-up"
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
    overflow: "hidden",
    backgroundColor: colors.ink,
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.sm,
    ...shadow.raised,
  },
  glow: {
    position: "absolute",
    borderRadius: radius.pill,
    backgroundColor: colors.primaryGlow,
  },
  glowTop: {
    width: 220,
    height: 220,
    top: -120,
    right: -60,
  },
  glowBottom: {
    width: 140,
    height: 140,
    bottom: -90,
    left: -40,
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
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.inkBorder,
    backgroundColor: colors.inkOverlay,
  },
  statText: {
    flex: 1,
    gap: 2,
  },
});
