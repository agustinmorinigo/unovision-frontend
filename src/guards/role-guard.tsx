import { Navigate, Outlet } from 'react-router';
import useUserStore from '@/modules/auth/stores/use-user-store';
import getDefaultRouteByRole from '@/utils/get-default-route-by-role';

interface RoleGuardProps {
  allowedRoles: string[]; // VA A SER UN ARRAY DE ROLES PERMITIDOS ENUMS.
}

export default function RoleGuard(props: RoleGuardProps) {
  const { allowedRoles } = props;
  const { user } = useUserStore();
  const userRole = 'accountant'; // Aquí deberías obtener el rol del usuario actual, por ejemplo: user.role en base al profile.

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to={getDefaultRouteByRole()} replace />;
  }

  return <Outlet />;
}
