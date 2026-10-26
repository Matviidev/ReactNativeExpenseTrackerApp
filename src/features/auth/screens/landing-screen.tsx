import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

import { AppButton, AppText, Screen } from "@/shared/ui";
import { colors, spacing } from "@/shared/theme";

import { BrandMark } from "../components/brand-mark";

export const LandingScreen = () => {
  const router = useRouter();

  return (
    <Screen background={colors.ink} edges={["top", "bottom", "left", "right"]}>
      <View style={styles.branding}>
        <BrandMark size={88} />
        <AppText variant="display" color={colors.onInk}>
          FinTrack
        </AppText>
        <AppText
          color={colors.onInkMuted}
          align="center"
          style={styles.tagline}
        >
          Track income and expenses, see where your money goes and stay on top
          of your balance.
        </AppText>
      </View>

      <View style={styles.actions}>
        <AppButton onPress={() => router.push("/register")}>
          Get started
        </AppButton>
        <AppButton
          variant="outline"
          onPress={() => router.push("/login")}
          buttonColor="transparent"
          textColor={colors.onInk}
          style={styles.secondary}
        >
          I already have an account
        </AppButton>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  branding: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.lg,
    paddingHorizontal: spacing.xxl,
  },
  tagline: {
    maxWidth: 300,
  },
  actions: {
    gap: spacing.md,
    padding: spacing.xl,
  },
  secondary: {
    borderColor: colors.inkSoft,
  },
});
