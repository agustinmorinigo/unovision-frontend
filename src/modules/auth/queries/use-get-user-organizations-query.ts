import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';

export default function useGetUserOrganizationsQuery(userId: string) {
  const query = useQuery({
    queryKey: ['get-user-organizations', userId],
    queryFn: () => api.usersOrganizations.getByUserId(userId),
    enabled: !!userId, // Solo ejecutar la consulta si userId está definido
  });

  return query;
}
