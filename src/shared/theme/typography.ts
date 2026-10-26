import { TextStyle } from "react-native";

export const typography = {
  display: { fontSize: 36, fontWeight: "800", letterSpacing: -0.5 },
  title: { fontSize: 26, fontWeight: "700", letterSpacing: -0.3 },
  heading: { fontSize: 18, fontWeight: "700" },
  body: { fontSize: 15, fontWeight: "500" },
  label: { fontSize: 13, fontWeight: "600" },
  caption: { fontSize: 12, fontWeight: "500" },
} satisfies Record<string, TextStyle>;

export type TypographyVariant = keyof typeof typography;
