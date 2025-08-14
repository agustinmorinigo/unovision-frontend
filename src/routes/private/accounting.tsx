import { Navigate, type RouteObject } from 'react-router';
import RoleGuard from '@/guards/role-guard';
import getDefaultRouteByRole from '@/utils/get-default-route-by-role';

const allowedRoles = ['accountant'];

const accountingRoutesConfig: RouteObject = {
  path: 'accounting',
  element: <RoleGuard allowedRoles={allowedRoles} />,
  children: [
    {
      index: true,
      element: <Navigate to="expenses" replace />,
    },
    {
      path: 'expenses',
      element: <p>ACCOUNTING EXPENSES PAGE...</p>,
    },
    {
      path: 'expirations',
      element: <p>ACCOUNTING EXPIRATIONS PAGE...</p>,
    },
    {
      path: 'statistics',
      element: <p>ACCOUNTING STATISTICS PAGE...</p>,
    },
    {
      path: '*',
      element: <Navigate to={getDefaultRouteByRole()} replace />,
    },
  ],
};

export default accountingRoutesConfig;
