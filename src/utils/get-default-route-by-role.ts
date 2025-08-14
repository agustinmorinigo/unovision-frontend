import useUserStore from '@/modules/auth/stores/use-user-store';

// DESPUÉS VER SI VA ACÁ. CAPAZ VA EN OTRO MÓDULO.
// Que NO devuelva string, que devuelva un type definido.
export default function getDefaultRouteByRole(): string {
  const role = useUserStore.getState().user?.role;

  if (!role) {
    return '/login';
  }

  return '/accounting/expenses';

  // EL ROLE VIENE DEL PROFILE DEL USER.
  // switch (role) {
  //   case 'admin':
  //     return '/user-management/children1';
  //   case 'accountant':
  //     return '/accounting/expenses';
  //   case 'attendance':
  //     return '/attendance/children1';
  //   // case 'user':
  //   // return '/user/dashboard';
  //   default:
  //     return '/login'; // Ruta por defecto si el rol no coincide con ninguno conocido
  // }
}
