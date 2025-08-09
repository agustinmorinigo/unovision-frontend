import { Navigate } from 'react-router';
import useUser from '@/modules/auth/stores/use-user-store';
import UserOrganizationGuard from '@/modules/organizations/components/user-organizations-guard';

export const AuthGuard = () => {
  const { isAuthenticated, user } = useUser();
  return isAuthenticated && user ? <UserOrganizationGuard user={user} /> : <Navigate to="/login" replace />;
};
