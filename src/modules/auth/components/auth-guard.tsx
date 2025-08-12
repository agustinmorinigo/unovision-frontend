import { Navigate } from 'react-router';
import UserOrganizationsGuard from '@/modules/auth/components/user-organizations-guard';
import useUser from '@/modules/auth/stores/use-user-store';

export const AuthGuard = () => {
  const { isAuthenticated, user } = useUser();
  return isAuthenticated && user ? <UserOrganizationsGuard user={user} /> : <Navigate to="/login" replace />;
};
