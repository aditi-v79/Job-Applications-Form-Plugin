import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Profile } from '../types/profile';

interface ProfileStore {
  profile: Partial<Profile>;
  updateProfile: (updates: Partial<Profile>) => void;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profile: {},
      updateProfile: (updates) =>
        set((state) => ({
          profile: { ...state.profile, ...updates },
        })),
      clearProfile: () => set({ profile: {} }),
    }),
    {
      name: 'job-application-profile',
    }
  )
);