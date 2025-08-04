import { Navigate, Outlet } from 'react-router';

export const PublicLayout = () => {
	const isAuthenticated = false; // Esto vendría de un hook de autenticación real.

	if (isAuthenticated) {
		return <Navigate to="/dashboard" replace />;
	} else {
		return <Outlet />;
	}
};
