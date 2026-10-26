import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-paper";

import { colors, radius } from "@/shared/theme";

export const BrandMark = ({ size = 72 }: { size?: number }) => (
  <View
    style={[
      styles.mark,
      { width: size, height: size, borderRadius: size * 0.3 },
    ]}
  >
    <Icon source="wallet-outline" size={size * 0.5} color={colors.onPrimary} />
  </View>
);

const styles = StyleSheet.create({
  mark: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
  },
});
