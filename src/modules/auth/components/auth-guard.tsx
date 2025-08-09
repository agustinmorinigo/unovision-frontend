import { Navigate, Outlet } from 'react-router';
import useUser from '@/modules/auth/stores/use-user-store';

export const AuthGuard = () => {
  const { isAuthenticated } = useUser();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
