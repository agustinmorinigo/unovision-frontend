import { createBrowserRouter, redirect } from 'react-router';
import { PrivateLayout } from '@/layouts/PrivateLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { AuthGuard } from '@/modules/auth/components/AuthGuard';
import DashboardPage from '@/pages/Dashboard';
import LoginPage from '@/pages/Login';
import NotFoundPage from '@/pages/NotFound';

// Esta función debería venir de tu servicio de autenticación
const checkAuthStatus = async (): Promise<boolean> => {
	// Aquí implementas tu lógica de verificación de autenticación
	// Por ejemplo: verificar token, llamar a API, etc.
	const token = localStorage.getItem('auth_token');

	if (!token) return false;

	try {
		// Opcional: verificar token con el servidor
		// const response = await fetch('/api/auth/verify', {
		//   headers: { Authorization: `Bearer ${token}` }
		// });
		// return response.ok;

		// Por ahora, simplemente verificamos si existe el token
		return true;
	} catch {
		return false;
	}
};

// Loader para la ruta raíz que redirige según el estado de auth
const rootLoader = async () => {
	const isAuthenticated = await checkAuthStatus();

	if (isAuthenticated) {
		return redirect('/dashboard');
	} else {
		return redirect('/login');
	}
};

// Loader para rutas públicas que redirige si ya está autenticado
const publicLoader = async () => {
	const isAuthenticated = await checkAuthStatus();

	if (isAuthenticated) {
		return redirect('/dashboard');
	}

	return null; // Permite continuar con la ruta
};

const router = createBrowserRouter([
	{
		path: '/',
		loader: rootLoader, // Redirige automáticamente
	},
	{
		path: '/',
		element: <PublicLayout />,
		loader: publicLoader, // Redirige si ya está autenticado
		children: [
			{ path: 'login', element: <LoginPage /> },
			// Puedes agregar más rutas públicas aquí
			// { path: 'register', element: <RegisterPage /> },
			// { path: 'forgot-password', element: <ForgotPasswordPage /> },
		],
	},
	{
		element: <AuthGuard />,
		children: [
			{
				path: '/',
				element: <PrivateLayout />,
				children: [
					{ path: 'dashboard', element: <DashboardPage /> },
					// Agregar más rutas protegidas aquí
				],
			},
		],
	},
	{
		path: '*',
		element: <NotFoundPage />, // Mejor mostrar 404 que redirigir al login
	},
]);

export default router;
