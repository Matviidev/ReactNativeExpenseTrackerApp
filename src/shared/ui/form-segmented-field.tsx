import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { Pressable, StyleSheet, View } from "react-native";
import { HelperText, Icon } from "react-native-paper";

import { colors, radius, shadow, spacing } from "@/shared/theme";

import { AppText } from "./app-text";

export interface SegmentOption {
  label: string;
  value: string;
  icon?: string;
  color?: string;
}

interface FormSegmentedFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  options: SegmentOption[];
  rules?: RegisterOptions<T, Path<T>>;
}

export const FormSegmentedField = <T extends FieldValues>({
  control,
  name,
  options,
  rules,
}: FormSegmentedFieldProps<T>) => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <View>
        <View style={[styles.track, error && styles.trackError]}>
          {options.map((option) => {
            const active = option.value === value;
            const tint = active
              ? (option.color ?? colors.text)
              : colors.textMuted;

            return (
              <Pressable
                key={option.value}
                onPress={() => onChange(option.value)}
                accessibilityRole="radio"
                accessibilityState={{ selected: active }}
                style={[styles.segment, active && styles.segmentActive]}
              >
                {option.icon && (
                  <Icon source={option.icon} size={18} color={tint} />
                )}
                <AppText variant="label" color={tint}>
                  {option.label}
                </AppText>
              </Pressable>
            );
          })}
        </View>
        {error?.message && (
          <HelperText type="error" padding="none">
            {error.message}
          </HelperText>
        )}
      </View>
    )}
  />
);

const styles = StyleSheet.create({
  track: {
    flexDirection: "row",
    padding: spacing.xs,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
  },
  trackError: {
    borderColor: colors.expense,
  },
  segment: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    height: 44,
    borderRadius: radius.sm,
  },
  segmentActive: {
    backgroundColor: colors.surface,
    ...shadow.card,
  },
});
