import type { Organization, Profile, Role } from '@/client/entities';

export interface User {
  profile: Profile;
  roles: Role[];
}

export interface UserWithOrganizations extends User {
  organizations: Organization[];
};