import { Navigate, type RouteObject } from 'react-router';
import { RoleName } from '@/entities/roles';
import RoleGuard from '@/guards/role-guard';
import getDefaultRouteByRole from '@/modules/roles/utils/get-default-route-by-role';

const allowedRoles = [RoleName.Admin, RoleName.Accountant];

const attendanceRoutesConfig: RouteObject = {
  path: 'attendance',
  element: <RoleGuard allowedRoles={allowedRoles} />,
  children: [
    {
      index: true,
      element: <Navigate to="report" replace />,
    },
    {
      path: 'report',
      element: <p>ATTENDANCE report PAGE...</p>,
    },
    {
      path: '*',
      element: <Navigate to={getDefaultRouteByRole()} replace />,
    },
  ],
};

export default attendanceRoutesConfig;
