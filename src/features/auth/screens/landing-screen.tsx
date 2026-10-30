import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

import { AppButton, AppText, IconCircle, Screen } from "@/shared/ui";
import { colors, radius, spacing } from "@/shared/theme";

import { BrandMark } from "../components/brand-mark";

const FEATURES = [
  { icon: "swap-vertical", text: "Log income and expenses in seconds" },
  { icon: "shape-outline", text: "Sort spending into clear categories" },
  { icon: "chart-donut", text: "Always know your current balance" },
];

export const LandingScreen = () => {
  const router = useRouter();

  return (
    <Screen background={colors.ink} edges={["top", "bottom", "left", "right"]}>
      <View style={[styles.glow, styles.glowTop]} />
      <View style={[styles.glow, styles.glowBottom]} />

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

        <View style={styles.features}>
          {FEATURES.map((feature) => (
            <View key={feature.icon} style={styles.feature}>
              <IconCircle
                icon={feature.icon}
                color={colors.primarySoft}
                background={colors.inkOverlay}
                size={36}
              />
              <AppText color={colors.onInk} style={styles.featureText}>
                {feature.text}
              </AppText>
            </View>
          ))}
        </View>
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
  glow: {
    position: "absolute",
    borderRadius: radius.pill,
    backgroundColor: colors.primaryGlow,
  },
  glowTop: {
    width: 320,
    height: 320,
    top: -160,
    right: -120,
  },
  glowBottom: {
    width: 260,
    height: 260,
    bottom: 80,
    left: -180,
  },
  branding: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  tagline: {
    maxWidth: 300,
  },
  features: {
    alignSelf: "stretch",
    gap: spacing.sm,
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.inkBorder,
    backgroundColor: colors.inkOverlay,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  featureText: {
    flex: 1,
  },
  actions: {
    gap: spacing.md,
    padding: spacing.xl,
  },
  secondary: {
    borderColor: colors.inkBorder,
  },
});
