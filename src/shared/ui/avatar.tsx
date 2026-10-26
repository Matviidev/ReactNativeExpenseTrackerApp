import { Image, StyleSheet, View } from "react-native";

import { colors } from "@/shared/theme";

import { AppText } from "./app-text";

interface AvatarProps {
  name?: string;
  uri?: string | null;
  size?: number;
  background?: string;
  color?: string;
}

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

export const Avatar = ({
  name,
  uri,
  size = 48,
  background = colors.primarySoft,
  color = colors.primaryDark,
}: AvatarProps) => {
  const shape = { width: size, height: size, borderRadius: size / 2 };

  if (uri) {
    return <Image source={{ uri }} style={[styles.image, shape]} />;
  }

  return (
    <View style={[styles.fallback, shape, { backgroundColor: background }]}>
      <AppText
        style={{ fontSize: size * 0.38, fontWeight: "700" }}
        color={color}
      >
        {getInitials(name) || "?"}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    backgroundColor: colors.surfaceMuted,
  },
  fallback: {
    alignItems: "center",
    justifyContent: "center",
  },
});
