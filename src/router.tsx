import { createBrowserRouter, Navigate } from 'react-router';
import { PrivateLayout } from '@/modules/app/layouts/private/private-layout';
import { PublicLayout } from '@/modules/app/layouts/public/public-layout';
import { AuthGuard } from '@/modules/auth/components/auth-guard';
import ExpensesPage from '@/pages/expenses';
import LoginPage from '@/pages/login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [{ path: 'login', element: <LoginPage /> }],
  },
  {
    element: <AuthGuard />,
    children: [
      {
        path: '/',
        element: <PrivateLayout />,
        children: [{ path: 'expenses', element: <ExpensesPage /> }],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" />,
  },
]);

export default router;
