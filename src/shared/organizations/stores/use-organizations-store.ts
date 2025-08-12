import { persist } from 'zustand/middleware';
import create from '@/config/store';
import type { Organization } from '@/shared/organizations/entities';

interface State {
  organizations: Organization[];
}

interface Actions {
  setOrganizations: (organizations: Organization[]) => void;
}

const useOrganizationsStore = create<State & Actions>()(
  persist(
    (set) => ({
      organizations: [],
      setOrganizations: (organizations) => set({ organizations }),
    }),
    {
      name: 'organizations-store',
      partialize: (state) => ({
        organizations: state.organizations,
      }),
    },
  ),
);

export default useOrganizationsStore;
