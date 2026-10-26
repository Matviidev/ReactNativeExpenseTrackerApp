import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { emailRules, passwordRules, required } from "@/shared/lib/validation";
import { toast } from "@/shared/lib/toast";
import { AppButton, FormTextField } from "@/shared/ui";

import { registerUser } from "../api";
import { AuthLayout } from "../components/auth-layout";
import { RegisterPayload } from "../types";

export const RegisterScreen = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const { control, handleSubmit } = useForm<RegisterPayload>({
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (values: RegisterPayload) => {
    setSubmitting(true);
    const result = await registerUser(values);
    setSubmitting(false);

    if (!result.ok) {
      toast.error("Registration failed", result.error);
      return;
    }
    toast.success("Account created", "You can now log in.");
    router.replace("/login");
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="It only takes a minute to get started."
      footerText="Already have an account?"
      footerLinkLabel="Log in"
      footerHref="/login"
    >
      <FormTextField
        control={control}
        name="name"
        label="Full name"
        icon="account-outline"
        rules={required("Name")}
        autoComplete="name"
      />
      <FormTextField
        control={control}
        name="email"
        label="Email"
        icon="email-outline"
        rules={emailRules}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />
      <FormTextField
        control={control}
        name="password"
        label="Password"
        icon="lock-outline"
        rules={passwordRules}
        secureTextEntry
        autoComplete="new-password"
      />
      <AppButton
        loading={submitting}
        disabled={submitting}
        onPress={handleSubmit(onSubmit)}
      >
        Create account
      </AppButton>
    </AuthLayout>
  );
};
