import { Navigate, Outlet } from 'react-router';
import { useIsAuthenticated } from '@/modules/auth/hooks/use-is-authenticated';

export const PublicLayout = () => {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated) {
    return <Navigate to="/expenses" replace />;
  } else {
    return <Outlet />;
  }
};
