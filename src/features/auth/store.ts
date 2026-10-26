import { create } from "zustand";

import { getSessionUser } from "./api";
import { User } from "./types";

interface AuthState {
  user: User | null;
  isRestoring: boolean;
  restoreSession: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isRestoring: true,
  restoreSession: async () => {
    set({ isRestoring: true });
    const result = await getSessionUser();
    set({ user: result.ok ? result.data : null, isRestoring: false });
  },
  setUser: (user) => set({ user }),
}));

export const useCurrentUser = () => {
  const user = useAuthStore((state) => state.user);
  if (!user) {
    throw new Error(
      "useCurrentUser must be used within an authenticated route",
    );
  }
  return user;
};
