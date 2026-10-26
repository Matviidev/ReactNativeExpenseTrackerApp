import { useMemo } from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import {
  Dropdown,
  DropdownInputProps,
  Option,
} from "react-native-paper-dropdown";

import { colors } from "@/shared/theme";

import { fieldStyles } from "./field-styles";

interface FormSelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: Option[];
  icon?: string;
  rules?: RegisterOptions<T, Path<T>>;
}

const createInput = (icon?: string) =>
  function SelectInput({
    label,
    placeholder,
    rightIcon,
    selectedLabel,
    error,
  }: DropdownInputProps) {
    return (
      <TextInput
        mode="outlined"
        label={label}
        placeholder={placeholder}
        value={selectedLabel}
        error={error}
        editable={false}
        pointerEvents="none"
        outlineColor={colors.border}
        outlineStyle={fieldStyles.outline}
        style={fieldStyles.input}
        left={
          icon ? (
            <TextInput.Icon icon={icon} color={colors.textSubtle} />
          ) : undefined
        }
        right={rightIcon}
      />
    );
  };

export const FormSelectField = <T extends FieldValues>({
  control,
  name,
  label,
  options,
  icon,
  rules,
}: FormSelectFieldProps<T>) => {
  const Input = useMemo(() => createInput(icon), [icon]);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View>
          <Dropdown
            label={label}
            placeholder={`Select ${label.toLowerCase()}`}
            options={options}
            value={value}
            onSelect={onChange}
            error={!!error}
            hideMenuHeader
            menuContentStyle={{ backgroundColor: colors.surface }}
            CustomDropdownInput={Input}
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
};
