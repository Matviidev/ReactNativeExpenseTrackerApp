import * as ImagePicker from "expo-image-picker";

import { toast } from "@/shared/lib/toast";

export const pickImage = async () => {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) {
    toast.error(
      "Permission required",
      "Allow photo library access to change your picture.",
    );
    return null;
  }

  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    return result.canceled ? null : result.assets[0].uri;
  } catch {
    toast.error("Something went wrong", "Unable to open photo library.");
    return null;
  }
};
