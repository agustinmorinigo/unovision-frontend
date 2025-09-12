import supabase from '@/client';

interface GetDetailsParams {
  userId: string;
  needsEmployeeInfo: boolean;
  needsPatientInfo: boolean;
  needsDoctorInfo: boolean;
}

export async function getDetails(params: GetDetailsParams) {
  const { userId, needsEmployeeInfo, needsPatientInfo, needsDoctorInfo } = params;

  const selectFields: string[] = [
    `*`,
    `organizations:usersOrganizations!profileId(organizations(*))`,
    `roles:profilesRoles!profileId(roles(*))`,
  ];

  if (needsEmployeeInfo) {
    selectFields.push(`
      employees:employees!profileId(
        *,
        employeeSchedules:employeeSchedules!employeeId(*)
      )
    `);
  }

  if (needsPatientInfo) {
    selectFields.push(`patients:patients!profileId(*)`);
  }

  if (needsDoctorInfo) {
    selectFields.push(`doctors:doctors!profileId(*)`);
  }

  const { data, error } = await supabase
    .from('profiles')
    .select(selectFields.join(',\n'))
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}
