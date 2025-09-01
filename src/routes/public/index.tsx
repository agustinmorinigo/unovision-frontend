import { Navigate, type RouteObject } from 'react-router';
import LoginPage from '@/pages/login';

const publicRoutes: RouteObject[] = [
  { path: '/login', element: <LoginPage /> },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
];

export default publicRoutes;
