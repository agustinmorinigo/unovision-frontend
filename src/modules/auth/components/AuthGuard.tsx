import { Navigate, Outlet } from 'react-router';
// import { isAuthenticated } from "../utils/auth";

export const AuthGuard = () => {
	const isAuthenticated = false; // Esto viene de un hook de Supabase.
	return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
