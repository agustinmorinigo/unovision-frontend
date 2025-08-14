import { Navigate, type RouteObject } from 'react-router';
import accountingRoutesConfig from '@/routes/private/accounting';
import attendanceRoutesConfig from '@/routes/private/attendance';
import userManagementRoutesConfig from '@/routes/private/user-management';
import getDefaultRouteByRole from '@/utils/get-default-route-by-role';

const privateRoutes: RouteObject[] = [
  accountingRoutesConfig,
  userManagementRoutesConfig,
  attendanceRoutesConfig,
  {
    path: '*',
    element: <Navigate to={getDefaultRouteByRole()} replace />,
  },
];

export default privateRoutes;
