import { useEffect } from 'react';
import { toast } from 'sonner';
import { Layout } from '@/modules/app/layout/layout';
import useGetUserDataQuery from '@/modules/auth/queries/use-get-user-data-query';
import useSignOutMutation from '@/modules/auth/queries/use-sign-out-mutation';
import useUserStore from '@/modules/auth/stores/use-user-store';

interface UserOrganizationGuardProps {
  userId: string;
}

export default function UserOrganizationsGuard({ userId }: UserOrganizationGuardProps) {
  const { isPending, isError, data } = useGetUserDataQuery(userId);
  const { mutate: signOut } = useSignOutMutation();
  const { setOrganizations, setRoles, setSelectedRole, setProfile, selectedRole } = useUserStore();

  useEffect(() => {
    if (!data) return;

    if (data.organizations.length === 0) {
      signOut();
      toast.error('No pertenece a ninguna organización. Ha sido desconectado.');
      return;
    }

    if (data.roles.length === 0) {
      signOut();
      toast.error('No tiene roles asignados. Ha sido desconectado.');
      return;
    }

    if (isError) {
      signOut();
      toast.error('Ocurrió un error al obtener los datos del usuario. Ha sido desconectado.');
      return;
    }

    setProfile(data.profile);
    setOrganizations(data.organizations);
    setRoles(data.roles);

    // Acá creo q tengo que hacer un redirect a /select-profile o /select-role o algo así. Siempre y cuando el user tenga más de un ROLE.

    if (!selectedRole) {
      setSelectedRole(data.roles[0]);
    }
  }, [data, isError, signOut, setProfile, setOrganizations, setRoles, setSelectedRole, selectedRole]);

  if (isPending) {
    return (
      <div className="bg-primary flex items-center justify-center size-full text-primary-foreground">Cargando...</div>
    );
  }

  return <Layout />;
}
