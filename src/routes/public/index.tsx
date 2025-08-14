import { Navigate, type RouteObject } from 'react-router';
import LoginPage from '@/pages/login';

const publicRoutes: RouteObject[] = [
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <p>Register page</p> },
  { path: '/recovery-password', element: <p>Recovery password page</p> },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
];

export default publicRoutes;
