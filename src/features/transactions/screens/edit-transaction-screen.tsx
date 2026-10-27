import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";

import { useCurrentUser } from "@/features/auth";
import { toast } from "@/shared/lib/toast";
import { EmptyState, LoadingState, Screen, ScreenHeader } from "@/shared/ui";

import { updateTransaction } from "../api";
import { TransactionForm } from "../components/transaction-form";
import { useTransaction } from "../hooks/use-transactions";
import { TransactionFormValues } from "../types";
import { toFormValues, toTransactionInput } from "../utils";

export const EditTransactionScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const transactionId = Number(id);
  const router = useRouter();
  const user = useCurrentUser();
  const { data: transaction, loading, error } = useTransaction(transactionId);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (values: TransactionFormValues) => {
    setSubmitting(true);
    const result = await updateTransaction(
      transactionId,
      toTransactionInput(values, user.id),
    );
    setSubmitting(false);

    if (!result.ok) {
      toast.error("Could not update transaction", result.error);
      return;
    }
    toast.success("Transaction updated");
    router.back();
  };

  const renderContent = () => {
    if (loading && !transaction) {
      return <LoadingState />;
    }
    if (!transaction) {
      return (
        <EmptyState
          icon="alert-circle-outline"
          title="Transaction not found"
          message={error ?? undefined}
        />
      );
    }
    return (
      <TransactionForm
        key={transaction.id}
        defaultValues={toFormValues(transaction)}
        submitLabel="Save changes"
        submitting={submitting}
        onSubmit={onSubmit}
      />
    );
  };

  return (
    <Screen>
      <ScreenHeader title="Edit transaction" />
      {renderContent()}
    </Screen>
  );
};
