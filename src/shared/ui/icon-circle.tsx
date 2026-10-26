import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-paper";

interface IconCircleProps {
  icon: string;
  color: string;
  background: string;
  size?: number;
}

export const IconCircle = ({
  icon,
  color,
  background,
  size = 44,
}: IconCircleProps) => (
  <View
    style={[
      styles.circle,
      {
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: background,
      },
    ]}
  >
    <Icon source={icon} color={color} size={size * 0.5} />
  </View>
);

const styles = StyleSheet.create({
  circle: {
    alignItems: "center",
    justifyContent: "center",
  },
});
