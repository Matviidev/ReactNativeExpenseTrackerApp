import { MD3LightTheme, MD3Theme } from "react-native-paper";

import { colors } from "./colors";

export const paperTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    onPrimary: colors.onPrimary,
    primaryContainer: colors.primarySoft,
    secondary: colors.ink,
    background: colors.background,
    surface: colors.surface,
    surfaceVariant: colors.surfaceMuted,
    onSurface: colors.text,
    onSurfaceVariant: colors.textMuted,
    outline: colors.border,
    error: colors.expense,
    elevation: {
      ...MD3LightTheme.colors.elevation,
      level2: colors.surface,
      level3: colors.surface,
    },
  },
};
