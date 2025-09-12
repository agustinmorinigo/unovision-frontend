import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import useHandleUserModalStore from '@/modules/user-management/stores/handle-user-modal-store';
import { RoleName } from '@/client/entities';

// export type UseGetUsersQueryResponse = UseQueryResult<User, Error>;

export default function useGetUserQuery() {
  const { user } = useHandleUserModalStore();
  
  const query = useQuery({
    queryKey: ['get-user', user?.profile.id],
    queryFn: () => {
      if (!user) return null;

      const needsEmployeeInfo = user.roles.some(role => role.name === RoleName.Employee);
      const needsPatientInfo = user.roles.some(role => role.name === RoleName.Patient);
      const needsDoctorInfo = user.roles.some(role => role.name === RoleName.Doctor);

      const params = {
        userId: user.profile.id,
        needsEmployeeInfo,
        needsPatientInfo,
        needsDoctorInfo,
      }

      return api.user.getDetails(params);
      
    },
    enabled: !!user?.profile.id,
    // PRÓXIMO TO DO: TRANSFORMAR ACÁ LA DATA COMPLETAAAAAAAAAAA. TOMAR DE BASE EL 'use-get-user-data-query'. Es eso, + FORMATEAR LA DATA DE 'patients', 'doctors' y 'employees'.

    // select(data) {
    //   const { data: usersData, count, hasMore } = data;

    //   const formattedData = usersData.map((item) => {
    //     const rolesParsed = item.roles.map((role) => role.roles);
    //     const { roles: __, documentType, gender, ...rest } = item;
    //     return {
    //       profile: {
    //         documentType: documentType as unknown as DocumentType,
    //         gender: gender as unknown as Gender,
    //         ...rest,
    //       },
    //       roles: rolesParsed as Role[],
    //     };
    //   });
      
    //   return {
    //     data: formattedData,
    //     count,
    //     hasMore,
    //   };
    // },
  })

  return query;
}
