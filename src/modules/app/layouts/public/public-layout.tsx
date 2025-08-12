import { Navigate, Outlet } from 'react-router';
import useUser from '@/modules/auth/stores/use-user-store';

export const PublicLayout = () => {
  const { isAuthenticated } = useUser();

  if (isAuthenticated) {
    return <Navigate to="/expenses" replace />;
  } else {
    return <Outlet />;
  }
};
