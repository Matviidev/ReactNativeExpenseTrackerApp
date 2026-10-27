import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { List } from "react-native-paper";

import { logoutUser, useAuthStore, useCurrentUser } from "@/features/auth";
import { formatDate } from "@/shared/lib/format";
import { toast } from "@/shared/lib/toast";
import { AppButton, AppText, Avatar, Card, Screen } from "@/shared/ui";
import { colors, spacing } from "@/shared/theme";

export const ProfileScreen = () => {
  const router = useRouter();
  const user = useCurrentUser();
  const setUser = useAuthStore((state) => state.setUser);
  const [loggingOut, setLoggingOut] = useState(false);

  const logout = async () => {
    setLoggingOut(true);
    const result = await logoutUser();
    setLoggingOut(false);

    if (!result.ok) {
      toast.error("Logout failed", result.error);
      return;
    }
    setUser(null);
  };

  return (
    <Screen>
      <View style={styles.content}>
        <AppText variant="title">Profile</AppText>

        <View style={styles.identity}>
          <Avatar name={user.name} uri={user.profile_picture} size={104} />
          <AppText variant="heading">{user.name}</AppText>
          <AppText color={colors.textMuted}>{user.email}</AppText>
        </View>

        <Card style={styles.menu}>
          <List.Item
            title="Edit profile"
            left={(props) => (
              <List.Icon {...props} icon="account-edit-outline" />
            )}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => router.push("/profile/edit")}
          />
          <List.Item
            title="Member since"
            description={formatDate(user.created_at)}
            left={(props) => (
              <List.Icon {...props} icon="calendar-account-outline" />
            )}
          />
        </Card>

        <AppButton
          variant="danger"
          icon="logout"
          loading={loggingOut}
          disabled={loggingOut}
          onPress={logout}
          style={styles.logout}
        >
          Log out
        </AppButton>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: spacing.lg,
    gap: spacing.xl,
  },
  identity: {
    alignItems: "center",
    gap: spacing.xs,
  },
  menu: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.xs,
  },
  logout: {
    marginTop: "auto",
  },
});
