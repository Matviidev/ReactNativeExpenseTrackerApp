import { StyleSheet, View } from "react-native";
import { ToastConfig, ToastConfigParams } from "react-native-toast-message";

import { colors, radius, shadow, spacing } from "@/shared/theme";

import { AppText } from "./app-text";
import { IconCircle } from "./icon-circle";

const createToast = (icon: string, color: string, background: string) =>
  function AppToast({ text1, text2 }: ToastConfigParams<unknown>) {
    return (
      <View style={styles.toast}>
        <IconCircle
          icon={icon}
          color={color}
          background={background}
          size={36}
        />
        <View style={styles.text}>
          <AppText variant="label" numberOfLines={1}>
            {text1}
          </AppText>
          {text2 ? (
            <AppText
              variant="caption"
              color={colors.textMuted}
              numberOfLines={2}
            >
              {text2}
            </AppText>
          ) : null}
        </View>
      </View>
    );
  };

export const toastConfig: ToastConfig = {
  success: createToast("check", colors.income, colors.incomeSoft),
  error: createToast(
    "alert-circle-outline",
    colors.expense,
    colors.expenseSoft,
  ),
};

const styles = StyleSheet.create({
  toast: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    width: "90%",
    maxWidth: 420,
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    ...shadow.raised,
  },
  text: {
    flex: 1,
    gap: 2,
  },
});
