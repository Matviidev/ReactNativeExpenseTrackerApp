import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";

import { useAuthStore, useCurrentUser } from "@/features/auth";
import { toast } from "@/shared/lib/toast";
import { required } from "@/shared/lib/validation";
import {
  AppButton,
  Avatar,
  FormTextField,
  Screen,
  ScreenHeader,
} from "@/shared/ui";
import { colors, spacing } from "@/shared/theme";

import { updateProfile, uploadAvatar } from "../api";
import { pickImage } from "../pick-image";

interface ProfileFormValues {
  name: string;
  email: string;
}

export const EditProfileScreen = () => {
  const router = useRouter();
  const user = useCurrentUser();
  const setUser = useAuthStore((state) => state.setUser);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { control, handleSubmit } = useForm<ProfileFormValues>({
    defaultValues: { name: user.name, email: user.email },
  });

  const selectImage = async () => {
    const uri = await pickImage();
    if (uri) {
      setSelectedImage(uri);
    }
  };

  const save = async ({ name }: ProfileFormValues) => {
    setSaving(true);

    let profilePicture = user.profile_picture ?? null;
    if (selectedImage) {
      const upload = await uploadAvatar(user.id, selectedImage);
      if (!upload.ok) {
        setSaving(false);
        toast.error("Upload failed", upload.error);
        return;
      }
      profilePicture = upload.data;
    }

    const result = await updateProfile(user.id, {
      name: name.trim(),
      profile_picture: profilePicture,
    });
    setSaving(false);

    if (!result.ok) {
      toast.error("Could not save profile", result.error);
      return;
    }
    setUser(result.data);
    toast.success("Profile updated");
    router.back();
  };

  return (
    <Screen>
      <ScreenHeader title="Edit profile" />
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.avatar}>
          <Avatar
            name={user.name}
            uri={selectedImage ?? user.profile_picture}
            size={120}
          />
          <IconButton
            icon="camera-outline"
            iconColor={colors.onPrimary}
            containerColor={colors.primary}
            style={styles.camera}
            onPress={selectImage}
            accessibilityLabel="Change photo"
          />
        </View>

        <FormTextField
          control={control}
          name="name"
          label="Full name"
          icon="account-outline"
          rules={required("Name")}
        />
        <FormTextField
          control={control}
          name="email"
          label="Email"
          icon="email-outline"
          disabled
        />

        <AppButton
          loading={saving}
          disabled={saving}
          onPress={handleSubmit(save)}
          style={styles.submit}
        >
          Save changes
        </AppButton>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  avatar: {
    alignSelf: "center",
    marginVertical: spacing.lg,
  },
  camera: {
    position: "absolute",
    right: -spacing.xs,
    bottom: -spacing.xs,
    margin: 0,
    borderWidth: 3,
    borderColor: colors.background,
  },
  submit: {
    marginTop: spacing.sm,
  },
});
