import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";

import { useAuthStore } from "@/features/auth";
import { colors, paperTheme } from "@/shared/theme";
import { toastConfig } from "@/shared/ui";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const user = useAuthStore((state) => state.user);
  const isRestoring = useAuthStore((state) => state.isRestoring);
  const restoreSession = useAuthStore((state) => state.restoreSession);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  useEffect(() => {
    if (!isRestoring) {
      SplashScreen.hideAsync();
    }
  }, [isRestoring]);

  if (isRestoring) {
    return null;
  }

  return (
    <PaperProvider theme={paperTheme}>
      <StatusBar style={user ? "dark" : "light"} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Protected guard={!!user}>
          <Stack.Screen name="(app)" />
        </Stack.Protected>
        <Stack.Protected guard={!user}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
      </Stack>
      <Toast config={toastConfig} topOffset={60} />
    </PaperProvider>
  );
}
