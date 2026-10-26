import { StyleSheet } from "react-native";
import { Button, ButtonProps } from "react-native-paper";

import { colors, radius } from "@/shared/theme";

type ButtonVariant = "primary" | "outline" | "danger";

interface AppButtonProps extends Omit<ButtonProps, "mode"> {
  variant?: ButtonVariant;
}

const variants: Record<
  ButtonVariant,
  {
    mode: ButtonProps["mode"];
    background: string;
    text: string;
    border: string;
  }
> = {
  primary: {
    mode: "contained",
    background: colors.primary,
    text: colors.onPrimary,
    border: colors.primary,
  },
  outline: {
    mode: "outlined",
    background: colors.surface,
    text: colors.text,
    border: colors.border,
  },
  danger: {
    mode: "outlined",
    background: colors.surface,
    text: colors.expense,
    border: colors.expenseSoft,
  },
};

export const AppButton = ({
  variant = "primary",
  style,
  contentStyle,
  labelStyle,
  ...props
}: AppButtonProps) => {
  const config = variants[variant];

  return (
    <Button
      {...props}
      mode={config.mode}
      textColor={config.text}
      buttonColor={config.background}
      style={[styles.button, { borderColor: config.border }, style]}
      contentStyle={[styles.content, contentStyle]}
      labelStyle={[styles.label, labelStyle]}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: radius.md,
    borderWidth: 1,
  },
  content: {
    height: 52,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});
