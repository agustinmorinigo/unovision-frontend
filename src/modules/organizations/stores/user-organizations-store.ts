import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserOrganization } from '@/modules/organizations/entities/users-organizations';

interface UserOrganizationsStore {
  userOrganizations: UserOrganization[];
  selectedUserOrganization: UserOrganization | null;
  setUserOrganizations: (orgs: UserOrganization[]) => void;
  setSelectedUserOrganization: (org: UserOrganization) => void;
  clearSelectedOrganization: () => void;
}

export const useUserOrganizationsStore = create<UserOrganizationsStore>()(
  persist(
    (set) => ({
      userOrganizations: [],
      selectedUserOrganization: null,
      setUserOrganizations: (orgs) => set({ userOrganizations: orgs }),
      setSelectedUserOrganization: (org) => set({ selectedUserOrganization: org }),
      clearSelectedOrganization: () => set({ selectedUserOrganization: null }),
    }),
    {
      name: 'user-organizations-store',
      partialize: (state) => ({
        userOrganizations: state.userOrganizations,
        selectedUserOrganization: state.selectedUserOrganization,
      }),
    },
  ),
);
