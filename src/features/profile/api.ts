import { User } from "@/features/auth";
import { supabase } from "@/shared/lib/supabase";
import { toResult, unwrap } from "@/shared/lib/result";

const BUCKET = "main";

export const updateProfile = (
  id: string,
  changes: Pick<User, "name" | "profile_picture">,
) =>
  toResult(
    async () =>
      unwrap(
        await supabase
          .from("user_profiles")
          .update(changes)
          .eq("id", id)
          .select()
          .single(),
      ) as User,
    "Unable to update profile.",
  );

export const uploadAvatar = (userId: string, fileUri: string) =>
  toResult(async () => {
    const fileName = `${userId}-${Date.now()}.jpg`;
    const body = await (await fetch(fileUri)).arrayBuffer();

    unwrap(
      await supabase.storage.from(BUCKET).upload(fileName, body, {
        cacheControl: "3600",
        contentType: "image/jpeg",
        upsert: true,
      }),
    );

    return supabase.storage.from(BUCKET).getPublicUrl(fileName).data.publicUrl;
  }, "Unable to upload image.");
