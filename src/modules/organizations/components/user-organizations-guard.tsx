import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { toast } from 'sonner';
import type { User } from '@/modules/auth/entities/user';
import useSignOutMutation from '@/modules/auth/queries/use-sign-out-mutation';
import useGetUserOrganizationsQuery from '@/modules/organizations/queries/use-get-user-organizations-query';
import { useUserOrganizationsStore } from '@/modules/organizations/stores/user-organizations-store';

interface UserOrganizationGuardProps {
  user: User;
}

export default function UserOrganizationGuard({ user }: UserOrganizationGuardProps) {
  const { isPending, isError, data } = useGetUserOrganizationsQuery(user.id);
  const { setSelectedUserOrganization, setUserOrganizations } = useUserOrganizationsStore();

  const { mutate: signOut } = useSignOutMutation();

  useEffect(() => {
    if (!data) return;

    if (data.length === 0) {
      signOut();
      toast.error('No pertenece a ninguna organización. Ha sido desconectado.');
    } else {
      setUserOrganizations(data);
      setSelectedUserOrganization(data[0]);
    }
  }, [data, signOut, setSelectedUserOrganization, setUserOrganizations]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error al obtener las organizaciones del usuario. Por favor intente más tarde...</div>;
  }

  if (data.length === 0) {
    return null;
  }

  return <Outlet />;
}
