import { Navigate, type RouteObject } from 'react-router';
import RoleGuard from '@/guards/role-guard';
import getDefaultRouteByRole from '@/utils/get-default-route-by-role';

const allowedRoles = ['accountant', 'admin'];

const attendanceRoutesConfig: RouteObject = {
  path: 'attendance',
  element: <RoleGuard allowedRoles={allowedRoles} />,
  children: [
    {
      index: true,
      element: <Navigate to="children1" replace />,
    },
    {
      path: 'children1',
      element: <p>ATTENDANCE children1 PAGE...</p>,
    },
    {
      path: 'children2',
      element: <p>ATTENDANCE children2 PAGE...</p>,
    },
    {
      path: 'children3',
      element: <p>ATTENDANCE children3 PAGE...</p>,
    },
    {
      path: '*',
      element: <Navigate to={getDefaultRouteByRole()} replace />,
    },
  ],
};

export default attendanceRoutesConfig;
