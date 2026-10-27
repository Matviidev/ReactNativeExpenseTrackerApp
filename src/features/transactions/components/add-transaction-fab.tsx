import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

import { colors, radius, spacing } from "@/shared/theme";

export const AddTransactionFab = () => {
  const router = useRouter();

  return (
    <FAB
      icon="plus"
      color={colors.onPrimary}
      style={styles.fab}
      onPress={() => router.push("/transactions/new")}
      accessibilityLabel="Add transaction"
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: spacing.lg,
    bottom: spacing.lg,
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
  },
});
