import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";

import { formatCurrency, formatDate } from "@/shared/lib/format";
import { toast } from "@/shared/lib/toast";
import {
  AppButton,
  AppText,
  Card,
  EmptyState,
  IconCircle,
  LoadingState,
  Screen,
  ScreenHeader,
} from "@/shared/ui";
import { colors, radius, spacing } from "@/shared/theme";

import { deleteTransaction } from "../api";
import { getCategory, TYPE_COLORS } from "../constants";
import { useTransaction } from "../hooks/use-transactions";

const DetailRow = ({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) => (
  <View style={styles.row}>
    <IconCircle
      icon={icon}
      color={colors.textMuted}
      background={colors.surfaceMuted}
      size={36}
    />
    <View style={styles.rowText}>
      <AppText variant="caption" color={colors.textMuted}>
        {label}
      </AppText>
      <AppText>{value}</AppText>
    </View>
  </View>
);

export const TransactionDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const transactionId = Number(id);
  const router = useRouter();
  const { data: transaction, loading, error } = useTransaction(transactionId);
  const [deleting, setDeleting] = useState(false);

  const remove = async () => {
    setDeleting(true);
    const result = await deleteTransaction(transactionId);
    setDeleting(false);

    if (!result.ok) {
      toast.error("Delete failed", result.error);
      return;
    }
    toast.success("Transaction deleted");
    router.back();
  };

  const confirmDelete = () =>
    Alert.alert("Delete transaction", "This action cannot be undone.", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: remove },
    ]);

  if (loading && !transaction) {
    return (
      <Screen>
        <ScreenHeader title="Transaction" />
        <LoadingState />
      </Screen>
    );
  }

  if (!transaction) {
    return (
      <Screen>
        <ScreenHeader title="Transaction" />
        <EmptyState
          icon="alert-circle-outline"
          title="Transaction not found"
          message={error ?? undefined}
        />
      </Screen>
    );
  }

  const category = getCategory(transaction.category);
  const tone = TYPE_COLORS[transaction.type];

  return (
    <Screen edges={["top", "left", "right", "bottom"]}>
      <ScreenHeader
        title="Transaction"
        right={
          <IconButton
            icon="pencil-outline"
            iconColor={colors.text}
            containerColor={colors.surface}
            style={styles.edit}
            onPress={() => router.push(`/transactions/${transactionId}/edit`)}
          />
        }
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.hero}>
          <IconCircle
            icon={category.icon}
            color={tone.color}
            background={tone.background}
            size={64}
          />
          <AppText variant="heading" align="center">
            {transaction.name}
          </AppText>
          <AppText variant="display" color={tone.color}>
            {transaction.type === "income" ? "+" : "−"}
            {formatCurrency(transaction.amount)}
          </AppText>
          <View style={[styles.badge, { backgroundColor: tone.background }]}>
            <AppText variant="label" color={tone.color}>
              {transaction.type === "income" ? "Income" : "Expense"}
            </AppText>
          </View>
        </Card>

        <Card style={styles.details}>
          <DetailRow
            icon="tag-outline"
            label="Category"
            value={category.label}
          />
          <DetailRow
            icon="calendar-blank-outline"
            label="Date"
            value={formatDate(transaction.date, "dddd, MMM D, YYYY")}
          />
          {transaction.description ? (
            <DetailRow
              icon="text"
              label="Description"
              value={transaction.description}
            />
          ) : null}
          <DetailRow
            icon="clock-outline"
            label="Created"
            value={formatDate(transaction.created_at)}
          />
        </Card>
      </ScrollView>

      <View style={styles.actions}>
        <AppButton
          variant="danger"
          icon="trash-can-outline"
          loading={deleting}
          disabled={deleting}
          onPress={confirmDelete}
        >
          Delete transaction
        </AppButton>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  content: {
    gap: spacing.lg,
    padding: spacing.lg,
  },
  hero: {
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.xl,
  },
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
  details: {
    gap: spacing.lg,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  edit: {
    margin: 0,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actions: {
    padding: spacing.lg,
  },
});
