import { StyleSheet } from "react-native";

import { colors, radius } from "@/shared/theme";

export const fieldStyles = StyleSheet.create({
  outline: {
    borderRadius: radius.md,
  },
  input: {
    backgroundColor: colors.surface,
  },
});
