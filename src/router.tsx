import { createBrowserRouter, redirect } from 'react-router';
import { PrivateLayout } from '@/layouts/PrivateLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { AuthGuard } from '@/modules/auth/components/AuthGuard';
import DashboardPage from '@/pages/Dashboard';
import LoginPage from '@/pages/Login';
import NotFoundPage from '@/pages/NotFound';
import { isAuthenticated } from '@/utils/is-authenticated';

const rootLoader = async () => {
    if (await isAuthenticated()) {
        return redirect('/dashboard');
    } else {
        return redirect('/login');
    }
};

const publicLoader = async () => {
    if (await isAuthenticated()) {
        return redirect('/dashboard');
    }
    return null;
};

const router = createBrowserRouter([
    {
        path: '/',
        loader: rootLoader,
    },
    {
        path: '/',
        element: <PublicLayout />,
        loader: publicLoader,
        children: [{ path: 'login', element: <LoginPage /> }],
    },
    {
        element: <AuthGuard />,
        children: [
            {
                path: '/',
                element: <PrivateLayout />,
                children: [{ path: 'dashboard', element: <DashboardPage /> }],
            },
        ],
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
]);

export default router;
