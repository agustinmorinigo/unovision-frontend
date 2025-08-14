import { useEffect } from 'react';
import { toast } from 'sonner';
import { Layout } from '@/modules/app/layout/layout';
import type { User } from '@/modules/auth/entities/user';
import useGetUserOrganizationsQuery from '@/modules/auth/queries/use-get-user-organizations-query';
import useSignOutMutation from '@/modules/auth/queries/use-sign-out-mutation';
import useUserStore from '@/modules/auth/stores/use-user-store';
import useGetOrganizationsQuery from '@/shared/organizations/queries/use-get-organizations-query';

interface UserOrganizationGuardProps {
  user: User;
}

export default function UserOrganizationsGuard({ user }: UserOrganizationGuardProps) {
  const getOrgsQuery = useGetOrganizationsQuery();
  const getUserOrgsQuery = useGetUserOrganizationsQuery(user.id);
  const { mutate: signOut } = useSignOutMutation();
  const { setUserOrgs, setSelectedUserOrg } = useUserStore();
  const isSomethingPending = getOrgsQuery.isPending || getUserOrgsQuery.isPending;
  const isSomethingError = getOrgsQuery.isError || getUserOrgsQuery.isError;
  const isGetOrgsQueryDataEmpty = getOrgsQuery.data?.length === 0;
  const isGetUserOrgsQueryDataEmpty = getUserOrgsQuery.data?.length === 0;

  useEffect(() => {
    if (!getOrgsQuery.data || !getUserOrgsQuery.data) return;

    if (isGetOrgsQueryDataEmpty) {
      signOut();
      toast.error('No hay organizaciones disponibles. Contacte con el administrador del sistema.');
      return;
    }

    if (isGetUserOrgsQueryDataEmpty) {
      signOut();
      toast.error('No pertenece a ninguna organización. Ha sido desconectado.');
      return;
    }

    const userOrgs = getOrgsQuery.data.filter((org) =>
      getUserOrgsQuery.data.some((userOrg) => userOrg.organizationId === org.id),
    );

    setUserOrgs(userOrgs);
    setSelectedUserOrg(userOrgs[0]);
  }, [
    getOrgsQuery.data,
    getUserOrgsQuery.data,
    signOut,
    setUserOrgs,
    setSelectedUserOrg,
    isGetOrgsQueryDataEmpty,
    isGetUserOrgsQueryDataEmpty,
  ]);

  if (isSomethingPending) {
    return (
      <div className="bg-primary flex items-center justify-center size-full text-primary-foreground">Cargando...</div>
    );
  }

  if (isSomethingError) {
    return (
      <div className="bg-primary flex items-center justify-center size-full text-primary-foreground">
        Error al obtener las organizaciones del usuario. Por favor intente más tarde...
      </div>
    );
  }

  if (isGetOrgsQueryDataEmpty || isGetUserOrgsQueryDataEmpty) {
    return null;
  }

  return <Layout />;
}
