import { Href, Link, useRouter } from "expo-router";
import { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { IconButton } from "react-native-paper";

import { AppText, Screen } from "@/shared/ui";
import { colors, radius, spacing } from "@/shared/theme";

import { BrandMark } from "./brand-mark";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footerText: string;
  footerLinkLabel: string;
  footerHref: Href;
}

export const AuthLayout = ({
  title,
  subtitle,
  children,
  footerText,
  footerLinkLabel,
  footerHref,
}: AuthLayoutProps) => {
  const router = useRouter();

  const goBack = () =>
    router.canGoBack() ? router.back() : router.replace("/landing");

  return (
    <Screen background={colors.ink} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          <IconButton
            icon="arrow-left"
            iconColor={colors.onInk}
            onPress={goBack}
            style={styles.back}
            accessibilityLabel="Go back"
          />
          <View style={styles.glow} />
          <View style={styles.hero}>
            <BrandMark size={64} />
            <AppText variant="heading" color={colors.onInk}>
              FinTrack
            </AppText>
          </View>

          <View style={styles.sheet}>
            <View style={styles.heading}>
              <AppText variant="title">{title}</AppText>
              <AppText color={colors.textMuted}>{subtitle}</AppText>
            </View>

            <View style={styles.form}>{children}</View>

            <View style={styles.footer}>
              <AppText color={colors.textMuted}>{footerText} </AppText>
              <Link href={footerHref} replace>
                <AppText color={colors.primary} style={styles.link}>
                  {footerLinkLabel}
                </AppText>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
  },
  back: {
    marginLeft: spacing.sm,
  },
  glow: {
    position: "absolute",
    width: 280,
    height: 280,
    top: -140,
    right: -100,
    borderRadius: radius.pill,
    backgroundColor: colors.primaryGlow,
  },
  hero: {
    alignItems: "center",
    gap: spacing.md,
    paddingBottom: spacing.xxl * 1.5,
  },
  sheet: {
    flex: 1,
    backgroundColor: colors.background,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.xl,
  },
  heading: {
    gap: spacing.xs,
  },
  form: {
    gap: spacing.lg,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "auto",
    paddingBottom: spacing.xl,
  },
  link: {
    fontWeight: "700",
  },
});
