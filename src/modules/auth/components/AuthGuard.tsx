import { Navigate, Outlet } from 'react-router';
import { useIsAuthenticated } from '@/modules/auth/hooks/use-is-authenticated';

export const AuthGuard = () => {
  const isAuthenticated = useIsAuthenticated();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
