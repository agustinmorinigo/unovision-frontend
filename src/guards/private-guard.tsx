import { Navigate } from 'react-router';
import UserOrganizationsGuard from '@/guards/user-organizations-guard';
import useUserStore from '@/modules/auth/stores/use-user-store';

export default function PrivateGuard() {
  const { isAuthenticated, user } = useUserStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user) return null;

  return <UserOrganizationsGuard user={user} />;
}
