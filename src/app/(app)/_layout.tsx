import { Stack } from "expo-router";

import { useAuthStore } from "@/features/auth";
import { colors } from "@/shared/theme";

export default function AppLayout() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    />
  );
}
