import { useRouter } from "expo-router";
import { useState } from "react";

import { useCurrentUser } from "@/features/auth";
import { toast } from "@/shared/lib/toast";
import { Screen, ScreenHeader } from "@/shared/ui";

import { createTransaction } from "../api";
import { TransactionForm } from "../components/transaction-form";
import { TransactionFormValues } from "../types";
import { toFormValues, toTransactionInput } from "../utils";

export const CreateTransactionScreen = () => {
  const router = useRouter();
  const user = useCurrentUser();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (values: TransactionFormValues) => {
    setSubmitting(true);
    const result = await createTransaction(toTransactionInput(values, user.id));
    setSubmitting(false);

    if (!result.ok) {
      toast.error("Could not add transaction", result.error);
      return;
    }
    toast.success("Transaction added");
    router.back();
  };

  return (
    <Screen>
      <ScreenHeader title="New transaction" />
      <TransactionForm
        defaultValues={toFormValues()}
        submitLabel="Add transaction"
        submitting={submitting}
        onSubmit={onSubmit}
      />
    </Screen>
  );
};
