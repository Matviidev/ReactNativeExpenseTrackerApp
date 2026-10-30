import { ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";

import { colors, MAX_CONTENT_WIDTH } from "@/shared/theme";

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
    style={[styles.container, { backgroundColor: background }]}
  >
    <View style={[styles.content, style]}>{children}</View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    width: "100%",
    maxWidth: MAX_CONTENT_WIDTH,
    alignSelf: "center",
    overflow: "hidden",
  },
});
