import { ReactNode } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/shared/theme";

interface ScreenProps {
  children: ReactNode;
  background?: string;
  edges?: Edge[];
  style?: StyleProp<ViewStyle>;
}

export const Screen = ({
  children,
  background = colors.background,
  edges = ["top", "left", "right"],
  style,
}: ScreenProps) => (
  <SafeAreaView
    edges={edges}
    style={[styles.container, { backgroundColor: background }, style]}
  >
    {children}
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
