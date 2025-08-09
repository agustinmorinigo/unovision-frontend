import { createBrowserRouter, Navigate, redirect } from 'react-router';
import { PrivateLayout } from '@/layouts/private/private-layout';
import { PublicLayout } from '@/layouts/public/public-layout';
import { AuthGuard } from '@/modules/auth/components/auth-guard';
import { isAuthenticated } from '@/modules/auth/utils/is-authenticated';
import ExpensesPage from '@/pages/expenses';
import LoginPage from '@/pages/login';

const rootLoader = async () => {
  if (await isAuthenticated()) {
    return redirect('/expenses');
  } else {
    return redirect('/login');
  }
};

const publicLoader = async () => {
  if (await isAuthenticated()) {
    return redirect('/expenses');
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
        children: [{ path: 'expenses', element: <ExpensesPage /> }],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to='/login' />,
  },
]);

export default router;
