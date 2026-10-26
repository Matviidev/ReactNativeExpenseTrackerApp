import { ReactNode } from "react";
import { StyleProp, Text, TextStyle } from "react-native";

import { colors, typography, TypographyVariant } from "@/shared/theme";

interface AppTextProps {
  children: ReactNode;
  variant?: TypographyVariant;
  color?: string;
  align?: TextStyle["textAlign"];
  numberOfLines?: number;
  style?: StyleProp<TextStyle>;
}

export const AppText = ({
  children,
  variant = "body",
  color = colors.text,
  align,
  numberOfLines,
  style,
}: AppTextProps) => (
  <Text
    numberOfLines={numberOfLines}
    style={[typography[variant], { color, textAlign: align }, style]}
  >
    {children}
  </Text>
);
