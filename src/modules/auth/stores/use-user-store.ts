import { persist } from 'zustand/middleware';
import supabase from '@/client';
import create, { resetAllStores } from '@/config/store';
import type { User } from '@/modules/auth/entities/user';
import type { Organization } from '@/shared/organizations/entities';
import toCamelCase from '@/utils/to-camel-case';

interface State {
  isAuthenticated: boolean;
  user: User | null;
  userOrgs: Organization[];
  selectedUserOrg: Organization | null;
}

interface Actions {
  setUser: (user: User | null) => void;
  setUserOrgs: (userOrgs: Organization[]) => void;
  setSelectedUserOrg: (org: Organization | null) => void;
}

// TO DO: Change this to other place.
supabase.auth.onAuthStateChange((_, session) => {
  const { setUser } = useUserStore.getState();

  if (!session) {
    resetAllStores();
    return;
  }

  if (session.user.id !== useUserStore.getState().user?.id) {
    setUser(toCamelCase({ ...session.user }));
    return;
  }
});

const useUserStore = create<State & Actions>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      userOrgs: [],
      selectedUserOrg: null,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setUserOrgs: (userOrgs) => set({ userOrgs }),
      setSelectedUserOrg: (org) => set({ selectedUserOrg: org }),
    }),
    {
      name: 'userStore',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        userOrgs: state.userOrgs,
        selectedUserOrg: state.selectedUserOrg,
      }),
    },
  ),
);

export default useUserStore;
