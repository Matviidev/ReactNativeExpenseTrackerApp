import { supabase } from "@/shared/lib/supabase";
import { toResult, unwrap } from "@/shared/lib/result";

import { Credentials, RegisterPayload, User } from "./types";

const PROFILES_TABLE = "user_profiles";

const fetchProfile = async (userId: string) =>
  unwrap(
    await supabase.from(PROFILES_TABLE).select("*").eq("id", userId).single(),
  ) as User;

export const registerUser = ({ name, email, password }: RegisterPayload) =>
  toResult(async () => {
    const { user } = unwrap(await supabase.auth.signUp({ email, password }));
    if (!user) {
      throw new Error("Unable to create account.");
    }
    unwrap(
      await supabase.from(PROFILES_TABLE).insert({ id: user.id, name, email }),
    );
  }, "An error occurred while registering.");

export const loginUser = ({ email, password }: Credentials) =>
  toResult(async () => {
    const { user } = unwrap(
      await supabase.auth.signInWithPassword({ email, password }),
    );
    return fetchProfile(user.id);
  }, "An error occurred while logging in.");

export const logoutUser = () =>
  toResult(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  }, "An error occurred while logging out.");

export const getSessionUser = () =>
  toResult(async () => {
    const { session } = unwrap(await supabase.auth.getSession());
    return session ? fetchProfile(session.user.id) : null;
  }, "Unable to restore session.");
