import { useRouter } from "expo-router";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";

import { colors, spacing } from "@/shared/theme";

import { AppText } from "./app-text";

interface ScreenHeaderProps {
  title: string;
  right?: ReactNode;
}

export const ScreenHeader = ({ title, right }: ScreenHeaderProps) => {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <IconButton
        icon="arrow-left"
        iconColor={colors.text}
        containerColor={colors.surface}
        size={22}
        onPress={() => router.back()}
        style={styles.back}
      />
      <AppText variant="heading" style={styles.title} numberOfLines={1}>
        {title}
      </AppText>
      <View style={styles.right}>{right}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  back: {
    margin: 0,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    flex: 1,
  },
  right: {
    minWidth: 40,
    alignItems: "flex-end",
  },
});
