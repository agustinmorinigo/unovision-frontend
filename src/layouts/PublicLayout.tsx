import { Navigate, Outlet } from 'react-router';
import { useIsAuthenticated } from '@/hooks/use-is-authenticated';

export const PublicLayout = () => {
    const isAuthenticated = useIsAuthenticated();

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    } else {
        return <Outlet />;
    }
};
