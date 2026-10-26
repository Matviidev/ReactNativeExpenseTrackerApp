import { useState } from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { Pressable, View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import {
  DatePickerModal,
  en,
  registerTranslation,
} from "react-native-paper-dates";

import { formatDate, parseDate, toISODate } from "@/shared/lib/format";
import { colors } from "@/shared/theme";

import { fieldStyles } from "./field-styles";

registerTranslation("en", en);

interface FormDateFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  rules?: RegisterOptions<T, Path<T>>;
}

export const FormDateField = <T extends FieldValues>({
  control,
  name,
  label,
  rules,
}: FormDateFieldProps<T>) => {
  const [open, setOpen] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View>
          <Pressable onPress={() => setOpen(true)}>
            <View pointerEvents="none">
              <TextInput
                mode="outlined"
                label={label}
                value={value ? formatDate(value, "D MMMM YYYY") : ""}
                error={!!error}
                editable={false}
                outlineColor={colors.border}
                outlineStyle={fieldStyles.outline}
                style={fieldStyles.input}
                left={
                  <TextInput.Icon icon="calendar" color={colors.textSubtle} />
                }
              />
            </View>
          </Pressable>
          {error?.message && (
            <HelperText type="error" padding="none">
              {error.message}
            </HelperText>
          )}
          <DatePickerModal
            locale="en"
            mode="single"
            visible={open}
            date={value ? parseDate(value) : new Date()}
            onDismiss={() => setOpen(false)}
            onConfirm={({ date }) => {
              if (date) {
                onChange(toISODate(date));
              }
              setOpen(false);
            }}
          />
        </View>
      )}
    />
  );
};
