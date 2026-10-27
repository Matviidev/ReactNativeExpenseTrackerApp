import { Pressable, StyleSheet, View } from "react-native";

import { formatCurrency, formatDate } from "@/shared/lib/format";
import { AppText, IconCircle } from "@/shared/ui";
import { colors, radius, spacing } from "@/shared/theme";

import { getCategory, TYPE_COLORS } from "../constants";
import { Transaction } from "../types";

interface TransactionItemProps {
  transaction: Transaction;
  onPress?: () => void;
}

export const TransactionItem = ({
  transaction,
  onPress,
}: TransactionItemProps) => {
  const category = getCategory(transaction.category);
  const tone = TYPE_COLORS[transaction.type];
  const sign = transaction.type === "income" ? "+" : "−";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
    >
      <IconCircle
        icon={category.icon}
        color={tone.color}
        background={tone.background}
      />
      <View style={styles.info}>
        <AppText variant="heading" style={styles.name} numberOfLines={1}>
          {transaction.name}
        </AppText>
        <AppText variant="caption" color={colors.textMuted}>
          {category.label} · {formatDate(transaction.date)}
        </AppText>
      </View>
      <AppText variant="heading" color={tone.color} style={styles.name}>
        {sign}
        {formatCurrency(transaction.amount)}
      </AppText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: {
    backgroundColor: colors.surfaceMuted,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 15,
  },
});
