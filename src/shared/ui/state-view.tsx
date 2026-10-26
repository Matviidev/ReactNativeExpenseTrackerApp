import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { colors, spacing } from "@/shared/theme";

import { AppText } from "./app-text";
import { IconCircle } from "./icon-circle";

export const LoadingState = ({
  color = colors.primary,
}: {
  color?: string;
}) => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={color} />
  </View>
);

interface EmptyStateProps {
  icon?: string;
  title: string;
  message?: string;
}

export const EmptyState = ({
  icon = "tray-remove",
  title,
  message,
}: EmptyStateProps) => (
  <View style={styles.container}>
    <IconCircle
      icon={icon}
      color={colors.textMuted}
      background={colors.surfaceMuted}
      size={64}
    />
    <AppText variant="heading" align="center">
      {title}
    </AppText>
    {message && (
      <AppText color={colors.textMuted} align="center">
        {message}
      </AppText>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
    padding: spacing.xxl,
  },
});
