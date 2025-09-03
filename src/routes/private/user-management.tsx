import { Navigate, type RouteObject } from 'react-router';
import { RoleName } from '@/entities/roles';
import RoleGuard from '@/guards/role-guard';
import getDefaultRouteByRole from '@/modules/roles/utils/get-default-route-by-role';

const allowedRoles = [RoleName.Admin];

const userManagementRoutesConfig: RouteObject = {
  path: 'user-management',
  element: <RoleGuard allowedRoles={allowedRoles} />,
  children: [
    {
      index: true,
      element: <Navigate to="dashboard" replace />,
    },
    {
      path: 'dashboard',
      element: <p>USER MANAGEMENT DASHBOARD PAGE...</p>,
    },
    {
      path: '*',
      element: <Navigate to={getDefaultRouteByRole()} replace />,
    },
  ],
};

export default userManagementRoutesConfig;
