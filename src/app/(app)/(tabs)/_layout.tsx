import { Tabs } from "expo-router/js-tabs";
import { Icon } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, spacing } from "@/shared/theme";

const TAB_BAR_HEIGHT = 68;

const tabIcon = (active: string, inactive: string) =>
  function TabIcon({ focused, size }: { focused: boolean; size: number }) {
    return (
      <Icon
        source={focused ? active : inactive}
        color={focused ? colors.primary : colors.textSubtle}
        size={size}
      />
    );
  };

export default function TabsLayout() {
  const { bottom } = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSubtle,
        tabBarLabelStyle: { fontSize: 12, fontWeight: "600" },
        tabBarStyle: {
          height: TAB_BAR_HEIGHT + bottom,
          paddingTop: spacing.xs,
          paddingBottom: bottom + spacing.md,
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: tabIcon("home-variant", "home-variant-outline"),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: tabIcon("account-circle", "account-circle-outline"),
        }}
      />
    </Tabs>
  );
}
