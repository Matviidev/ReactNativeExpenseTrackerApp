import { useState } from "react";
import { useForm } from "react-hook-form";

import { emailRules, passwordRules } from "@/shared/lib/validation";
import { toast } from "@/shared/lib/toast";
import { AppButton, FormTextField } from "@/shared/ui";

import { loginUser } from "../api";
import { AuthLayout } from "../components/auth-layout";
import { useAuthStore } from "../store";
import { Credentials } from "../types";

export const LoginScreen = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const [submitting, setSubmitting] = useState(false);
  const { control, handleSubmit } = useForm<Credentials>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: Credentials) => {
    setSubmitting(true);
    const result = await loginUser(values);
    setSubmitting(false);

    if (!result.ok) {
      toast.error("Login failed", result.error);
      return;
    }
    toast.success("Welcome back", result.data.name);
    setUser(result.data);
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to continue tracking your finances."
      footerText="Don't have an account?"
      footerLinkLabel="Sign up"
      footerHref="/register"
    >
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
        autoComplete="password"
      />
      <AppButton
        loading={submitting}
        disabled={submitting}
        onPress={handleSubmit(onSubmit)}
      >
        Log in
      </AppButton>
    </AuthLayout>
  );
};
