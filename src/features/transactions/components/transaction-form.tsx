import { useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";

import { amountRules, required } from "@/shared/lib/validation";
import {
  AppButton,
  FormDateField,
  FormSelectField,
  FormTextField,
} from "@/shared/ui";
import { spacing } from "@/shared/theme";

import { CATEGORIES, TRANSACTION_TYPES } from "../constants";
import { TransactionFormValues } from "../types";

interface TransactionFormProps {
  defaultValues: TransactionFormValues;
  submitLabel: string;
  submitting: boolean;
  onSubmit: (values: TransactionFormValues) => void;
}

export const TransactionForm = ({
  defaultValues,
  submitLabel,
  submitting,
  onSubmit,
}: TransactionFormProps) => {
  const { control, handleSubmit } = useForm<TransactionFormValues>({
    defaultValues,
  });

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <FormTextField
          control={control}
          name="name"
          label="Name"
          icon="text"
          rules={required("Name")}
        />
        <FormTextField
          control={control}
          name="amount"
          label="Amount"
          icon="currency-usd"
          rules={amountRules}
          keyboardType="decimal-pad"
        />
        <FormSelectField
          control={control}
          name="type"
          label="Type"
          icon="swap-vertical"
          options={TRANSACTION_TYPES}
          rules={required("Type")}
        />
        <FormSelectField
          control={control}
          name="category"
          label="Category"
          icon="tag-outline"
          options={CATEGORIES}
          rules={required("Category")}
        />
        <FormDateField
          control={control}
          name="date"
          label="Date"
          rules={required("Date")}
        />
        <FormTextField
          control={control}
          name="description"
          label="Description (optional)"
          multiline
          numberOfLines={3}
        />
        <AppButton
          loading={submitting}
          disabled={submitting}
          onPress={handleSubmit(onSubmit)}
          style={styles.submit}
        >
          {submitLabel}
        </AppButton>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    gap: spacing.lg,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  submit: {
    marginTop: spacing.sm,
  },
});
