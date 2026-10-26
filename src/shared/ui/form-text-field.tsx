import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { View } from "react-native";
import { HelperText, TextInput, TextInputProps } from "react-native-paper";

import { colors } from "@/shared/theme";

import { fieldStyles } from "./field-styles";

type FormTextFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  icon?: string;
  rules?: RegisterOptions<T, Path<T>>;
} & Omit<
  TextInputProps,
  "value" | "onChangeText" | "onBlur" | "label" | "error" | "mode"
>;

export const FormTextField = <T extends FieldValues>({
  control,
  name,
  label,
  icon,
  rules,
  ...inputProps
}: FormTextFieldProps<T>) => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
      <View>
        <TextInput
          {...inputProps}
          mode="outlined"
          label={label}
          value={value ?? ""}
          onChangeText={onChange}
          onBlur={onBlur}
          error={!!error}
          outlineColor={colors.border}
          outlineStyle={fieldStyles.outline}
          style={fieldStyles.input}
          left={
            icon ? (
              <TextInput.Icon icon={icon} color={colors.textSubtle} />
            ) : undefined
          }
        />
        {error?.message && (
          <HelperText type="error" padding="none">
            {error.message}
          </HelperText>
        )}
      </View>
    )}
  />
);
