import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import supabase from '@/client';
import type { User } from '@/modules/auth/entities/user';
import toCamelCase from '@/utils/to-camel-case';

interface State {
  isAuthenticated: boolean;
  user: User | null;
}

interface Actions {
  setUser: (user: User | null) => void;
}

supabase.auth.onAuthStateChange((_, session) => {
  const { setUser } = useUserStore.getState();

  if (!session) {
    setUser(null);
    return;
  }

  if (session.user.id !== useUserStore.getState().user?.id) {
    setUser(toCamelCase({ ...session.user }));
    return;
  }
});

// Después, ver si esta persistencia tiene sentido. Porque Supabase ya maneja esto.
const useUserStore = create<State & Actions>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
    }),
    {
      name: 'userStore',
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated, user: state.user }),
    },
  ),
);

export default useUserStore;
